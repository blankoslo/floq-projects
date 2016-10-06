import { createSelector } from 'reselect';
import * as Immutable from 'immutable';

const getProject = (projects, selectedProject, form) => {
  // Loading
  if (projects.loading) {
    return { loading: true, data: new Immutable.Map() };
  }

  // projects/new
  if (selectedProject === null) {
    // TODO: Map() can be interchanged with json or Immutable class
    return {
      loading: false,
      data: new Immutable.Map({
        name: '',
        customer: '',
        id: '',
        billable: 'billable',
        responsible: '' }
      ).merge(form.data)
    };
  }
  // view/edit project
  const originalProject = projects.data.find(p => p.id === selectedProject);

  if (form.loading || form.data.isEmpty()) {
    return {
      loading: false,
      data: new Immutable.Map(originalProject)
    };
  }
  const result = form.data === null ? originalProject :
   new Immutable.Map(originalProject).merge(form.data);

  return {
    loading: false,
    data: result
  };
};

export default createSelector(
  state => state.projects,
  state => state.selected_project,
  state => state.form,
  getProject,
);
