import { combineReducers } from 'redux';

import ProjectsReducer from './projects';
import SelectedProjectReducer from './selectedProject';
import CustomersReducer from './customers';
import FormReducer from './form';

const rootReducer = combineReducers({
  projects: ProjectsReducer,
  selected_project: SelectedProjectReducer,
  customers: CustomersReducer,
  form: FormReducer
});

export default rootReducer;
