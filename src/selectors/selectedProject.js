import { createSelector } from 'reselect';

const projectsSelector = state => state.projects;
const selectedProjectselector = state => state.selected_project;

const getProject = (projects, selectedProject) => {
  if (projects.loading) {
    return { loading: true, data: null };
  }

  return {
    loading: false,
    data: selectedProject === null
        ? null
        : projects.data.find(p => p.id === selectedProject)
  };
};

export default createSelector(
  projectsSelector,
  selectedProjectselector,
  getProject
);
