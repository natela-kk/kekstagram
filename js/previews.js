import {makePost} from './posts-list.js';

const picturesContainer = document.querySelector('.pictures');


const renderPost = (id) => {
  const newPost = makePost(id);
  const picture = document.querySelector('#picture').content;

  const newPicture = picture.cloneNode(true);

  const image = newPicture.querySelector('img');
  const likesNumber = newPicture.querySelector('.picture__likes');
  const commentNumber = newPicture.querySelector('.picture__comments');

  image.src = newPost.url;
  likesNumber.textContent = newPost.likes;
  commentNumber.textContent = newPost.comments.length;
  return newPicture;
};

for (let i = 1; i <= 25; i++) {
  picturesContainer.appendChild(renderPost(i));
}

export {renderPost, picturesContainer};
