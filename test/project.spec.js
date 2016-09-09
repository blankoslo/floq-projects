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
      customer: '1',
      name: 'test_project_one',
      id: 'TEST1000',
      billable: 'billable'
    })
  };

  const customers = {
    loading: false,
    data: new Immutable.Map([
      {
        id: '1',
        name: 'test_customer_one'
      },
      {
        id: '2',
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

  it('contains customer(<select>) with <option> containing all customers', () => {
    const { wrapper, customers } = setup();
    expect(wrapper.find('#customer-form').props().dataSource.length)
    .toBe(customers.data.size);
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

  it('contains billable(<select>) with expected <option>\'s', () => {
    const { wrapper } = setup();
    // TODO: Not satisfied with explicit call to props and primaryText-property
    // The test should not need to know such implementation details.
    expect(wrapper.find('#billable-form').children().map(n => n.props().primaryText))
    .toContain('Fakturerbart prosjekt')
    .toContain('Ikke-fakturerbart prosjekt')
    .toContain('Utilgjengelig tid');
  });

  it('contains <form> that triggers onSubmit function when submitted', () => {
    // Enzyme lacks event propagation (simulate()) for shallow tests.
    // Ideally we want to simulate click button which again triggers form's submit
    const { wrapper, actions } = setup();
    wrapper.find('form').simulate('submit');
    expect(actions.onSubmit.calls.length).toEqual(1);
  });

  it('contains customer(<select>) that triggers onChange function when edited', () => {
    const { wrapper, actions } = setup();
    // material-ui SelectField-component has a custom onNewRequest event:
    //  (chosenRequest: string, index: number)
    wrapper.find('#customer-form').simulate('newRequest', 'test_customer_one', 0);
    expect(actions.onChange.calls.length).toEqual(2);
    expect(actions.onChange.calls[0].arguments).toEqual(['customer', '1']);
  });

  it('contains billable(<select>) that triggers onChange function when edited', () => {
    const { wrapper, actions } = setup();
    // material-ui SelectField-component has a custom onChange event (event, key, value)
    wrapper.find('#billable-form').simulate('change', 'event-filler', 'key-filler', 'billable');
    expect(actions.onChange.calls.length).toEqual(1);
    expect(actions.onChange.calls[0].arguments).toEqual(['billable', 'billable']);
  });

  it('contains name(<input>) that triggers onChange function when edited', () => {
    const { wrapper, actions } = setup();
    const valueUnderTest = 'test_new_value';
    wrapper.find('#name-form').simulate('change', { target: { value: valueUnderTest } });
    expect(actions.onChange.calls.length).toEqual(1);
    expect(actions.onChange.calls[0].arguments).toEqual(['name', valueUnderTest]);
  });

  it('contains id(<input>) that triggers onChange function when edited', () => {
    const { wrapper, actions } = setup();
    const valueUnderTest = 'test_new_value';
    wrapper.find('#id-form').simulate('change', { target: { value: valueUnderTest } });
    expect(actions.onChange.calls.length).toEqual(1);
    expect(actions.onChange.calls[0].arguments).toEqual(['id', valueUnderTest]);
  });
});
