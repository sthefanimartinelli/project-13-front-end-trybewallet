// ACTIONS TYPES
export const SUBMIT_USER_INFO = 'SUBMIT_USER_INFO';
export const ADD_EXPENSE_INFO = 'ADD_EXPENSE_INFO';

// ACTIONS CREATORS
export const submitUserInfo = (user) => ({
  type: SUBMIT_USER_INFO,
  payload: user,
});

export const addWalletInfo = (wallet) => ({
  type: ADD_EXPENSE_INFO,
  payload: wallet,
});
