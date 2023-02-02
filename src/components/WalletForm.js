import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addWalletInfo } from '../redux/actions';

class WalletForm extends Component {
  state = {
    expense: 0,
    description: '',
    methodInput: 'Dinheiro',
    tagInput: 'Alimentação',
    currencySelected: 'USD',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const currenciesResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currenciesData = await currenciesResponse.json();
    const currenciesList = Object.keys(currenciesData);
    const currenciesListFiltered = currenciesList
      .filter((currency) => currency !== 'USDT');
    // console.log(currenciesListFiltered);
    dispatch(addWalletInfo({ currencies: currenciesListFiltered }));

    // fetch('https://economia.awesomeapi.com.br/json/all')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const currenciesList = Object.keys(data);
    //     const currenciesListFiltered = currenciesList
    //       .filter((currency) => currency !== 'USDT');
    //     console.log(currenciesListFiltered);

    // this.setState({ currencies: data.results });
    // });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { currencies } = this.props;
    console.log(currencies);
    const { expense, description, currencySelected, methodInput, tagInput } = this.state;
    return (
      <>
        <div>WalletForm</div>
        <form>
          <input
            type="text"
            data-testid="value-input"
            name="expense"
            value={ expense }
            onChange={ this.handleChange }
            required
          />
          <input
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            required
          />
          <select
            data-testid="currency-input"
            value={ currencySelected }
            onChange={ this.handleChange }
          >
            { currencies.map((currency) => (
              <option key={ currency } value={ currency }>{currency}</option>
            )) }
          </select>
          <select
            data-testid="method-input"
            value={ methodInput }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            value={ tagInput }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </form>
      </>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.shape({
    id: PropTypes.string,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
