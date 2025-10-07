
    // components/auth-form.js
    class AuthForm extends HTMLElement{
      constructor(){
        super();
        this.innerHTML = `
          <div class="card auth">
            <h3>Accede o regístrate</h3>
            <div id="userInfo"></div>
            <form id="loginForm">
              <label>Documento: <input id="idNumber" required></label>
              <label>Nombre completo: <input id="fullName" required></label>
              <label>Nacionalidad: <input id="nationality"></label>
              <label>Email: <input id="email" type="email" required></label>
              <label>Teléfono: <input id="phone"></label>
              <label>Contraseña: <input id="password" type="password" required></label>
              <button class="btn" id="registerBtn" type="button">Registrar</button>
              <button class="btn" id="loginBtn" type="button">Ingresar</button>
            </form>
          </div>
        `;

        this.querySelector('#registerBtn').addEventListener('click', ()=> this.register());
        this.querySelector('#loginBtn').addEventListener('click', ()=> this.login());
      }

      register(){
        const user = {
          id: this.querySelector('#idNumber').value.trim(),
          name: this.querySelector('#fullName').value.trim(),
          nationality: this.querySelector('#nationality').value.trim(),
          email: this.querySelector('#email').value.trim(),
          phone: this.querySelector('#phone').value.trim(),
          password: this.querySelector('#password').value
        };
        const users = JSON.parse(localStorage.getItem('users')||'[]');
        if(users.find(u=>u.id===user.id || u.email===user.email)) return alert('Usuario ya registrado');
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify({id:user.id,name:user.name,email:user.email}));
        alert('Registro exitoso');
        location.reload();
      }

      login(){
        const id = this.querySelector('#idNumber').value.trim();
        const pwd = this.querySelector('#password').value;
        const users = JSON.parse(localStorage.getItem('users')||'[]');
        const u = users.find(x=> (x.id===id || x.email===id) && x.password===pwd);
        if(!u) return alert('Usuario o contraseña incorrectos');
        localStorage.setItem('currentUser', JSON.stringify({id:u.id,name:u.name,email:u.email}));
        alert('Ingreso exitoso');
        location.reload();
      }
    }
    customElements.define('auth-form', AuthForm);
