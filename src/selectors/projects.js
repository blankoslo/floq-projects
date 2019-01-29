import * as Immutable from 'immutable';
import { createSelector } from 'reselect';

const lowerCaseName = p => `${p.customer.name}${p.name}`.toLowerCase();

const getProjects = (projects, customers) => {
  if (projects.loading || customers.loading) {
    return { loading: true, data: new Immutable.OrderedMap() };
  }

  let data = projects.data;

  if (projects.excludeInactiveProjects) {
    data = data
      .filter(v => v.active)
  }

  return {
    loading: false,
    data: data
      .map(p => ({ ...p, customer: customers.data.get(p.customer) }))
      .sortBy(lowerCaseName)
  };
};

export default createSelector(
  state => state.projects,
  state => state.customers,
  getProjects
);
