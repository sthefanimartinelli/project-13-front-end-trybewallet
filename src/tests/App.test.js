import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const EMAIL_ID = 'email-input';
const PASSWORD = 'password-input';

describe('Testes do componente <App.js />', () => {
  it('Testa a existência do título da página de login, dos campos de email, senha e botão', () => {
    renderWithRouterAndRedux(<App />);

    const loginTitle = screen.getByRole('heading', { name: /login/i, level: 1 });
    expect(loginTitle).toBeInTheDocument();

    const entrarBtn = screen.getByRole('button', { name: /entrar/i });
    expect(entrarBtn).toBeInTheDocument();

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.innerHTML).toBe('');

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
  });

  it('Testa o redirecionamento para a página da carteira', () => {
    renderWithRouterAndRedux(<App />);
    const entrarBtn = screen.getByRole('button', { name: /entrar/i });
    const emailInput = screen.getByTestId(EMAIL_ID);
    const passwordInput = screen.getByTestId(PASSWORD);

    userEvent.type(emailInput, 'sthefani_martinelli@hotmail.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(entrarBtn);
    expect(screen.getByText('sthefani_martinelli@hotmail.com')).toBeInTheDocument();
    expect(screen.getByText('0.00')).toBeInTheDocument();
  });

  it('Testa o caso de inserir email inválido', () => {
    renderWithRouterAndRedux(<App />);
    const entrarBtn = screen.getByRole('button', { name: /entrar/i });
    const emailInput = screen.getByTestId(EMAIL_ID);
    const passwordInput = screen.getByTestId(PASSWORD);

    userEvent.type(emailInput, 'sthefani_martinelli');
    userEvent.type(passwordInput, '123456');
    expect(entrarBtn).toBeDisabled();
  });
});
