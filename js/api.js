const API_URL = 'https://24.javascript.pages.academy/kekstagram';
// import { uploadForm } from './form.js';

const sendData = (uploadForm) => {
  fetch(API_URL, {
    method: 'POST',
    body: uploadForm,
  },
  )
    .then((response) => {
      console.log(response.status);
      console.log(response.ok);
    // return response.json();
    });
};
// .then((data) => {
//   console.log('Результат', data);
// });
export {sendData};
