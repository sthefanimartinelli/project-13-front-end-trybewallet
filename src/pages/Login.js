import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitUserInfo } from '../redux/actions/index';

const MIN_PASSWORD_LENGTH = 6;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(submitUserInfo({ email }));
    history.push('/carteira');
  };

  emailAndPasswordValidation = (email, password) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const emailValidation = emailRegex.test(email);
    const passwordValidation = password.length >= MIN_PASSWORD_LENGTH;
    const isDisabled = emailValidation && passwordValidation;
    return isDisabled;
  };

  render() {
    const { email, password } = this.state;
    const isDisabled = !this.emailAndPasswordValidation(email, password);

    return (
      <>
        <h1>Login</h1>
        <input
          type="text"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          required
        />
        <input
          type="text"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ this.handleChange }
          required
        />
        <button
          type="submit"
          disabled={ isDisabled }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
