import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import ProjectEditor from '../src/components/projectEditor';
import Immutable from 'immutable';

// setup is a function, so that each call gets it's own objects (mutable state)
const setup = () => {
  const form = {
    loading: false,
    data: new Immutable.Map({
      customer: 1,
      name: 'test_project_one'
    })
  };

  const customers = {
    loading: false,
    data: new Immutable.Map([
      {
        id: 1,
        name: 'test_customer_one'
      },
      {
        id: 2,
        name: 'test_customer_two'
      }
    ].map(e => [e.id, e]))
  };

  const actions = {
    onSubmit: expect.createSpy(),
    onChange: expect.createSpy()
  };

  const wrapper = shallow(
    <ProjectEditor
      form={form}
      customers={customers}
      onSubmit={actions.onSubmit}
      onChange={actions.onChange}
      isNew
    />);

  return {
    form,
    customers,
    actions,
    wrapper
  };
};

describe('<ProjectEditor />', () => {
  it('contains <input> with value equal to "form.data.name"', () => {
    const { wrapper, form } = setup();
    expect(wrapper.find('input').props().value).toEqual(form.data.get('name'));
  });

  it('contains <select> with <option> containing all customers + hidden default', () => {
    const { wrapper, customers } = setup();
    expect(wrapper.find('select').props().children.length)
    .toBe(customers.data.size + 1);
  });

  it('contains <select> with prop "disabled=false" when isNew===true', () => {
    const { wrapper } = setup();
    expect(wrapper.find('select').prop('disabled'))
     .toBeFalsy();
  });

  it('contains <select> with prop "disabled=true" when isNew===true', () => {
    const { customers, form } = setup();
    const wrapper = shallow(
      <ProjectEditor
        form={form}
        customers={customers}
        onSubmit={() => {}}
        onChange={() => {}}
        isNew={false}
      />);
    expect(wrapper.find('select').prop('disabled'))
     .toBeTruthy();
  });

  it('contains <form> that triggers onSubmit function when submitted', () => {
    // Enzyme lacks event propagation (simulate()) for shallow tests.
    // Ideally we want to simulate click button which again triggers form's submit
    const { wrapper, actions } = setup();
    wrapper.find('form').simulate('submit');
    expect(actions.onSubmit.calls.length).toEqual(1);
  });

  it('contains <input> that triggers onChange function when edited', () => {
    const { wrapper, actions } = setup();
    const valueUnderTest = 'test_new_value';
    wrapper.find('input').simulate('change', { target: { value: valueUnderTest } });
    expect(actions.onChange.calls.length).toEqual(1);
    expect(actions.onChange.calls[0].arguments).toEqual(['name', valueUnderTest]);
  });

  it('contains <select> that triggers onChange function when edited', () => {
    const { wrapper, actions } = setup();
    wrapper.find('select').simulate('change', { target: { value: 1 } });
    expect(actions.onChange.calls.length).toEqual(1);
    expect(actions.onChange.calls[0].arguments).toEqual(['customer', 1]);
  });
});
