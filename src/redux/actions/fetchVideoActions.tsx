import {FETCH_VIDEO} from './type';

export const fetchVideo = (data: any) => {
  return (dispatch: any) => {
    dispatch({
      type: FETCH_VIDEO,
      payload: data,
    });
  };
};
