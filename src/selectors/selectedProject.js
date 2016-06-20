import { createSelector } from 'reselect';
import * as Immutable from 'immutable';

const selectedProjectselector = state => state.selected_project;
const projectsSelector = state => state.projects;
const currentForm = state => state.form;

const getProject = (projects, selectedProject, form) => {
  // Loading
  if (projects.loading) {
    return { loading: true, data: null };
  }
  // projects/new
  if (selectedProject === null) {
    return {
      loading: false,
      data: new Immutable.Map({ name: '', customer: -1 }).merge(form.data)
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
  projectsSelector,
  selectedProjectselector,
  currentForm,
  getProject,
);
