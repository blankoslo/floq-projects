import React from 'react';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import expect from 'expect';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CustomerDialog from '../src/containers/customerDialog';
import configureMockStore from 'redux-mock-store';

// Needed because of the touchTap event
injectTapEventPlugin();

// setup is a function, so that each call gets it's own objects (mutable state)
const setup = () => {
  const wrapper = mount(
    <Provider store={configureMockStore([])({})}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <CustomerDialog createCustomer={() => {}} />
      </MuiThemeProvider>
    </Provider>);

  return {
    wrapper
  };
};

describe('<CustomerDialog />', () => {
  it('contains button when clicked triggers open dialog', () => {
    const { wrapper } = setup();
    expect(wrapper.find('Dialog').props().open).toBeFalsy();

    // A work-around because of lacking functionality in enzyme/react.
    // TODO: Change to wrappper.find('button').simulate('touchTap') when available
    const node = ReactDOM.findDOMNode(
        ReactTestUtils.findRenderedDOMComponentWithTag(
          wrapper.instance(), 'button'
        )
      );
    ReactTestUtils.Simulate.touchTap(node);

    expect(wrapper.find('Dialog').props().open).toBeTruthy();
  });
});
