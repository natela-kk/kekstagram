import {getRandomNumber} from './utils/utils.js';

const nameList = {
  1: 'Даша',
  2: 'Маша',
  3: 'Глаша',
  4: 'Паша',
  5: 'Саша',
  6: 'Наташа',
  7: 'Рональдо',
  8: 'Месси',
  9: 'Леонелия',
  10: 'Каця',
};
const commentsIds = [];
const getCommentId = () => {
  const id = getRandomNumber(0, 1000);
  if (!commentsIds.includes(id)) {
    commentsIds.push(id);
    return id;
  }
};

const makePost = (id) => {
  const post = {};
  post.id = id;
  post.url = `photos/${id}.jpg`;
  post.description = 'это в Сочи';
  post.likes = getRandomNumber(15, 200);
  post.comments = [
    {
      id: getCommentId(),
      avatar: `img/avatar-${getRandomNumber(1, 6)}`,
      message: 'В целом всё неплохо. Но не всё.',
      name: nameList[getRandomNumber(1, 11)],
    },
    {
      id: getCommentId(),
      avatar: `img/avatar-${getRandomNumber(1, 6)}`,
      message: 'Кексобукинг лучший',
      name: nameList[getRandomNumber(1, 11)],
    },
    {
      id: getCommentId(),
      avatar: `img/avatar-${getRandomNumber(1, 6)}`,
      message: 'Пишу проект',
      name: nameList[getRandomNumber(1, 11)],
    },
    {
      id: getCommentId(),
      avatar: `img/avatar-${getRandomNumber(1, 6)}`,
      message: 'Когда на работу выйдешь?',
      name: nameList[getRandomNumber(1, 11)],
    },
    {
      id: getCommentId(),
      avatar: `img/avatar-${getRandomNumber(1, 6)}`,
      message: 'ВаУ',
      name: nameList[getRandomNumber(1, 11)],
    },
    {
      id: getCommentId(),
      avatar: `img/avatar-${getRandomNumber(1, 6)}`,
      message: 'Прикол',
      name: nameList[getRandomNumber(1, 11)],
    },
    {
      id: getCommentId(),
      avatar: `img/avatar-${getRandomNumber(1, 6)}`,
      message: 'Прикол',
      name: nameList[getRandomNumber(1, 11)],
    },
    {
      id: getCommentId(),
      avatar: `img/avatar-${getRandomNumber(1, 6)}`,
      message: 'Прикол',
      name: nameList[getRandomNumber(1, 11)],
    },
    {
      id: getCommentId(),
      avatar: `img/avatar-${getRandomNumber(1, 6)}`,
      message: 'Прикол',
      name: nameList[getRandomNumber(1, 11)],
    },
    {
      id: getCommentId(),
      avatar: `img/avatar-${getRandomNumber(1, 6)}`,
      message: 'Прикол',
      name: nameList[getRandomNumber(1, 11)],
    },
    {
      id: getCommentId(),
      avatar: `img/avatar-${getRandomNumber(1, 6)}`,
      message: 'последний',
      name: nameList[getRandomNumber(1, 11)],
    },
  ];
  return post;
};

export {makePost};
