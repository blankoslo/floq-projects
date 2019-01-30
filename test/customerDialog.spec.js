import React from 'react';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactTestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CustomerDialog from '../src/containers/customerDialog';
import configureMockStore from 'redux-mock-store';

// setup is a function, so that each call gets its own objects (mutable state)
const setup = () => {
  const wrapper = mount(
    <Provider store={configureMockStore([])({})}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <CustomerDialog createCustomer={() => { }} />
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
    // const node = ReactDOM.findDOMNode(
    //   ReactTestUtils.findRenderedDOMComponentWithTag(
    //     wrapper.instance(), 'button'
    //   )
    // );
    // console.log(node)
    // ReactTestUtils.Simulate.click(node);
    wrapper.find('button').simulate('click')
    expect(wrapper.find('Dialog').props().open).toBeTruthy();
  });
});
