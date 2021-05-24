import React, {Component} from 'react';
import classes from './InputWithLabel.css';

class InputWithLabel extends Component{
    render(){
        return(
            <div className={classes['inputDiv ']}>
                <label className={classes['inputLabel']}>{this.props.label}</label>
                <input
                className={classes['inputBox']}
                    id={this.props.id}
                    onChange={this.props.onChange}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    />
                </div>
        )
    }
}
export default InputWithLabel