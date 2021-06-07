import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router';
import { signupUser, selectLoggedIn } from '../store/usersSlice'

const Signup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [requestStatus, setRequestStatus] = useState('idle')
  const loggedIn = useSelector(selectLoggedIn)
  let history = useHistory()

  useEffect(() => {
    if (loggedIn) {
      history.push('/')
    }
  })
  const canSave = () => {
    return requestStatus === 'idle' ? true : false
  }

  const handlePassword = (event) => setPassword(event.target.value)
  const handleEmail = (event) => setEmail(event.target.value)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (canSave) {
      try {
        setRequestStatus('working')
        dispatch(signupUser({ user: { email: email, password: password } }))
      } catch (err) {
        console.error('failed to save user', err)
      } finally {
        setRequestStatus('idle')
      }
    }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input type="text" name='email' id='email' onChange={handleEmail} />
        <label htmlFor='password'>Password</label>
        <input type="password" name='password' id='password' onChange={handlePassword} />
        <input type="submit" />
      </form>
    </div>
  )
}

export { Signup }
