import { render, waitFor, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

import { TEMPLATE_MOCKS } from 'containers/Template/Template.test.helper';
import { setUserSession } from 'services/AuthService';
import { SpeedSendList } from './SpeedSendList';

afterEach(cleanup);
const mocks = [...TEMPLATE_MOCKS, ...TEMPLATE_MOCKS];

const speedSend = (
  <MockedProvider mocks={mocks} addTypename={false}>
    <Router>
      <SpeedSendList />
    </Router>
  </MockedProvider>
);

setUserSession(JSON.stringify({ organization: { id: '1' }, roles: ['Admin'] }));

test('SpeedSendList has proper headers', async () => {
  const { getByText, container } = render(speedSend);

  await waitFor(() => {
    expect(getByText('Speed sends')).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('Body')).toBeInTheDocument();
    expect(getByText('Actions')).toBeInTheDocument();
  });
});
