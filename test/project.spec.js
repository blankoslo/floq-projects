import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import ProjectEditor from '../src/components/projectEditor';
import Immutable from 'immutable';

const formData = {
  loading: false,
  data: new Immutable.Map({
    customer: 1,
    name: 'test_project_one'
  })
};

const customersData = {
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

describe('<ProjectEditor />', () => {
  it('contains <input> with value equal to "form.data.name"', () => {
    const wrapper = shallow(
      <ProjectEditor
        form={formData}
        customers={customersData}
        onSubmit={() => {}}
        onChange={() => {}}
        isNew
      />);

    expect(wrapper.find('input').props().value).toEqual(formData.data.get('name'));
  });

  it('contains <select> with <option> containing all customers + hidden default', () => {
    const wrapper = shallow(
      <ProjectEditor
        form={formData}
        customers={customersData}
        onSubmit={() => {}}
        onChange={() => {}}
        isNew
      />);

    expect(wrapper.find('select').props().children.length)
    .toBe(customersData.data.size + 1);
  });

  it('contains <select> with prop "disabled=false" when isNew===true', () => {
    const wrapper = shallow(
      <ProjectEditor
        form={formData}
        customers={customersData}
        onSubmit={() => {}}
        onChange={() => {}}
        isNew
      />);

    expect(wrapper.find('select').prop('disabled'))
     .toBeFalsy();
  });

  it('contains <select> with prop "disabled=true" when isNew===true', () => {
    const wrapper = shallow(
      <ProjectEditor
        form={formData}
        customers={customersData}
        onSubmit={() => {}}
        onChange={() => {}}
        isNew={false}
      />);

    expect(wrapper.find('select').prop('disabled'))
     .toBeTruthy();
  });
});
