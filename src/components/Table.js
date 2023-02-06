import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setStateAfterEdit, startEditingExpense } from '../redux/actions/index';

class Table extends Component {
  deleteExpense = ({ target }) => {
    const { dispatch, expenses } = this.props;
    const newExpensesList = expenses.filter((expense) => expense.id !== +target.id);
    dispatch(setStateAfterEdit(newExpensesList));
  };

  startEditingExpense = ({ target }) => {
    const { dispatch } = this.props;
    const { id } = target;
    // const expenseInfo = expenses.filter((expense) => expense.id === id);
    // console.log(expenseInfo);
    // const expenseEditingInfo = ({
    //   isEditing: true,
    //   currEditingExpense: {
    //     // id,
    //     value: expenseInfo.value,
    //     description: expenseInfo.description,
    //     currency: expenseInfo.currency,
    //     method: expenseInfo.method,
    //     tag: expenseInfo.tag,
    //     exchangeRates: expenseInfo.exchangeRates,
    //   },
    // });
    const objEditor = ({
      editor: true,
      idToEdit: id,
    });
    dispatch(startEditingExpense(objEditor));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <div>Table</div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => {
              const {
                id, value, description, currency, method, tag, exchangeRates,
              } = expense;
              const cambio = parseFloat(exchangeRates[currency].ask);
              const valueConverted = parseFloat(value) * cambio;
              const valueStringToNumber = parseFloat(value);
              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ valueStringToNumber.toFixed(2) }</td>
                  <td>{ exchangeRates[currency].name }</td>
                  <td>{ cambio.toFixed(2) }</td>
                  <td>{ valueConverted.toFixed(2) }</td>
                  <td>Real</td>
                  <td>
                    <button
                      id={ id }
                      data-testid="edit-btn"
                      onClick={ this.startEditingExpense }
                      type="button"
                    >
                      Editar
                    </button>
                    <button
                      id={ id }
                      data-testid="delete-btn"
                      onClick={ this.deleteExpense }
                      type="button"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Table);
