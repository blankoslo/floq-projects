import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import App from '../src/containers/app';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Immutable from 'immutable';
import fetchMock from 'fetch-mock';

before(() => {
  // If missing, fetch global will be undefined. The json-content is unused.
  fetchMock.mock('^https://api-dev.floq.no', { unused: 'data' });
});

after(() => {
  fetchMock.restore();
});

// setup is a function, so that each call gets it's own objects (mutable state)
const setup = () => {
  const params = {
    id: 1
  };

  const projects = {
    loading: false,
    data: new Immutable.Map([
      {
        id: 1,
        name: 'test_project_one',
        customer: 'TEST1000'
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
    customers
  };

  const wrapper = mount(
    <Provider store={configureMockStore([])(state)}>
      <App
        params={params}
      />
    </Provider>);

  return {
    wrapper
  };
};

describe('<App />', () => {
  it('contains jsx-div', () => {
    const { wrapper } = setup();
    expect(wrapper.contains(<div />)).toBeTruthy();
  });

  it('contains html with specified customer', () => {
    const { wrapper } = setup();
    expect(wrapper.html()).toContain('test_customer_one');
  });
});
