import { instance } from '@/api';
import { ThunkType } from '@/types/thunk';
import { show } from './alert';
import { trigger } from 'swr';
import Router from 'next/router';
import { getAsString } from '@/utils/getAsString';
import { CreateTaskFormValues as CreateUserTaskFormValues } from '@/components/UserTask/CreateTaskForm';
import { EditTaskFormValues } from '@/components/UserTask/EditTaskForm';

export const addUserTask = (values: CreateUserTaskFormValues): ThunkType => async dispatch => {
  const pageUserId = Number(getAsString(Router.query.ID));
  await instance()
    .post(`/api/diagramtask/`, {
      begin_time: values.beginDate,
      end_time: values.endDate,
      name: values.name,
      description: values.description,
      user: pageUserId
    })
    .then((res) => {
      dispatch(show('Вы успешно добавили задачу!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при добавлении задачи!', 'warning'));
    });
  trigger(`/api/worker/${pageUserId}/diagram/`);
};


export const editUserTask = (values: EditTaskFormValues): ThunkType => async dispatch => {
  const pageUserId = Number(getAsString(Router.query.ID));
  await instance()
    .patch(`/api/diagramtask/${values.name}/`, {
      percentage: Number(values.percentage)
    })
    .then((res) => {
      dispatch(show('Вы успешно изменили задачу!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при изменении задачи!', 'warning'));
    });
  trigger(`/api/worker/${pageUserId}/diagram/`);
};