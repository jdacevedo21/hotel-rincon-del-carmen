// js/storage.js
window.StorageAPI = {
    get(key){ try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } },
    set(key,val){ localStorage.setItem(key, JSON.stringify(val)); },
    init(){
      // Inicialización con datos de ejemplo si no existen
      if(!this.get('rooms')){
        const demo = [
          { id:'r1', name:'Suite Familiar', beds:3, capacity:4, price:250000, services:['internet','minibar'], image:null },
          { id:'r2', name:'Doble Superior', beds:2, capacity:2, price:180000, services:['internet'], image:null },
          { id:'r3', name:'Junior Suite', beds:1, capacity:2, price:220000, services:['internet','jacuzzi'], image:null }
        ];
        this.set('rooms', demo);
      }
      if(!this.get('reservations')) this.set('reservations', []);
      if(!this.get('users')){
        // Crear un usuario admin por defecto
        this.set('users', [ { id:'admin', name:'Administrador', email:'admin@hotel.example', password:'admin', nationality:'CO' } ]);
      }
    },
  
    // Verifica si una habitación está disponible para un rango dado (start,end) considerando reservas existentes
    isRoomAvailable(roomId, start, end){
      const res = this.get('reservations')||[];
      const s = new Date(start);
      const e = new Date(end);
      for(const r of res.filter(x=>x.roomId===roomId)){
        const rs = new Date(r.start);
        const re = new Date(r.end);
        // si los rangos se solapan => no disponible
        if(!(e <= rs || s >= re)) return false;
      }
      return true;
    },
  
    // calcular precio total por noches
    calcTotalPrice(room, start, end, guests){
      const s = new Date(start);
      const e = new Date(end);
      const nights = Math.max(0, Math.round((e - s) / (1000*60*60*24)));
      return { nights, total: nights * Number(room.price) };
    }
  };
  
  StorageAPI.init();
  