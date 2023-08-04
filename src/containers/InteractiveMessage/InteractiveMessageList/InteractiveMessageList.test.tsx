import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter as Router } from 'react-router-dom';

import { filterInteractiveQuery, getInteractiveCountQuery } from 'mocks/InteractiveMessage';
import { setUserSession } from 'services/AuthService';
import InteractiveMessageList from './InteractiveMessageList';

const mocks = [filterInteractiveQuery, filterInteractiveQuery, getInteractiveCountQuery];
setUserSession(JSON.stringify({ roles: ['Admin'] }));

const list = (
  <MockedProvider mocks={mocks} addTypename={false}>
    <Router>
      <InteractiveMessageList />
    </Router>
  </MockedProvider>
);

test('Interactive message list renders correctly', async () => {
  render(list);
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await waitFor(
    async () => {
      const title = await screen.findByText('Interactive msg');
      const label = await screen.findByText('Title');
      const messageBody = await screen.findByText('Message');
      const type = await screen.findByText('Type');

      expect(title).toBeInTheDocument();
      expect(label).toBeInTheDocument();
      expect(messageBody).toBeInTheDocument();
      expect(type).toBeInTheDocument();
    },
    { timeout: 5000 }
  );

  expect(screen.getByText('List')).toBeInTheDocument();
  expect(screen.getAllByText('Quick Reply')[0]).toBeInTheDocument();
});
