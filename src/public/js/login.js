
function getFormData(){
    let formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        telefono: document.getElementById('telefono').value
    }
    return formData
}


function Login() {
    fetch(ApiHost + '/auth/login', {
        method: 'POST',
        body: JSON.stringify(getFormData()),
        headers: {
            'Content-Type': 'application/json'
        }

    }).then((res) => {
        if (res.status === 401) {
            alert("Usuario o contraseña incorrectos");
        }
        return res.json()})
        .then(res => {
            if (res.error) {
                alert(res.error)
            } else {
                localStorage.setItem('token', res.token)
                window.location.href = '/'
            }
        }
    )
}

function Registro() {
    fetch(ApiHost + '/auth/signup', {
        method: 'POST',
        body: JSON.stringify(getFormData()),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(res => {
        if (res.error) {
            alert(res.message)
        } else {
            localStorage.setItem('token', res.token)
            window.location.href = '/'
        }
    })
}

function mostrarRegistro() {
    /* 
    SHOW:
    id="botonesRegistro"
    id="campoApellido"
    id="campoNombre"
    id="tituloRegistro"
    id="telefono"
    
    HIDE: 
    id="botonesLogin"
    id="tituloLogin"
    */

    document.getElementById('botonesRegistro').style.display = 'block';
    document.getElementById('botonesLogin').style.display = 'none';
    document.getElementById('campoApellido').style.display = 'block';
    document.getElementById('campoNombre').style.display = 'block';
    document.getElementById('tituloRegistro').style.display = 'block';
    document.getElementById('tituloLogin').style.display = 'none';
    document.getElementById('campoTelefono').style.display = 'block';



}

function ocultarRegistro(){
    document.getElementById('botonesRegistro').style.display = 'none';
    document.getElementById('botonesLogin').style.display = 'block';
    document.getElementById('campoApellido').style.display = 'none';
    document.getElementById('campoNombre').style.display = 'none';
    document.getElementById('tituloRegistro').style.display = 'none';
    document.getElementById('tituloLogin').style.display = 'block';
    document.getElementById('campoTelefono').style.display = 'none';

}

