import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { setUserSession } from 'services/AuthService';
import { mocks, contactFieldErrorMock } from 'mocks/ContactFields';
import ContactFieldList from './ContactFieldList';

afterEach(() => {
  cleanup();
});

vi.mock('react-router-dom', async () => ({
  ...((await vi.importActual<any>('react-router-dom')) as {}),
  useParams: () => ({ id: '1' }),
}));

setUserSession(JSON.stringify({ organization: { id: '1' }, roles: ['Admin'] }));

const list = (
  <MockedProvider mocks={mocks} addTypename={false}>
    <Router>
      <ContactFieldList />
    </Router>
  </MockedProvider>
);

test('it renders list successfully', async () => {
  render(list);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  await waitFor(() => {
    const variableNameLabel = screen.getByText('Variable name');
    const inputNameLabel = screen.getByText('Input name');
    const shortcodeLabel = screen.getByText('Shortcode');
    const actionLabel = screen.getByText('Actions');

    expect(variableNameLabel).toBeInTheDocument();
    expect(inputNameLabel).toBeInTheDocument();
    expect(shortcodeLabel).toBeInTheDocument();
    expect(actionLabel).toBeInTheDocument();
  });

  setTimeout(async () => {
    const editButtons = screen.getAllByTestId('edit-icon');
    console.log('editButtons');

    await waitFor(() => {
      expect(editButtons[0]).toBeInTheDocument();
      fireEvent.click(editButtons[0]);
      // Edit, clears value and click save
      const inputFields = screen.getAllByRole('textbox');
      userEvent.type(inputFields[1], '{selectall}{backspace}');
      const saveButton = screen.getByTestId('save-button');
      fireEvent.click(saveButton);

      userEvent.type(inputFields[1], '{selectall}{backspace}Age Group Name');
      fireEvent.click(saveButton);
    });
  }, 5000);

  await waitFor(() => {});
});

const errorMock: any = [...mocks, ...mocks];
errorMock.push(contactFieldErrorMock);

const listError = (
  <MockedProvider mocks={errorMock}>
    <Router>
      <ContactFieldList />
    </Router>
  </MockedProvider>
);

test('it renders component, edits field, saves and error occurs', async () => {
  render(listError);
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  setTimeout(async () => {
    await waitFor(() => {
      const editButtons = screen.getAllByTestId('edit-icon');
      expect(editButtons[3]).toBeInTheDocument();
      fireEvent.click(editButtons[3]);

      // Edit, clears value and click save
      const inputFields = screen.getAllByRole('textbox');
      userEvent.type(inputFields[1], '{selectall}{backspace}age_group');
      const saveButton = screen.getByTestId('save-button');
      fireEvent.click(saveButton);
    });
  }, 5000);

  await waitFor(() => {});
});
