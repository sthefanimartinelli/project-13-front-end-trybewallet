// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_EXPENSE_INFO,
  ADD_CURRENCY_INFO,
  SET_STATE_AFTER_EDIT,
  START_EDITING_EXPENSE,
  SET_STATE_AFTER_DELETE,
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
  case SET_STATE_AFTER_DELETE:
    return { ...state, expenses: action.payload };
  case SET_STATE_AFTER_EDIT:
    return {
      ...state,
      expenses: state.expenses.reduce((acc, curr) => {
        if (curr.id === state.idToEdit) {
          return [...acc,
            { ...curr,
              value: action.payload.value,
              description: action.payload.description,
              method: action.payload.method,
              tag: action.payload.tag,
              currency: action.payload.currency,
            }];
        }
        return [...acc, curr];
      }, []),
      editor: false,
    };
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
