import { instance } from '@/api';
import { ThunkType } from '@/types/thunk';

export const achieve = (): ThunkType => async dispatch => {
  await instance()
    .put(`/api/achieve/`, {})
};
