import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import ProjectRow from '../src/components/projectrow';

// setup is a function, so that each call gets its own objects (mutable state)
const setup = () => {
  const project = {
    id: 1,
    name: 'test_project_one',
    customer: {
      name: 'test_customer_one'
    }
  };

  const wrapper = shallow(
    <ProjectRow
      project={project}
    />);

  return {
    project,
    wrapper
  };
};

describe('<ProjectRow />', () => {
  it('contains <img>.alt with supplied project name', () => {
    const { wrapper, project } = setup();
    expect(wrapper.find('img').props().alt).toEqual(project.name);
  });

  it('contains text which includes customer and project name', () => {
    const { wrapper, project } = setup();
    expect(wrapper.text())
    .toContain(project.customer.name)
    .toContain(project.name);
  });
});
