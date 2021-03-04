import { instance } from '@/api';
import { ThunkType } from '@/types/thunk';
import { show } from './alert';
import { trigger } from 'swr';

export const goToEvent = (id: number): ThunkType => async dispatch => {
  await instance()
    .post(`/api/conf/`, {
      task: id
    })
    .then(() => {
    })
    .catch(() => {
      dispatch(show('Ошибка при отметке на мероприятие!', 'warning'));
    });
  trigger(`/api/worker/calendlytask/`);
};
