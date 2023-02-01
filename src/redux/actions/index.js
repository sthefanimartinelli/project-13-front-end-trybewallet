// ACTIONS TYPES
export const SUBMIT_USER_INFO = 'SUBMIT_USER_INFO';

// ACTIONS CREATORS
export const submitUserInfo = (user) => ({
  type: SUBMIT_USER_INFO,
  payload: user,
});

// export const submitWalletInfo = (wallet) => ({
//   type: SUBMIT_USER_INFO,
//   payload: wallet,
// });
