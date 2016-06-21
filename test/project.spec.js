import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import ProjectEditor from '../src/components/projectEditor';
import Immutable from 'immutable';

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

const setup = {
  form,
  customers,
  wrapper: shallow(
    <ProjectEditor
      form={form}
      customers={customers}
      onSubmit={() => {}}
      onChange={() => {}}
      isNew
    />)
};

describe('<ProjectEditor />', () => {
  it('contains <input> with value equal to "form.data.name"', () => {
    expect(setup.wrapper.find('input').props().value).toEqual(setup.form.data.get('name'));
  });

  it('contains <select> with <option> containing all customers + hidden default', () => {
    expect(setup.wrapper.find('select').props().children.length)
    .toBe(setup.customers.data.size + 1);
  });

  it('contains <select> with prop "disabled=false" when isNew===true', () => {
    expect(setup.wrapper.find('select').prop('disabled'))
     .toBeFalsy();
  });

  it('contains <select> with prop "disabled=true" when isNew===true', () => {
    const wrapper = shallow(
      <ProjectEditor
        form={setup.form}
        customers={setup.customers}
        onSubmit={() => {}}
        onChange={() => {}}
        isNew={false}
      />);

    expect(wrapper.find('select').prop('disabled'))
     .toBeTruthy();
  });
});
