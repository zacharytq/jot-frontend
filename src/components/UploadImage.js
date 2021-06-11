import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { selectLoggedIn } from '../store/usersSlice';
import { useHistory } from 'react-router-dom';

import { postNewImage } from '../store/imagesSlice';

export function UploadImage() {

  const dispatch = useDispatch()
  const history = useHistory();
  const [selectedImage, setSelectedimage] = useState();
  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  const loggedIn = useSelector(selectLoggedIn);

  const canSave = addRequestStatus === 'idle'; 

  const handleImageSelect = (e) => setSelectedimage(e.target.files[0])

  const handleUploadImage = async (event) => {
    event.preventDefault();

    if (canSave) {
      const formData = new FormData();
      formData.append(
        'image',
        selectedImage,
        selectedImage.name
      )

      try {
        setAddRequestStatus('pending')
        dispatch(postNewImage(formData))
          .then(unwrapResult)
          .then((result) => {
            history.push(`/images/${result.id}`)
          })
        
      } catch (err) {
        console.error('Failed to upload image: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }

  }

    return (
      <div>
        <form onSubmit={ handleUploadImage }>
          <input type='file' onChange={handleImageSelect} />
          <button type='submit'>Upload</button>
        </form>
        <p>{loggedIn ? 'works' : 'doesnt work'}</p>
      </div>
    )
}
