// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSE_INFO, ADD_CURRENCY_INFO } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCY_INFO:
    return { ...state, ...action.payload };
  case ADD_EXPENSE_INFO:
    return { ...state, expenses: [...state.expenses, action.payload] };
  default:
    return state;
  }
};

export default walletReducer;
