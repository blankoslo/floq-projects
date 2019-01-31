import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProjectRow from '../src/components/projectrow';

Enzyme.configure({ adapter: new Adapter() });

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
    />
  );

  return {
    project,
    wrapper
  };
};

describe('<ProjectRow />', () => {
  it('contains text which includes customer and project name', () => {
    const { wrapper, project } = setup();
    expect(wrapper.text()).toContain(project.customer.name);
    expect(wrapper.text()).toContain(project.name);
  });
});
