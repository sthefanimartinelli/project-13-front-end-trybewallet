// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SUBMIT_USER_INFO } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_USER_INFO:
    return { ...state, ...action.payload };
  // case SUBMIT_WALLET_INFO:
  //   return { ...state, wallet: { ...action.payload } };
  default:
    return state;
  }
};

export default userReducer;
