import React, {Component} from 'react';
import axios from 'axios';

const initialUser = {
    username: '',
    password: '',
}

const url = process.env.REACT_APP_API_URL;

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: {
                ...initialUser
            },
            message: '',
        }
    }

    inputHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ user: {...this.state.user, [name]: value }})
    }

    submitHandler = (event) => {
        event.preventDefault();
        axios.post(`${url}/api/login`, this.state.user)
        .then(res => {
           if (res.status === 200 && res.data){

            localStorage.setItem('secret_token', res.data.token) 
            this.setState({
                   message: 'login successful',
                   user: {...initialUser},
               })
           } else {
            throw new Error();
           }
        })
        .catch(err => {
            this.setState({
                message: 'authentication failed',
                user: {...initialUser},
                })
        });
    }

    render(){
        return (
            <div>

            <section className="notification">
            { this.state.message
                ? (<h4>{this.state.message}</h4>)
                : " "
            }                
            </section>


            <form onSubmit={this.submitHandler}>
            
            <label htmlFor="username">Username</label>
            <input
            type="text"
            id="username"
            name="username"
            value={this.state.username}
            onChange={this.inputHandler}/>

            <label htmlFor="password">Password</label>
            <input
            type="text"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.inputHandler}/>

            <button type='submit'>Submit</button>

            </form>

            </div>
        )
    }
}