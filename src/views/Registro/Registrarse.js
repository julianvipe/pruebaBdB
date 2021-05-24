import React, { Component } from 'react';
import InputWithLabel from '../../Components/InputWithLabel/InputWithLabel.js'
import classes from './Registrarse.css'
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button";
import Constantes from "../../Constates";
import { Link } from "react-router-dom";
import Swal from "sweetalert";

class Registro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            persona: {
                "nombre": "",
                "email": "",
                "contrasena": "",
                "edad": "",
                "sexo": "",
                "cargo": "",
                "salario": "",
            },
        };
        this.manejarCambio = this.manejarCambio.bind(this);
        this.manejarEnvioForm = this.manejarEnvioForm.bind(this);
    }

    render() {
        return (
            <div className={classes.body}>
                <h2>Registrarse</h2>
                <div className={classes.card} >
                    <div className={classes['itemG']}>
                        <InputWithLabel
                            id='nombre'
                            label='Nombre:'
                            onChange={this.manejarCambio}
                            value={this.state.persona.nombre}
                        />
                        <InputWithLabel
                            id='email'
                            label='E-mail:'
                            onChange={this.manejarCambio}
                            value={this.state.persona.email}
                        />
                        <InputWithLabel
                            id='contrasena'
                            label='Contrasenha:'
                            onChange={this.manejarCambio}
                            value={this.state.persona.contrasena}
                            type='password'
                        />
                        <InputWithLabel
                            id='edad'
                            label='Edad:'
                            onChange={this.manejarCambio}
                            value={this.state.persona.edad}
                            type='number'
                        />
                        <select label='Sexo'
                            id='sexo'
                            onChange={this.manejarCambio}
                            value={this.state.persona.sexo}>
                            <option>Femenino</option>
                            <option>Masculino</option>
                            <option>Otro</option>
                        </select>
                        <InputWithLabel
                            id='cargo'
                            label='Cargo'
                            onChange={this.manejarCambio}
                            value={this.state.persona.cargo}
                        />
                        <InputWithLabel
                            id='salario'
                            label='Salario mensual:'
                            onChange={this.manejarCambio}
                            value={this.state.persona.salario}
                            type='number'
                        />
                    </div>
                </div>
                <Button
                    className={classes['buton']}
                    m={2}
                    size="large"
                    color="primary"
                    variant="contained"
                    onClick={this.manejarEnvioForm}
                >Confirmar</Button>
                <Link to='/'>
                    <Button
                        className={classes['buton']}
                        m={2}
                        size="large"
                        color="primary"
                        variant="contained"
                    >Regresar</Button></Link>
            </div>
        );
    }
    async manejarEnvioForm(event) {

        event.preventDefault();

        const cargaUtil = JSON.stringify(this.state.persona);

        const resp = await fetch(`${Constantes.RUTA_API}/guardar_registro.php`, {
            method: "POST",
            body: cargaUtil,
        });
        const exitoso = await resp.json();
        if (exitoso) {
            Swal("Registro realizado con exito",{
             icon: "success",});
        }
        else
        {
            Swal("Ocurrio algo, registro fallido",{
                icon: "error",});
        }
        this.setState({
            persona: {
                nombre: "",
                email: "",
                contrasena: "",
                edad: "",
                sexo: "",
                cargo: "",
                salario: "",
            }
        })
    }

    manejarCambio(event) {

        const clave = event.target.id;
        let valor = event.target.value;
        console.log(this.state.persona);
        this.setState(state => {
            const personaAct = state.persona;
            if (clave === "edad" || clave === "salario") {
                valor = parseFloat(valor);
            }
            personaAct[clave] = valor;
            return {
                persona: personaAct,
            }
        });
    }
}
export default Registro