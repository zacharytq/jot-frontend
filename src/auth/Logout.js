import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/usersSlice';

export const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const handleClick = () => {
    dispatch(logoutUser())
    history.push('/')
  }

  return (
    <button onClick={handleClick(dispatch)}>
      Logout
    </button>
  )
}
