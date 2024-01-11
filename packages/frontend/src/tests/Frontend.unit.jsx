/**
 * @jest-environment jsdom
 */
import React from 'react';
import { expect, test } from '@jest/globals';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Frontend from '../Frontend';

test('renders with default name', async () => {
    const { getByTestId } = render(<Frontend />);
    expect(getByTestId('greeting')).toHaveTextContent('Hello, User!');
});

test('renders with custom name', async () => {
    const name = 'World';
    const { getByTestId } = render(<Frontend name={name} />);
    expect(getByTestId('greeting')).toHaveTextContent(`Hello, ${name}!`);
});

test('increases counter when button is clicked', async () => {
    const { findByRole, findByText } = render(<Frontend />);
    const button = await findByRole('button');
    button.click();
    const message = await findByText(/You've clicked the button/);
    expect(message).toHaveTextContent("You've clicked the button 1 time");
});

test('displays the correct message when counter is zero', () => {
    const { getByTestId } = render(<Frontend />);
    expect(getByTestId('greeting')).toHaveTextContent(/You should try clicking the button./);
});
