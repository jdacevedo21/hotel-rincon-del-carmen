// js/app.js
document.addEventListener('DOMContentLoaded', ()=>{
    // año en footer
    const y = new Date().getFullYear();
    const yearElm = document.getElementById('year'); if(yearElm) yearElm.textContent = y;
  
    // montar carrusel simple en index
    const carousel = document.getElementById('carousel');
    if(carousel){
      const rooms = StorageAPI.get('rooms')||[];
      carousel.innerHTML = rooms.map(r=>`<div class="slide"><img src="${r.image||('https://picsum.photos/seed/room'+r.id+'/800/500')}" alt="${r.name}"></div>`).join('');
    }
  
    // Reservas page logic
    const searchForm = document.getElementById('searchForm');
    if(searchForm){
      const results = document.getElementById('results');
      const authArea = document.getElementById('authArea');
      authArea.innerHTML = '<auth-form></auth-form>';
  
      searchForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const start = document.getElementById('start').value;
        const end = document.getElementById('end').value;
        const guests = Number(document.getElementById('guests').value || 1);
        if(new Date(end) <= new Date(start)) return alert('Fechas inválidas');
  
        const rooms = StorageAPI.get('rooms')||[];
        const available = rooms.filter(r=> r.capacity >= guests && StorageAPI.isRoomAvailable(r.id, start, end));
  
        results.innerHTML = available.length? available.map(r=>`<room-card data-id="${r.id}"></room-card>`).join('') : '<p>No se encontraron habitaciones disponibles para ese rango.</p>';
  
        // after adding elements, we must set their room data
        setTimeout(()=>{
          document.querySelectorAll('room-card').forEach(rc=>{
            const id = rc.getAttribute('data-id');
            const r = rooms.find(x=>x.id===id);
            rc.room = r;
          });
        },50);
      });
  
      // escuchar click de reservar desde los room-card
      results.addEventListener('reserve-room', (ev)=>{
        const user = JSON.parse(localStorage.getItem('currentUser')||'null');
        if(!user) return alert('Debes iniciar sesión o registrarte para reservar.');
        const room = ev.detail;
        // abrir prompt simple para confirmar (o podrías abrir un modal con más datos)
        const start = document.getElementById('start').value;
        const end = document.getElementById('end').value;
        const guests = Number(document.getElementById('guests').value || 1);
        if(!start || !end) return alert('Ingresa fechas primero');
  
        // verificar disponibilidad actual
        if(!StorageAPI.isRoomAvailable(room.id, start, end)) return alert('Lo sentimos, la habitación ya no está disponible para ese rango.');
  
        const calc = StorageAPI.calcTotalPrice(room, start, end, guests);
        if(calc.nights <= 0) return alert('Por favor seleccione al menos una noche.');
  
        if(!confirm(`Reservar ${room.name} de ${start} a ${end} — ${calc.nights} noches — Total COP ${calc.total.toLocaleString()}?`)) return;
  
        const reservations = StorageAPI.get('reservations')||[];
        const newRes = { id:'res_' + Date.now(), roomId:room.id, userId: user.id, start, end, guests, total: calc.total };
        reservations.push(newRes);
        StorageAPI.set('reservations', reservations);
        alert('Reserva realizada con éxito');
        location.reload();
      });
    }
  });
  