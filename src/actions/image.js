import {
  IMAGE_VALIDATED,
  IMAGE_NOT_VALIDATED,
  IMAGE_PROCESSED,
  IMAGE_NOT_PROCESSED
} from '.';

const imageValid = (image) => {
  return (dispatch) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    const filePath = image.value;
    if (allowedExtensions.exec(filePath)) {
      return dispatch({
        type: IMAGE_VALIDATED,
        payload: image
      })
    } else {
      return dispatch({
        type: IMAGE_NOT_VALIDATED
        error: 'Image must have a .jgp, .jpeg, or .png file extension.'
      })
    }
  }
}
