import React from 'react';
import { shallow } from 'enzyme';
import MessageTemplatePage from './MessageTemplatePage';
import { MessageTemplateList } from '../../../containers/Template/SpeedSend/SpeedSendList/SpeedSendList';

const wrapper = shallow(<MessageTemplatePage />);

describe('<TagPage />', () => {
  it('should display the Message Template Page', () => {
    expect(wrapper.find(MessageTemplateList).exists()).toBe(true);
  });
});
