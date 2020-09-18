import React from 'react';
import { Checkbox } from './Checkbox';
import { render, screen, fireEvent } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

describe('<Calendar />', () => {
  const props = {
    title: 'Example',
    field: { name: 'example', value: false },
    form: { dirty: false, touched: false, errors: false, setFieldValue: function () {} },
    handleChange: function () {},
  };

  const wrapper = <Checkbox {...props} />;

  it('test for dafault value', async () => {
    render(wrapper);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('test for check', async () => {
    render(wrapper);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
