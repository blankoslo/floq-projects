// @flow

import * as React from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import Toggle from 'material-ui/Toggle';
import PropTypes from 'prop-types';
import CustomerDialog from '../containers/customerDialog';

const ProjectEditor = (props) => {
  const customers = props.customers.data.valueSeq();
  const customerElements = customers
    .map(c => ({
      text: c.name,
      id: c.id,
      value: <MenuItem primaryText={c.name} secondaryText={c.id} />
    }))
    .toJS();

  const billableElements = [
    { value: 'billable', name: 'Fakturerbart prosjekt' },
    { value: 'nonbillable', name: 'Ikke-fakturerbart prosjekt' },
    { value: 'unavailable', name: 'Utilgjengelig tid' }
  ].map(c => <MenuItem key={c.value} value={c.value} primaryText={c.name} />);

  const employees = props.employees.valueSeq();
  const employeeElements = employees
    .map(c => ({
      text: c.name,
      id: c.id,
      value: <MenuItem primaryText={c.name} />
    }))
    .toJS();

  // Callback function that is fired when a list item is selected,
  // or enter is pressed in the TextField
  const onCustomerChange = (_, index) => {
    if (index === -1) return;
    const { id } = customers.get(index);
    props.onChange('customer', id);
    props.onChange('id', props.generateProjectId(id));
  };

  const onResponsibleChange = (_, index) => {
    if (index === -1) return;
    const { id } = employees.get(index);
    props.onChange('responsible', id);
  };

  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <Toggle
          label='Aktiv'
          onToggle={(e, value) => {
            props.onChange('active', value);
          }}
          toggled={props.form.data.get('active', true)}
        />
      </div>
      <hr />
      <div>
        <AutoComplete
          floatingLabelText='Kundenavn'
          disabled={!props.isNew}
          filter={AutoComplete.fuzzyFilter}
          openOnFocus
          dataSource={customerElements}
          searchText={props.customers.data.get(props.form.data.get('customer'), { name: '' }).name}
          onNewRequest={onCustomerChange}
          id='customer-form'
        />
      </div>
      {props.isNew ? (
        <div>
          <CustomerDialog />
        </div>
      ) : null}
      <div>
        <TextField
          value={props.form.data.get('name')}
          floatingLabelText='Prosjekt'
          floatingLabelFixed={false}
          onChange={(event) => {
            props.onChange('name', event.target.value);
          }}
          id='name-form'
        />
      </div>
      <div>
        <SelectField
          value={props.form.data.get('billable')}
          floatingLabelText='Fakturerbar'
          floatingLabelFixed={false}
          onChange={(event, index, value) => {
            props.onChange('billable', value);
          }}
          id='billable-form'
        >
          {billableElements}
        </SelectField>
      </div>
      <div>
        <TextField
          value={props.form.data.get('id')}
          floatingLabelText='Prosjektkode'
          floatingLabelFixed={false}
          onChange={(event) => {
            if (props.isNew) {
              props.onChange('id', event.target.value);
            }
          }}
          disabled={!props.isNew}
          id='id-form'
        />
      </div>
      <div>
        <AutoComplete
          floatingLabelText='Ansvarlig'
          filter={AutoComplete.fuzzyFilter}
          openOnFocus
          dataSource={employeeElements}
          searchText={props.employees.get(props.form.data.get('responsible'), { name: '' }).name}
          onNewRequest={onResponsibleChange}
          id='responsible-form'
        />
      </div>
      <div>
        <RaisedButton type='submit' label='Lagre' primary />
      </div>
    </form>
  );
};

ProjectEditor.propTypes = {
  customers: PropTypes.object,
  employees: PropTypes.object,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  generateProjectId: PropTypes.func,
  form: PropTypes.object,
  isNew: PropTypes.bool
};

export default ProjectEditor;
