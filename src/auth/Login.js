import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../store/usersSlice';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = {
    email: "",
    password: "",
    requestStatus: "idle"
  }

  canSave = () => {
    return this.state.requestStatus === 'idle' ? true : false
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    if (this.canSave) {
      try {
        this.setState({ requestStatus: "working" })
        const { email, password } = this.state
        this.props.dispatchLoginUser({ user: { email, password }})
      } catch (err) {
        console.error('failed to save user', err)
      } finally {
        this.setState({ requestStatus: 'idle' })
      }
    }
  }
  
  render() {
    return this.props.loggedIn ? (
      <Redirect push to="/" />
    ):(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input type="text" name='email' id='email' onChange={this.handleChange} />
          <label htmlFor='password'>Password</label>
          <input type="password" name='password' id='password' onChange={this.handleChange} />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLoginUser: (credentials) => dispatch(loginUser(credentials))
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.users.loggedIn,
    error: state.users.error
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
