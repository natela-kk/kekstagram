import { makePost } from './posts-list.js';
import { picturesContainer } from './previews.js';
const NEXT_COOMENTS_NUMBER = 5;
const post = document.querySelector('.big-picture');
const bigPictureImg =  post.querySelector('.big-picture__img').querySelector('img');
const previews = document.querySelectorAll('.picture__img');
const likesCount = post.querySelector('.likes-count');
const commentsCount = post.querySelector('.comments-count');
const caption = post.querySelector('.social__caption');
const socialCommentCount = post.querySelector('.social__comment-count');
const commentsLoaderButton = post.querySelector('.comments-loader');
const closeButton = post.querySelector('.big-picture__cancel');
const previewsCards = picturesContainer.querySelectorAll('.picture');
const socialCommentsList = post.querySelector('.social__comments');

const onButtonClick = () => {
  closePost();
};

const onDocumentKeydown = (evt) => {
  if(evt.key === 'Escape') {
    closePost();
  }
};
function closePost() {
  post.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', onButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

previews.forEach((preview, postIndex) => {
  preview.addEventListener('click', () => {
    post.classList.remove('hidden');
    bigPictureImg.src = preview.src;
    const postInfo = makePost(postIndex + 1);
    const likes = previewsCards[postIndex].querySelector('.picture__likes').textContent;
    likesCount.textContent = likes;
    const commentsNumber = previewsCards[postIndex].querySelector('.picture__comments').textContent;
    commentsCount.textContent = commentsNumber;
    let socialComments;
    const commentDo = () => {
      socialComments = post.querySelectorAll('.social__comment');
      socialComments.forEach((comment, index) => {
        const commetAuthor = comment.querySelector('.social__picture');
        commetAuthor.src = `http://localhost:3000/${postInfo.comments[index].avatar}.svg`;
        commetAuthor.alt = postInfo.comments[index].name;
        const commentText = comment.querySelector('.social__text');
        commentText.textContent = postInfo.comments[index].message;
      });
    };
    commentDo();
    caption.textContent = postInfo.description;
    document.body.classList.add('modal-open');

    closeButton.addEventListener('click', onButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);

    const onLoaderButtonClick = () => {
      for (let i = 0; i < NEXT_COOMENTS_NUMBER; i++) {
        if (postInfo.comments.length > socialComments.length) {
          const nextComment = document.createElement('li');
          nextComment.classList.add('social__comment');
          const nextCommentImg = document.createElement('img');
          nextCommentImg.src = 'img/avatar-3.svg';
          nextCommentImg.classList.add('social__picture');
          nextCommentImg.alt = '';
          const nextCommentText = document.createElement('p');
          nextCommentText.classList.add('social__text');
          nextCommentText.textContent = '';
          nextComment.appendChild(nextCommentImg);
          nextComment.appendChild(nextCommentText);
          socialCommentsList.appendChild(nextComment);
          commentDo();
          socialCommentCount.textContent = `${socialComments.length} из ${postInfo.comments.length}`;
        }
      }
    };
    commentsLoaderButton.addEventListener('click', onLoaderButtonClick);
  });
});
