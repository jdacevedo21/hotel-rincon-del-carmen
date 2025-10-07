 // components/room-card.js
 const template = document.createElement('template');
 template.innerHTML = `
   <style>
     .room { border-radius:8px; box-shadow:var(--shadow); padding:12px; background:#fff }
     .room h4{ margin:0 0 8px }
     .meta{ font-size:0.9rem; color:#555 }
     .actions{ margin-top:10px }
   </style>
   <div class="room">
     <img part="img" style="width:100%;height:160px;object-fit:cover;border-radius:6px;margin-bottom:8px">
     <h4></h4>
     <div class="meta"></div>
     <div class="actions">
       <div class="price"></div>
       <button class="btn reserve">Apartar</button>
     </div>
   </div>
 `;

 class RoomCard extends HTMLElement {
   constructor(){
     super();
     this.attachShadow({mode:'open'});
     this.shadowRoot.appendChild(template.content.cloneNode(true));
     this.shadowRoot.querySelector('.reserve').addEventListener('click', ()=> this.onReserve());
   }

   set room(value){
     this._room = value;
     this.render();
   }

   render(){
     if(!this._room) return;
     const img = this.shadowRoot.querySelector('img');
     img.src = this._room.image || `https://picsum.photos/seed/room${this._room.id}/600/400`;
     this.shadowRoot.querySelector('h4').textContent = this._room.name;
     this.shadowRoot.querySelector('.meta').textContent = `${this._room.beds} camas · Capacidad: ${this._room.capacity} · Servicios: ${this._room.services.join(', ')}`;
     this.shadowRoot.querySelector('.price').textContent = `COP ${Number(this._room.price).toLocaleString()} / noche`;
   }

   onReserve(){
     // Dispara un evento con la habitación seleccionada para que la página padre abra el formulario de reserva
     this.dispatchEvent(new CustomEvent('reserve-room',{detail:this._room, bubbles:true, composed:true}));
   }
 }

 customElements.define('room-card', RoomCard);
