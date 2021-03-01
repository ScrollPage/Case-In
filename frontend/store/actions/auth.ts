import { instance, instanceWithOutHeaders } from '@/api';
import { ThunkType } from '@/types/thunk';
import Cookie from 'js-cookie';
import { show } from './alert';
import Router from 'next/router';
import { LoginFormValues } from '@/components/Auth/LoginForm';
import { ChangeFormValues } from '@/components/Auth/ChangeForm';
import { trigger } from 'swr';

export const authLogin = (values: LoginFormValues): ThunkType => async dispatch => {
  await instanceWithOutHeaders
    .post('/auth/jwt/create/', {
      email: values.email,
      password: values.password,
    })
    .then(async (res) => {
      const expirationDate = new Date(new Date().getTime() + 24 * 3600 * 1000);

      Cookie.set('token', res.data.access);
      Cookie.set('expirationDate', expirationDate);
      dispatch(checkAuthTimeout(24 * 3600 * 1000));
      await dispatch(authInfo());

      const userId = Cookie.get('userId');
      Router.push({ pathname: `/profile/${userId}` }, undefined, { shallow: true });

      dispatch(show('Вы успешно вошли!', 'success'));
    })
    .catch(() => {
      dispatch(show('Неверный логин или пароль, перепроверьте данные!', 'warning'));
    });
};

export const authInfo = (): ThunkType => async dispatch => {
  await instance()
    .get('/auth/users/me/')
    .then(res => {
      const { first_name, last_name } = res.data.info;

      Cookie.set('userId', res.data.id);
      Cookie.set('firstName', first_name);
      Cookie.set('lastName', last_name);
      // if (first_login) {
      //   dispatch(authFirstLogin());
      //   Router.push({ pathname: `/learn` }, undefined, { shallow: true });
      // }

      console.log('Информация успешно занесена в куки');
    })
    .catch(() => {
      dispatch(show('Ошибка при взятии информации о пользователе!', 'warning'));
    });
};

export const logout = (isRedirect: boolean): ThunkType => () => {
  if (isRedirect) {
    Router.push({ pathname: '/' }, undefined, { shallow: true });
  }
  Cookie.remove('token');
  Cookie.remove('expirationDate');
  Cookie.remove('firstName');
  Cookie.remove('lastName');
  Cookie.remove('userId');
  Cookie.remove('name');
  Cookie.remove('company');
  Cookie.remove('isSteakholder');
};

export const checkAuthTimeout = (expirationTime: number): ThunkType => dispatch =>
  setTimeout(() => dispatch(logout(false)), expirationTime);

export const authCheckState = (): ThunkType => dispatch => {
  const token = Cookie.get('token');

  if (token === undefined) {
    dispatch(logout(true));
  } else {
    const date: any = Cookie.get('expirationDate');
    const expirationDate = new Date(date);

    if (expirationDate <= new Date()) {
      dispatch(logout(true));
    } else {
      dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()));
    }
  }
};

export const authChange = (values: ChangeFormValues): ThunkType => async dispatch => {
  const userId = Cookie.get('userId');
  await instance()
    .patch(`/api/worker/info/${userId}/`, {
      firtst_name: values.firstName,
      last_name: values.lastName,
      phone_number: values.phone
    })
    .then((res) => {
      Cookie.set('firstName', values.firstName);
      Cookie.set('lastName', values.lastName);
      dispatch(show('Вы успешно сменели данные!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при смене информации о пользователе!', 'warning'));
    });
  trigger(`/api/worker/${userId}/`);
};

export const authFirstLogin = (): ThunkType => async dispatch => {
  const userId = Cookie.get('userId');
  await instance()
    .patch(`/api/worker/${userId}/`, {
      first_login: false
    })
    .then((res) => {
      Cookie.set('firstLogin', "0");
      dispatch(show('Вы успешно сменели данные!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при смене информации о пользователе!', 'warning'));
    });
};

export const setUserRate = (id: number, rate: number): ThunkType => async dispatch => {
  await instance()
    .post(`/api/rating/`, {
      star: rate,
      user: id
    })
    .then((res) => {
      dispatch(show('Ваш голос засчитан!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка в добавлении рейтинга!', 'warning'));
    });
  trigger(`/api/worker/${id}/`);
};

export const authChangeDev = (stage: string, value: string): ThunkType => async dispatch => {
  const userId = Cookie.get('userId');
  await instance()
    .patch(`/api/construct/${userId}/`, {
      [stage]: value
    })
    .then((res) => {
      dispatch(show(`Вы успешно описали этап ${stage}!`, 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при описании этапа!', 'warning'));
    });
  trigger(`/api/worker/${userId}/construct/`);
};





