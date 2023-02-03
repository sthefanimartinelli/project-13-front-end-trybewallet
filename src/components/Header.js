import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  totalSum = () => {
    const { expenses } = this.props;
    const totalSum = expenses.reduce((acc, curr) => {
      const eachExpenseValue = parseFloat(curr.value)
        * parseFloat(curr.exchangeRates[curr.currency].ask);
      const sum = eachExpenseValue + parseFloat(acc);
      return sum.toFixed(2);
    }, '0.00');
    return totalSum;
  };

  render() {
    const { email } = this.props;
    return (
      <>
        <div>Header</div>
        <h3
          name="userEmail"
          data-testid="email-field"
        >
          { email }
        </h3>
        <h3
          name="despesaTotal"
          data-testid="total-field"
        >
          { this.totalSum() }
        </h3>
        <h3
          name="cambio"
          data-testid="header-currency-field"
        >
          BRL
        </h3>
      </>
    );
  }
}

const mapStateToProps = ({ wallet, user }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.shape({
    reduce: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Header);
