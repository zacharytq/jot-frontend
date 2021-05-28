import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { postNewImage } from '../store/imagesSlice';

export function UploadImage() {

  const dispatch = useDispatch()
  const [selectedImage, setSelectedimage] = useState();
  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  const regex = /([a-zA-Z0-9\s_\\.\-:])+(.png|.jpg|.gif)$/;


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
        const resultAction = await dispatch(postNewImage(formData))
        unwrapResult(resultAction);
        console.log(resultAction)
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
      </div>
    )
}
