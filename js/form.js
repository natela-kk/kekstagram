import {sendData} from './api.js';

const HASHTAGS_LIMIT = 5;
const DESCRIPTION_LIMIT = 140;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const photoUpload = document.querySelector('#upload-file');
const modal = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const postDescription = uploadForm.querySelector('.text__description');
const scaleSmallerButton = uploadForm.querySelector('.scale__control--smaller');
const scaleBiggerButton = uploadForm.querySelector('.scale__control--bigger');
const scaleControl = uploadForm.querySelector('.scale__control--value');
const uploadPreview = uploadForm.querySelector('.img-upload__preview').querySelector('img');
const slider = uploadForm.querySelector('.effect-level__slider');
const filterOptions = uploadForm.querySelectorAll('.effects__radio');
const effectLevel = uploadForm.querySelector('.effect-level__value');

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const updateSlider = () => {
  if (uploadPreview.className === 'effects__preview--chrome' || uploadPreview.className === 'effects__preview--sepia') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  } else if (uploadPreview.className === 'effects__preview--heat' || uploadPreview.className === 'effects__preview--phobos') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  } else if (uploadPreview.className === 'effects__preview--marvin') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  }
};
slider.classList.add('hidden');

filterOptions.forEach((filter) => {
  filter.addEventListener('click', () => {
    uploadPreview.style.removeProperty('filter');
    uploadPreview.className = `effects__preview--${filter.value}`;
    if (uploadPreview.className !== 'effects__preview--none') {
      slider.classList.remove('hidden');
    } else {
      slider.classList.add('hidden');
    }
    updateSlider();
  });
});

slider.noUiSlider.on('update', (_, handle, unencoded) => {
  effectLevel.value = unencoded[handle];
  if (uploadPreview.className === 'effects__preview--chrome') {
    uploadPreview.style.filter= `grayscale(${effectLevel.value})`;
  } else if (uploadPreview.className === 'effects__preview--sepia') {
    uploadPreview.style.filter= `sepia(${effectLevel.value})`;
  } else if (uploadPreview.className === 'effects__preview--marvin') {
    uploadPreview.style.filter= `invert(${effectLevel.value}%)`;
  } else if (uploadPreview.className === 'effects__preview--phobos') {
    uploadPreview.style.filter= `blur(${effectLevel.value}px)`;
  } else if (uploadPreview.className === 'effects__preview--heat') {
    uploadPreview.style.filter= `brightness(${effectLevel.value})`;
  }
});

scaleSmallerButton.addEventListener('click', () => {
  const scaleValue = scaleControl.value.slice(0, -1);
  if(scaleValue > SCALE_MIN) {
    const newScale = `${scaleValue - 25}%`;
    scaleControl.value = newScale;
    uploadPreview.style.transform = `scale(0.${newScale.slice(0, -1)})`;
  }
});

scaleBiggerButton.addEventListener('click', () => {
  const scaleValue = scaleControl.value.slice(0, -1);
  if(scaleValue < SCALE_MAX) {
    const newScale = `${Number(scaleValue) + 25}%`;
    scaleControl.value = newScale;
    if(newScale === '100%') {
      uploadPreview.style.transform = 'scale(1)';
    } else {
      uploadPreview.style.transform = `scale(0.${newScale.slice(0, -1)})`;
    }
  }

});


const onButtonClick = () => {
  closeModal();
};

const onDocumentKeydown = (evt) => {
  if(evt.key === 'Escape' && hashtagInput !== document.activeElement && postDescription !== document.activeElement) {
    closeModal();
  }
};
function closeModal() {
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  closeButton.removeEventListener('click', onButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const addCloseListener = () => {
  closeButton.addEventListener('click', onButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const openModal = () => {
  photoUpload.addEventListener('change', () => {
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    addCloseListener();
    scaleControl.value = '100%';
  });
};

const tagPattern = new RegExp(/^#[a-zа-яё0-9_]{1,19}$/i);

const hasDuplicates = (array) => (new Set(array)).size !== array.length;
const splitTags = () => {
  const string = hashtagInput.value;
  const hashtagsSplit = string.toLowerCase().split(' ');
  return hashtagsSplit;
};

hashtagInput.addEventListener('input', () => {
  const hashtags = splitTags();
  hashtags.forEach((hashtag) => {
    if ((tagPattern.test(hashtag) && !hasDuplicates(hashtags)) || hashtag === '' || hashtag === '#') {
      hashtagInput.setCustomValidity('');
    } else if (!tagPattern.test(hashtag)){
      hashtagInput.setCustomValidity('Хэш-тег должен начинаться с символа #, содержать в себе только буквы, числа или символ _');
    }
  });

  if(hasDuplicates(hashtags)) {
    hashtagInput.setCustomValidity('Хэш-теги не должны повторяться');
  } else if (hashtags.length > HASHTAGS_LIMIT && hashtags[HASHTAGS_LIMIT] !== '') {
    hashtagInput.setCustomValidity('Хэш-тегов может быть не больше пяти');
  }
  hashtagInput.reportValidity();
});

const checkTags = () => {
  const hashtags = splitTags();
  hashtags.forEach((hashtag) => {
    if (hashtag === '#') {
      hashtagInput.setCustomValidity('Хэш-тег не может состоять только из решетки');
    }
  });
};

postDescription.addEventListener('input', () => {
  if (postDescription.value.length > DESCRIPTION_LIMIT) {
    postDescription.setCustomValidity('Длина комментария не должна превышать 140 символов');
  } else {
    postDescription.setCustomValidity('');
  }
  postDescription.reportValidity();
});

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  checkTags();
  sendData(uploadForm);
});
openModal();
closeModal();
