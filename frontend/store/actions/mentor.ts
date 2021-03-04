import { instance } from '@/api';
import { ThunkType } from '@/types/thunk';
import { show } from './alert';
import Router from 'next/router';

export const deleteMentor = (id: number): ThunkType => async dispatch => {
  await instance()
    .post(`/api/worker/${id}/donementor/`, {})
    .then((res) => {
    })
    .catch(() => {
      dispatch(show('Ошибка при завершении обучения сотрудника!', 'warning'));
    });
};

export const addMentor = (id: number): ThunkType => async dispatch => {
  await instance()
    .post(`/api/worker/${id}/mentor/`, {})
    .then((res) => {
      dispatch(show('Вы успешно стали наставником!', 'success'));
      Router.push({ pathname: `/profile/${id}` }, undefined, { shallow: true });
    })
    .catch(() => {
      dispatch(show('Ошибка при становлении наставником!', 'warning'));
    });
};