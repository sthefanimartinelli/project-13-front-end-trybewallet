import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes do componente Wallet', () => {
  it('Testa a existência do contador inicial no header', () => {
    renderWithRouterAndRedux(<Wallet />);

    const walletSum = screen.getByRole('heading', { name: /0\.00/i });
    expect(walletSum).toBeInTheDocument();
    expect(walletSum.innerHTML).toBe('0.00');
  });
  it('Testa se o valor do contador aumenta ao adicionar itens', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId('value-input');
    expect(valueInput).toBeInTheDocument();
    userEvent.type(valueInput, '53');
    const descriptionInput = screen.getByTestId('description-input');
    userEvent.type(descriptionInput, 'Lanche');
    const addExpenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(addExpenseBtn);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /excluir/i })).toBeInTheDocument();
    });
  });
});
