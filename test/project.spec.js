import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import ProjectEditor from '../src/components/projectEditor';
import Immutable from 'immutable';

// setup is a function, so that each test get its own state
const setup = () => {
  const form = {
    loading: false,
    data: new Immutable.Map({
      customer: 1,
      name: 'test_project_one',
      id: 1,
      billable: 'billable'
    })
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

  const actions = {
    onSubmit: expect.createSpy(),
    onChange: expect.createSpy(),
    generateProjectId: expect.createSpy()
  };

  const wrapper = shallow(
    <ProjectEditor
      form={form}
      customers={customers}
      onSubmit={actions.onSubmit}
      onChange={actions.onChange}
      generateProjectId={actions.generateProjectId}
      isNew
    />);

  return {
    form,
    customers,
    actions,
    wrapper
  };
};

describe('<ProjectEditor />-form', () => {
  it('contains name(<input>) with value equal to "form.data.name"', () => {
    const { wrapper, form } = setup();
    expect(wrapper.find('#name-form').props().value).toEqual(form.data.get('name'));
  });

  it('contains customer(<select>) with <option> containing all customers + hidden default', () => {
    const { wrapper, customers } = setup();
    expect(wrapper.find('#customer-form').props().children.length)
    .toBe(customers.data.size + 1);
  });

  it('contains customer(<select>) without prop "disabled" when isNew===true', () => {
    const { wrapper } = setup();
    expect(wrapper.find('#customer-form').prop('disabled'))
     .toBeFalsy();
  });

  it('contains customer(<select>) with prop "disabled" when isNew===true', () => {
    const { customers, form } = setup();
    const wrapper = shallow(
      <ProjectEditor
        form={form}
        customers={customers}
        onSubmit={() => {}}
        onChange={() => {}}
        isNew={false}
      />);
    expect(wrapper.find('#customer-form').prop('disabled'))
     .toBeTruthy();
  });

  it('contains <form> that triggers onSubmit function when submitted', () => {
    // Enzyme lacks event propagation (simulate()) for shallow tests.
    // Ideally we want to simulate click button which again triggers form's submit
    const { wrapper, actions } = setup();
    wrapper.find('form').simulate('submit');
    expect(actions.onSubmit.calls.length).toEqual(1);
  });

  it('contains name(<input>) that triggers onChange function when edited', () => {
    const { wrapper, actions } = setup();
    const valueUnderTest = 'test_new_value';
    wrapper.find('#name-form').simulate('change', { target: { value: valueUnderTest } });
    expect(actions.onChange.calls.length).toEqual(1);
    expect(actions.onChange.calls[0].arguments).toEqual(['name', valueUnderTest]);
  });

  it('contains customer(<select>) that triggers onChange function when edited', () => {
    const { wrapper, actions } = setup();
    wrapper.find('#customer-form').simulate('change', { target: { value: 1 } });
    expect(actions.onChange.calls.length).toEqual(2);
    // TODO: order shouldn't matter.
    expect(actions.onChange.calls[0].arguments).toEqual(['customer', 1]);
  });

  it('contains id(<input>), when isNew===true expect enabled', () => {
    const { wrapper } = setup();
    expect(wrapper.find('#id-form').prop('disabled')).toBeFalsy();
  });

  it('contains id(<input>), when isNew===false expect disabled', () => {
    const { customers, form } = setup();
    const wrapper = shallow(
      <ProjectEditor
        form={form}
        customers={customers}
        onSubmit={() => {}}
        onChange={() => {}}
        isNew={false}
      />);

    expect(wrapper.find('#id-form').prop('disabled')).toBeTruthy();
  });

  it('contains id(<input>) with value equal to "form.data.id"', () => {
    const { wrapper, form } = setup();
    expect(wrapper.find('#id-form').prop('value')).toEqual(form.data.get('id'));
  });

  it('contains billable(<select>) with expected value', () => {
    const { wrapper, form } = setup();
    expect(wrapper.find('#billable-form').prop('value'))
    .toEqual(form.data.get('billable'));
  });

  it('contains billable(<select>) with <option> containing yes/no', () => {
    const { wrapper } = setup();
    expect(wrapper.find('#billable-form').text())
    .toContain('Fakturerbart prosjekt')
    .toContain('Ikke-fakturerbart prosjekt')
    .toContain('Utilgjengelig tid');
  });
});
