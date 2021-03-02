import { instance } from '@/api';
import { ThunkType } from '@/types/thunk';
import { trigger } from 'swr';
import { show } from './alert';
import Router from 'next/router';
import { getAsString } from '@/utils/getAsString';

export const addPost = (title?: string, image?: any): ThunkType => async dispatch => {
  const commandId = getAsString(Router.query.ID);
  let form_data = new FormData();
  if (title) {
    form_data.append('title', title);
  }
  if (image) {
    form_data.append('picture', image, image.name);
  }
  if (commandId) {
    form_data.append('depart', commandId);
  }
  await instance()
    .post(`/api/post/`, form_data)
    .then(async (res) => {
      dispatch(show('Вы успешно добавили пост!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при добавлении поста!', 'warning'));
    });
  trigger(`/api/depart/${commandId}/post/`);
};

export const deletePost = (id: number): ThunkType => async dispatch => {
  const commandId = getAsString(Router.query.ID);
  await instance()
    .delete(`/api/post/${id}`)
    .then(async (res) => {
      dispatch(show('Вы успешно удалили пост!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при удалении поста!', 'warning'));
    });
  trigger(`/api/depart/${commandId}/post/`);
};

export const likePost = (id: number): ThunkType => async dispatch => {
  const commandId = getAsString(Router.query.ID);
  await instance()
    .post(`/api/post/${id}/like/`, {})
    .then(async (res) => {
      // dispatch(show('Вы успешно добавили лайк!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при добавлении лайка!', 'warning'));
    });
  trigger(`/api/depart/${commandId}/post/`);
};

