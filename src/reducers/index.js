import { combineReducers } from 'redux';

import ProjectsReducer from './projects';
import SelectedProjectReducer from './selectedProject';
import CustomersReducer from './customers';
import FormReducer from './form';
import EmployeesReducer from './employees';

const rootReducer = combineReducers({
  projects: ProjectsReducer,
  selected_project: SelectedProjectReducer,
  customers: CustomersReducer,
  form: FormReducer,
  employees: EmployeesReducer
});

export default rootReducer;
