// js/admin.js
(function(){
    const roomsList = document.getElementById('roomsList');
    const roomForm = document.getElementById('roomForm');
    const adminReservations = document.getElementById('adminReservations');
  
    function renderRooms(){
      const rooms = StorageAPI.get('rooms')||[];
      roomsList.innerHTML = rooms.map(r=>`
        <div class="card">
          <h4>${r.name}</h4>
          <p>${r.beds} camas · ${r.capacity} personas · Servicios: ${r.services.join(', ')} · COP ${Number(r.price).toLocaleString()}</p>
          <button data-id="${r.id}" class="editRoom">Editar</button>
          <button data-id="${r.id}" class="deleteRoom">Eliminar</button>
        </div>
      `).join('');
  
      roomsList.querySelectorAll('.editRoom').forEach(b=> b.addEventListener('click', (e)=>{
        const id = e.target.dataset.id;
        const r = (StorageAPI.get('rooms')||[]).find(x=>x.id===id);
        if(!r) return;
        document.getElementById('roomId').value = r.id;
        document.getElementById('roomName').value = r.name;
        document.getElementById('beds').value = r.beds;
        document.getElementById('capacity').value = r.capacity;
        document.getElementById('price').value = r.price;
        document.getElementById('services').value = r.services.join(',');
      }));
  
      roomsList.querySelectorAll('.deleteRoom').forEach(b=> b.addEventListener('click', (e)=>{
        if(!confirm('Eliminar habitación?')) return;
        const id = e.target.dataset.id;
        let rooms = StorageAPI.get('rooms')||[];
        rooms = rooms.filter(x=>x.id!==id);
        StorageAPI.set('rooms', rooms);
        renderRooms();
      }));
    }
  
    function renderReservations(){
      const res = StorageAPI.get('reservations')||[];
      const rooms = StorageAPI.get('rooms')||[];
      adminReservations.innerHTML = res.length ? res.map(r=>{
        const room = rooms.find(x=>x.id===r.roomId) || {name:'-'};
        return `<div class="card">
          <p><strong>${room.name}</strong> — ${r.start} → ${r.end} — ${r.guests} personas — COP ${Number(r.total).toLocaleString()}</p>
          <button data-id="${r.id}" class="cancelRes">Cancelar</button>
        </div>`
      }).join('') : '<p>No hay reservas</p>';
  
      adminReservations.querySelectorAll('.cancelRes').forEach(b=> b.addEventListener('click', (e)=>{
        if(!confirm('Confirmar cancelación?')) return;
        const id = e.target.dataset.id;
        let reservations = StorageAPI.get('reservations')||[];
        reservations = reservations.filter(x=>x.id!==id);
        StorageAPI.set('reservations', reservations);
        renderReservations();
        alert('Reserva cancelada; la habitación quedó disponible.');
      }));
    }
  
    if(roomForm){
      roomForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const id = document.getElementById('roomId').value || ('r' + Date.now());
        const room = {
          id,
          name: document.getElementById('roomName').value,
          beds: Number(document.getElementById('beds').value),
          capacity: Number(document.getElementById('capacity').value),
          price: Number(document.getElementById('price').value),
          services: document.getElementById('services').value.split(',').map(s=>s.trim()).filter(Boolean)
        };
        let rooms = StorageAPI.get('rooms')||[];
        const exists = rooms.find(r=>r.id===id);
        if(exists){
          rooms = rooms.map(r=> r.id===id ? room : r);
        } else {
          rooms.push(room);
        }
        StorageAPI.set('rooms', rooms);
        roomForm.reset();
        renderRooms();
      });
    }
  
    renderRooms();
    renderReservations();
  })();
  
