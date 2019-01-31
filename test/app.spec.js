import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Immutable from 'immutable';
import fetchMock from 'fetch-mock';
import { connect } from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { App, mapStateToProps } from '../src/containers/app';

Enzyme.configure({ adapter: new Adapter() });

beforeAll(() => {
  // If missing, fetch global will be undefined. The json-content is unused.
  fetchMock.mock('^https://api-dev.floq.no', { unused: 'data' });
});

afterAll(() => {
  fetchMock.restore();
});

// setup is a function, so that each call gets its own objects (mutable state)
const setup = () => {
  const params = {
    id: 1
  };

  const projects = {
    loading: false,
    excludeInactiveProjects: true,
    data: new Immutable.Map([
      {
        id: 1,
        name: 'test_project_one',
        customer: 'TEST1000',
        active: true
      }
    ].map(e => [e.id, e]))
  };

  const customers = {
    loading: false,
    data: new Immutable.Map([
      {
        id: 'TEST1000',
        name: 'test_customer_one'
      },
      {
        id: 'TEST1001',
        name: 'test_customer_two'
      }
    ].map(e => [e.id, e]))
  };

  const state = {
    projects,
    customers,
    selected_project: null
  };

  const mapDispatchToProps = {
    fetchProjects: () => ({ type: 'MOCKED_ACTIONS' }),
    fetchCustomers: () => ({ type: 'MOCKED_ACTIONS' }),
    toggleShowInactiveProjects: () => ({ type: 'MOCKED_ACTIONS' })
  };

  const AppMocked = connect(mapStateToProps, mapDispatchToProps)(App);

  const wrapper = mount(
    <Provider store={configureMockStore([])(state)}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <AppMocked params={params} />
      </MuiThemeProvider>
    </Provider>
  );


  return {
    wrapper
  };
};

describe('<App />', () => {
  it('contains html with specified customer', () => {
    const { wrapper } = setup();
    expect(wrapper.html()).toContain('test_customer_one');
  });
});
