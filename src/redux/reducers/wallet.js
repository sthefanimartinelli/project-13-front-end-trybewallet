// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_EXPENSE_INFO,
  ADD_CURRENCY_INFO,
  SET_STATE_AFTER_EDIT,
  START_EDITING_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCY_INFO:
    return { ...state, ...action.payload };
  case ADD_EXPENSE_INFO:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case SET_STATE_AFTER_EDIT:
    return { ...state, expenses: action.payload };
  case START_EDITING_EXPENSE:
    return {
      ...state,
      editor: action.payload.editor,
      idToEdit: action.payload.idToEdit,
    };
  default:
    return state;
  }
};

export default walletReducer;
