import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCurrencyInfo, fetchCurrencies, setStateAfterEdit } from '../redux/actions';

class WalletForm extends Component {
  INITIAL_STATE = {
    // isEditing: false,
    id: 0,
    value: '',
    description: '',
    method: 'Dinheiro',
    tag: 'Alimentação',
    currency: 'USD',
  };

  state = this.INITIAL_STATE;

  async componentDidMount() {
    const { dispatch } = this.props;
    const currenciesResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currenciesData = await currenciesResponse.json();
    const currenciesList = Object.keys(currenciesData);
    const currencies = currenciesList
      .filter((currency) => currency !== 'USDT');
    dispatch(addCurrencyInfo({ currencies }));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleForm = (event) => {
    event.preventDefault();
    const { editor } = this.props;
    if (editor) {
      this.handleEdit();
    } else {
      this.submitFormInfo();
    }
  };

  submitFormInfo = () => {
    const { dispatch } = this.props;
    const { id } = this.state;
    dispatch(fetchCurrencies(this.state));
    this.setState({
      id: id + 1,
      value: '',
      description: '',
    });
  };

  handleEdit = () => {
    const { value, description, method, tag, currency } = this.state;
    const { dispatch } = this.props;
    const editedObjInfo = ({ value, description, method, tag, currency });
    dispatch(setStateAfterEdit(editedObjInfo));
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <>
        <div>WalletForm</div>
        <form
          onSubmit={ this.handleForm }
        >
          <input
            type="text"
            data-testid="value-input"
            name="value"
            value={ value }
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
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            { currencies.map((data) => (
              <option key={ data } value={ data }>{data}</option>
            )) }
          </select>
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          { editor
            ? <button type="submit">Editar Despesa</button>
            : <button type="submit">Adicionar Despesa</button>}
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

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  editor: wallet.editor,
  idToEdit: wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
