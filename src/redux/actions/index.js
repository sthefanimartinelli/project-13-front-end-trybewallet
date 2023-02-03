// ACTIONS TYPES
export const SUBMIT_USER_INFO = 'SUBMIT_USER_INFO';
export const ADD_CURRENCY_INFO = 'ADD_CURRENCY_INFO';
export const ADD_MOMENT_CURRENCY_INFO = 'ADD_MOMENT_CURRENCY_INFO';
export const ADD_EXPENSE_INFO = 'ADD_EXPENSE_INFO';

// ACTIONS CREATORS
export const submitUserInfo = (user) => ({
  type: SUBMIT_USER_INFO,
  payload: user,
});

export const addCurrencyInfo = (currencies) => ({
  type: ADD_CURRENCY_INFO,
  payload: currencies,
});

export const addExpenseInfo = (expense) => ({
  type: ADD_EXPENSE_INFO,
  payload: expense,
});

export const fetchCurrencies = (state) => async (dispatch) => {
  try {
    const currenciesResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currenciesData = await currenciesResponse.json();
    // const currenciesDataFiltered = Object.fromEntries(Object.entries(currenciesData)
    //   .filter(([key]) => !key.includes('USDT')));
    // const expenseParams = { ...state, exchangeRates: currenciesDataFiltered };
    const expenseParams = { ...state, exchangeRates: currenciesData };
    dispatch(addExpenseInfo(expenseParams));
  } catch (error) {
    console.log(error);
  }
};

// export async function fetchCurrencies(state, dispatch) {
//   try {
//     const currenciesResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
//     const currenciesData = await currenciesResponse.json();
//     const currenciesDataFiltered = Object.fromEntries(Object.entries(currenciesData)
//       .filter(([key]) => !key.includes('USDT')));
//     const expenseParams = { ...state, exchangeRates: currenciesDataFiltered };
//     dispatch(addExpenseInfo(expenseParams));
//   } catch (error) {
//     console.log(error);
//   }
// }
