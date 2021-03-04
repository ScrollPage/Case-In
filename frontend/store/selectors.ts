import { AppStateType } from './reducers/rootReducer';

export const getAlertInfo = (state: AppStateType) => {
  const { text, typeOf, image } = state.alert;
  return {
    text,
    type: typeOf,
    image
  }
}

export const getModalInfo = (state: AppStateType) => {
  const { modalName, modalProps } = state.modal;
  return {
    name: modalName,
    props: modalProps
  }
}

export const getMessageInfo = (state: AppStateType) => {
  const { messages, loading } = state.message;
  return {
    messages, loading
  }
}


