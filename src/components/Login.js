import React, { Component } from 'react';
import './styles/login.css'
import logo from '../logo.svg';

import fire from '../config/Fire';
import swal from 'sweetalert';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }

    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
  }

  login(e) {
    e.preventDefault();

    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        console.log(u);
      }).catch((error) => {
        console.log(error);

        if(error.message == "The password is invalid or the user does not have a password.") {
          swal("Datos inválidos", "Por favor verifiquelos", "error");
        }
        else if(error.message == "There is no user record corresponding to this identifier. The user may have been deleted.") {
          swal("Usuario no encontrado", "Para registrarse oprima el botón registrar", "error");
        }
        else if(error.message == "Password should be at least 6 characters") {
          swal("Cantidad inválida", "La contraseña debe tener como mínimo 6 carácteres", "error");
        }
        else if(error.message == "The email address is already in use by another account.") {
          swal("Correo ya registrado", "Por favor verifique los valores", "error");
        }
      });
  }

  signup(e) {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        console.log(u);
      }).catch((error) => {
        console.log(error);
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return(
      <div className="col-md-6 contenedor-formulario">
        <form className="formulario">
          <h2 className="formulario-title">React App</h2>

          <center>
            <img src={logo} className="App-logo" alt="logo" />
          </center>

          <div className="contenedor-campos">
            <label htmlFor="inputEmail">Correo Electrónico</label>
            <input value={ this.state.email } onChange={ this.handleChange } type="email"
                name="email" className="campo" id="inputEmail" aria-describedby="emailHelp"
                placeholder="Ingresa tu correo electrónico" />
          </div>

          <div className="contenedor-campos">
            <label htmlFor="inputPassword">Contraseña</label>
            <input value={ this.state.password } onChange={ this.handleChange } type="password"
                name="password" className="campo" id="inputPassword" placeholder="Ingresa tu contraseña" />
          </div>

          <div className="contenedor-botones">
            <button type="submit" onClick={ this.login } className="btn btn-primary">Ingresar</button>
            <button onClick={ this.signup } style={{ marginLeft: '25px' }}
                className="btn btn-secondary">Registrarse</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
