import Cookie from 'js-cookie';
import { instance } from '@/api';
import { ThunkType } from '@/types/thunk';
import { trigger } from 'swr';
import { show } from './alert';
import { CommandFormValues } from '@/components/Auth/CommandForm';
import Router from 'next/router';
import { ChangeCommandFormValues } from '@/components/Auth/ChangeCommandForm';
import { DocFormValues } from '@/components/Command/DocForm';
import { getAsString } from '@/utils/getAsString';
import { CalendlyFormValues } from '@/components/Calendly/CalendlyForm';

export const addCommand = (values: CommandFormValues): ThunkType => async dispatch => {
  await instance()
    .post(`/api/depart/`, {
      name: values.name
    })
    .then((res) => {
      dispatch(show('Вы успешно создали отдел!', 'success'));
      const commandId = res.data.id;
      Router.push({ pathname: `/command/${commandId}` }, undefined, { shallow: true });
    })
    .catch(() => {
      dispatch(show('Ошибка при создании отдела!', 'warning'));
    });
};

export const deleteCommand = (id: number): ThunkType => async dispatch => {
  await instance()
    .delete(`/api/depart/${id}`)
    .then((res) => {
      dispatch(show('Вы успешно удалили отдел!', 'success'));
      Router.push({ pathname: `/command` }, undefined, { shallow: true });
    })
    .catch(() => {
      dispatch(show('Ошибка при удалении отдела!', 'warning'));
    });
};

export const commandChange = (values: ChangeCommandFormValues, id: number): ThunkType => async dispatch => {
  await instance()
    .patch(`/api/depart/${id}/`, {
      name: values.name
    })
    .then((res) => {
      dispatch(show('Вы успешно сменели данные об отделе!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при смене данных об отдела!', 'warning'));
    });
  trigger(`/api/depart/${id}/`);
};

export const commandChangeInfo = (values: ChangeCommandFormValues, id: number): ThunkType => async dispatch => {
  await instance()
    .patch(`/api/depart/info/${id}/`, {
      description: values.description,
      motto: values.motto,
    })
    .then((res) => {
      dispatch(show('Вы успешно сменели данные об отделе!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при смене данных об отделе!', 'warning'));
    });
  trigger(`/api/depart/${id}/`);
};

export const exitOrInviteCommand = (workerId?: number): ThunkType => async dispatch => {
  const commandId = getAsString(Router.query.ID);
  const userId = workerId ?? Cookie.get('userId');
  await instance()
    .post(`/api/depart/${commandId}/membertoggle/`, {
      user: userId
    })
    .then((res) => {
      dispatch(show(workerId ? `Вы успешно добавили сотрудника в отдел!` : `Вы успешно вышли из отдела!`, 'success'));
    })
    .catch(() => {
      dispatch(show(workerId ? `Ошибка при добавлении сотрудника в отдел!` : `Ошибка при выходе из отдела!`, 'warning'));
    });
  trigger(`/api/depart/${commandId}/`);
  trigger(`/api/depart/${commandId}/worker/`);
};

export const addDocCommand = (values: DocFormValues): ThunkType => async dispatch => {
  const pageCommandId = getAsString(Router.query.ID);
  let form_data = new FormData();
  form_data.append('name', values.file.name);
  form_data.append('doc', values.file, values.file.name);
  if (pageCommandId) {
    form_data.append('depart', pageCommandId);
  }
  await instance()
    .post(`/api/doc/`, form_data)
    .then((res) => {
      dispatch(show('Вы успешно добавили документ!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при добавлении документа!', 'warning'));
    });
  trigger(`/api/depart/${pageCommandId}/doc/`);
};

export const addCalendly = (values: CalendlyFormValues): ThunkType => async dispatch => {
  const pageCommandId = getAsString(Router.query.ID);
  await instance()
    .post(`/api/calendlytask/`, {
      datetime: values.time,
      description: values.name,
      depart: pageCommandId
    })
    .then((res) => {
      dispatch(show('Вы успешно добавили мероприятие!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при добавлении мероприятия!', 'warning'));
    });
};

