import React, { Component } from 'react';

const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Este campo es oblicatorio';
    }
    if (!values.email) {
        errors.email = 'Este campo es oblicatorio';
    }
    if (!values.website) {
        errors.website = 'Este campo es oblicatorio';
    }

    return errors;
}

export default class UserForm extends Component {
    state = {
        errors: {}
    }

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            ...props.valoresIniciales,
        }
    }

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value,
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const { errors, ...sinErrors } =  this.state;
        const result = validate(sinErrors);
        
        if (!Object.keys(result).length) {
            // Envio del formulario
            const { handleSubmit, handleUpdate, valoresIniciales } = this.props;
            if (valoresIniciales.id) {
                handleUpdate(valoresIniciales.id, sinErrors);
            } else {
                handleSubmit(sinErrors);
            }
        } else {
            // moved here to avoid triggering the render instead of original place after the validate.
            this.setState({ errors: result });
        }
    }
    
    render() {
        const { errors } = this.state;
        const { valoresIniciales } = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                <input defaultValue={valoresIniciales.name} placeholder="Nombre" name="name" onChange={this.handleChange} />
                {errors.name && <p>{errors.name}</p>}
                <input defaultValue={valoresIniciales.email} placeholder="Email" name="email" onChange={this.handleChange} />
                {errors.email && <p>{errors.email}</p>}
                <input defaultValue={valoresIniciales.website} placeholder="Website" name="website" onChange={this.handleChange} />
                {errors.website && <p>{errors.website}</p>}
                <input type="submit" value="Enviar" />
            </form>
        )
    }
}