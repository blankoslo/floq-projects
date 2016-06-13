import * as Immutable from 'immutable';
import { createSelector } from 'reselect';

const projectsSelector = state => state.projects;
const customersSelector = state => state.customers;

const lowerCaseName = p => `${p.customer.name}${p.name}`.toLowerCase();

const getProjects = (projects, customers) => {
  if (projects.loading || customers.loading) {
    return { loading: true, data: new Immutable.OrderedMap() };
  }

  return {
    loading: false,
    data: projects.data.map(p =>
      Object.assign(p, { customer: customers.data.get(p.customer) })
    ).sortBy(lowerCaseName)
  };
};

export default createSelector(
  projectsSelector,
  customersSelector,
  getProjects
);
