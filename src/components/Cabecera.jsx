import React, { Component } from "react";

const styles = {
    inline: {
        display: 'inline',
    }
}

export default class Cabecera extends Component {
    render() {
        return (
            <header>
                <h2 style={styles.inline}>Usuarios</h2>
                <button style={styles.inline}>Nuevo usuario</button>
            </header>
        )
    }
}