import {FETCH_VIDEO} from '../actions/type';

const initialState = {
  videoData: [],
};

const fetchVideoReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_VIDEO:
      return {
        ...state,
        videoData: action.payload,
      };
    default:
      return state;
  }
};

export default fetchVideoReducers;
