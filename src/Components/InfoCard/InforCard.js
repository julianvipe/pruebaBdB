import React, { Component } from 'react';
import classes from './InfoCard.css';

class infoCard extends Component{
    render(){
        return(
            <div className = {classes['card']}>
                <div className = {classes['image']}>
                    <h4>Nombre: {this.props.name}</h4>
                    <p>E-mail: {this.props.email}</p>
                    <p>Edad: {this.props.edad}</p>
                    <p>Sexo: {this.props.sexo}</p> 
                    <p>Cargo: {this.props.cargo}</p> 
                    <p>Salario: ${this.props.salario}</p>                 
                </div>
            </div>
        );
    }
}
export default infoCard