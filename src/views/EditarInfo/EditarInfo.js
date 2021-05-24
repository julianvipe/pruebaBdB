import React, { Component } from 'react';
import InputWithLabel from '../../Components/InputWithLabel/InputWithLabel.js'
import classes from './Editar.css'
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button";
import Constantes from "../../Constates";
import Swal from "sweetalert";
import { Redirect } from "react-router-dom";

class EditarInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            persona: {
                id: "",
                "nombre": "",
                "email": "",
                "contrasena": "",
                "edad": "",
                "sexo": "",
                "cargo": "",
                "salario": "",
            },
            Redirect:false,
        }
        this.manejarCambio = this.manejarCambio.bind(this);
        this.manejarEnvioForm = this.manejarEnvioForm.bind(this);
    }

    async componentDidMount() {
        const idPer = this.props.location.state.id;
        const resp = await fetch(`${Constantes.RUTA_API}/obtener_persona.php?id=${idPer}`);
        const persona = await resp.json();

        this.setState({
            persona: persona,
        });

    }

    async manejarEnvioForm(event) {

        event.preventDefault();

        const cargaUtil = JSON.stringify(this.state.persona);

        const resp = await fetch(`${Constantes.RUTA_API}/actualizar_persona.php`, {
            method: "PUT",
            body: cargaUtil,
        });
        const exitoso = await resp.json();
        if (exitoso) {
            Swal("Actualizacion realizada con exito", {
                icon: "success",
            });
        } else {
            Swal("Ocurrio algo, registro fallido", {
                icon: "error",
            });
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
            },
        })

    }

    manejarCambio(event) {

        const clave = event.target.id;
        let valor = event.target.value;
        this.setState(state => {
            const personaAct = state.persona;
            if (clave === "edad" || clave === "salario") {
                valor = parseFloat(valor);
            }
            console.log(personaAct)
            personaAct[clave] = valor;
            return {
                persona: personaAct,
            }
        });
    }

    handleClick = () => {
        this.setState({
          Redirect:"/PerfilUsuario",
        })
        console.log(this.state.persona.id)
    
      }

    render() {
        if (this.state.Redirect) {
            return <Redirect to={{
                pathname: this.state.Redirect,
                state: { id: this.state.persona.id }
            }} />
        } else {
            return (
                <div className={classes['body']}>
                    <h2>Editar Informacion</h2>
                    <div className={classes['card']}>
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
                            className={classes['b']}
                            m={2}
                            size="large"
                            color="primary"
                            variant="contained"
                            onClick={this.manejarEnvioForm}
                        >Guardar</Button>
                        <Button
                            className={classes['b']}
                            m={2}
                            size="large"
                            color="primary"
                            variant="contained"
                            onClick={this.handleClick}
                        >Regresar</Button>
                </div>
            );
        }
    }
}
export default EditarInfo