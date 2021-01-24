import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserForm from './components/UserForm';
import ViewList from "./components/ViewList";

class App extends Component {
  state = {
    data: [],
    ruta: 'lista',
  }
  
  constructor() {
    super();

    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(({ data }) => this.setState({ data }));
  }

  seleccionaUsuario = id => {
    this.setState({
      ruta: 'formulario',
      usuarioSeleccionado: id,
    })
  }

  agregarNuevoUsuario = usuario => {
    axios.post('https://jsonplaceholder.typicode.com/users', usuario)
      .then(({ data }) => {
        const newData = this.state.data.concat(data);
        this.setState({
          data: newData,
          ruta: 'lista',
        })
      })
  }

  actualizarNuevoUsuario = (id, values) => {
    axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, values)
      .then(() => {
        const newData = this.state.data.map(x => x.id === id ? values : x);
        this.setState({
          data: newData,
          ruta: 'lista',
        })
      })
  }

  nuevoUsuario = () => {
    this.setState({ ruta: 'formulario' })
  }

  render() {
    const { ruta, data, usuarioSeleccionado } = this.state;
    const valoresIniciales = usuarioSeleccionado && data.find(x => x.id === usuarioSeleccionado);
    //console.log(valoresIniciales);

    return (
      <div className="App">
        {ruta === 'lista' && <ViewList 
            nuevoUsuario={this.nuevoUsuario}
            handleClick={this.seleccionaUsuario} 
            data={data} 
        />}
        {ruta === 'formulario' && <UserForm 
            valoresIniciales={valoresIniciales || {}}
            handleSubmit={this.agregarNuevoUsuario} 
            handleUpdate={this.actualizarNuevoUsuario}
        />}
      </div>
    );
  }
}

export default App;
