import { instance } from '@/api';
import { ThunkType } from '@/types/thunk';
import { show } from './alert';
import { trigger } from 'swr';

export const completeTest = (value: number, id?: number, category?: number): ThunkType => async dispatch => {
  await instance()
    .patch(`/api/test/${id}/`, {
      category, value, is_passed: true
    })
    .then((res) => {
      dispatch(show(`Вы прошли тест на ${value}% !`, 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при прохождении теста!', 'warning'));
    });
  trigger(`/api/worker/test/`);
};