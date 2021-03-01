import { instance } from '@/api';
import { ThunkType } from '@/types/thunk';
import { trigger } from 'swr';
import { show } from './alert';
import { CommandFormValues } from '@/components/Auth/CommandForm';
import Router from 'next/router';
import { ChangeCommandFormValues } from '@/components/Auth/ChangeCommandForm';
import { DocFormValues } from '@/components/Command/DocForm';
import { getAsString } from '@/utils/getAsString';

export const addCommand = (values: CommandFormValues): ThunkType => async dispatch => {
  await instance()
    .post(`/api/depart/`, {
      name: values.name
    })
    .then((res) => {
      dispatch(show('Вы успешно создали команду!', 'success'));
      const commandId = res.data.info.id;
      Router.push({ pathname: `/command/${commandId}` }, undefined, { shallow: true });
    })
    .catch(() => {
      dispatch(show('Ошибка при создании команды!', 'warning'));
    });
};

export const deleteCommand = (id: number): ThunkType => async dispatch => {
  await instance()
    .delete(`/api/depart/${id}`)
    .then((res) => {
      dispatch(show('Вы успешно удалили команду!', 'success'));
      Router.push({ pathname: `/command` }, undefined, { shallow: true });
    })
    .catch(() => {
      dispatch(show('Ошибка при удалении команды!', 'warning'));
    });
};

export const commandChange = (values: ChangeCommandFormValues, id: number): ThunkType => async dispatch => {
  await instance()
    .patch(`/api/depart/${id}/`, {
      name: values.name
    })
    .then((res) => {
      dispatch(show('Вы успешно сменели данные о команде!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при смене данных о команде!', 'warning'));
    });
  trigger(`/api/depart/${id}/`);
};

export const commandChangeInfo = (values: ChangeCommandFormValues, id: number): ThunkType => async dispatch => {
  await instance()
    .patch(`/api/depart/info/${id}/`, {
      idea: values.idea,
      description: values.description,
      categories: values.categories,
      requirenments: values.requirenments
    })
    .then((res) => {
      dispatch(show('Вы успешно сменели данные о команде!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при смене данных о команде!', 'warning'));
    });
  trigger(`/api/depart/${id}/`);
};

export const exitCommand = (commandId: number, membershipId: number): ThunkType => async dispatch => {
  await instance()
    .delete(`/api/membership/${membershipId}/`)
    .then((res) => {
      dispatch(show(`Вы успешно вышли из команды!`, 'success'));
    })
    .catch(() => {
      dispatch(show(`Ошибка при выходе из команды!`, 'warning'));
    });
  trigger(`/api/command/${commandId}/`);
  trigger(`/api/command/${commandId}/members/`);
};

export const addDocCommand = (values: DocFormValues): ThunkType => async dispatch => {
  const pageCommandId = getAsString(Router.query.ID);
  let form_data = new FormData();
  form_data.append('doc', values.file, values.file.name);
  form_data.append('name', values.file.name);
  form_data.append('role', values.role.join(','));
  if (pageCommandId) {
    form_data.append('command', pageCommandId);
  }
  await instance()
    .post(`/api/doc/`, form_data)
    .then((res) => {
      dispatch(show('Вы успешно добавили документ!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при добавлении документа!', 'warning'));
    });
  trigger(`/api/command/${pageCommandId}/doc/`);
};