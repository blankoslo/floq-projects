import React from 'react';
import { Provider } from 'react-redux';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureMockStore from 'redux-mock-store';
import CustomerDialog from '../src/containers/customerDialog';

Enzyme.configure({ adapter: new Adapter() });

// setup is a function, so that each call gets its own objects (mutable state)
const setup = () => {
  const wrapper = mount(
    <Provider store={configureMockStore([])({})}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <CustomerDialog createCustomer={() => { }} />
      </MuiThemeProvider>
    </Provider>
  );

  return {
    wrapper
  };
};

describe('<CustomerDialog />', () => {
  it('contains button when clicked triggers open dialog', () => {
    const { wrapper } = setup();
    expect(wrapper.find('Dialog').props().open).toBeFalsy();
    wrapper.find('button').simulate('click');
    expect(wrapper.find('Dialog').props().open).toBeTruthy();
  });
});
