import React, { Component } from 'react';
import InfoCard from '../../Components/InfoCard/InforCard.js';
import { Link, Redirect } from 'react-router-dom';
import classes from './PerfilUsuario.css';
import Button from "@material-ui/core/Button";
import Constantes from "../../Constates";

class incioUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persona: {
        id: "",
        nombre: "",
        email: "",
        contrasena: "",
        edad: "",
        sexo: "",
        cargo: "",
        salario: "",
      },
      Redirect: false,
    }
  }

  async componentDidMount() {
    const idPer = this.props.location.state.id;
    const resp = await fetch(`${Constantes.RUTA_API}/obtener_persona.php?id=${idPer}`);
    const persona = await resp.json();

    this.setState({
      persona: persona,
    });

  }

  handleClick = () => {
    this.setState({
      Redirect:"/EditInfo"
    })

  }
  handleClickCS = () => {
    this.setState({
      Redirect:'/'
    })

  }
  render() {
    if (this.state.Redirect) {
      if(this.state.Redirect=='/EditInfo'){
      return <Redirect to={{
        pathname: this.state.Redirect,
        state: { id: this.state.persona.id }
      }} />
    }else{
      return <Redirect to={{
        pathname: this.state.Redirect,
        state: { id: 0}
      }} />
    }
    } else {
      return (
        <div className={classes['body']}>
          <h2>Perfil de Usuario</h2>
          <div className={classes['card']}>
            <InfoCard
              name={this.state.persona.nombre}
              email={this.state.persona.email}
              edad={this.state.persona.edad}
              sexo={this.state.persona.sexo}
              cargo={this.state.persona.cargo}
              salario={this.state.persona.salario}
            ></InfoCard>
              <Button
                className={classes['btn']}
                m={2}
                size="large"
                color="primary"
                variant="contained"
                onClick={this.handleClick}
                id='reg'
              >
                Editar Informacion
           </Button>
           <Button
                className={classes['btn']}
                m={2}
                size="large"
                color="primary"
                variant="contained"
                onClick={this.handleClickCS}
                id='cerr'
              >
                cerrar sesion
           </Button>
          </div>
        </div>
      );
    }
  }
}
export default incioUsuario