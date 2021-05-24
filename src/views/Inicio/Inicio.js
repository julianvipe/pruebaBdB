import React, { Component } from 'react';
import InputWithLabel from '../../Components/InputWithLabel/InputWithLabel.js';
import { Link,Redirect } from 'react-router-dom';
import classes from "./Inicio.css";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Constantes from "../../Constates";
import Swal from "sweetalert";


class Inicio extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            persona: {
                email: "",
                contrasena: "",
            },
            Redirect: false,
            id:"",
        }
        this.manejarCambio = this.manejarCambio.bind(this);
        this.manejarEnvioForm = this.manejarEnvioForm.bind(this);
    }

    async manejarEnvioForm(event) {

        event.preventDefault();

        const cargaUtil = JSON.stringify(this.state.persona);

        const resp = await fetch(`${Constantes.RUTA_API}/login.php`, {
            method: "POST",
            body: cargaUtil,
        });
        const exitoso = await resp.json();
        if(exitoso){
            this.setState({
                Redirect:'/PerfilUsuario',
                id:exitoso.id
            })
        }else{
            Swal("No se pudo iniciar sesion",{
                icon: "error",});
        }
        this.setState({
            persona: {
                email: "",
                contrasena: "",
            }
        })

    }

    manejarCambio(event) {

        const clave = event.target.id;
        let valor = event.target.value;
        this.setState(state => {
            const personaAct = state.persona;
            personaAct[clave]=valor;
            return {
                persona: personaAct,
            }
        });
    }

    render() {
        if(this.state.Redirect){
            return <Redirect to={{
                pathname: this.state.Redirect,
                state:{ id:this.state.id}
            }}/>
        }else{
        return (
            <div className={classes['body']}>
                <img className={classes['bg']} alt='profile' src='https://s3-eu-west-1.amazonaws.com/rankia/images/valoraciones/0023/7354/Banco_de_Bogotá.jpg?1464013869'></img>
                <div className={classes['inicioContainer']}>
                    <Card className={classes.box} p={40}>
                        <InputWithLabel
                            id='email'
                            label='E-mail'
                            onChange={this.manejarCambio}
                            value={this.state.persona.email}
                        />
                        <InputWithLabel
                            id='contrasena'
                            label='Contrasenha'
                            type='password'
                            onChange={this.manejarCambio}
                            value={this.state.persona.contrasena}
                            />
                        
                            <Button
                                className={classes['buton']}
                                m={2}
                                size="large"
                                color="primary"
                                variant="contained"
                                onClick={this.manejarEnvioForm}
                            >
                                Iniciar
                        </Button>
                        
                        <Link to="/Registrar">
                            <p>Registrarse</p>
                        </Link>
                    </Card>
                </div>
            </div>
        );
        }
    }
}

export default Inicio;