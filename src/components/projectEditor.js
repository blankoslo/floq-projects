// @flow

import React from 'react';
import CustomerDialog from '../containers/customerDialog';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';

const ProjectEditor = props => {
  const customers = props.customers.data.valueSeq();
  const customerElements = customers.map(c => ({
    text: c.name,
    id: c.id,
    value: (<MenuItem primaryText={c.name} secondaryText={c.id} />)
  })).toJS();

  const billableElements = [
    { value: 'billable', name: 'Fakturerbart prosjekt' },
    { value: 'nonbillable', name: 'Ikke-fakturerbart prosjekt' },
    { value: 'unavailable', name: 'Utilgjengelig tid' }
  ].map(c =>
    <MenuItem key={c.value} value={c.value} primaryText={c.name} />);

  const employees = props.employees.valueSeq();
  const employeeElements = employees.map(c => ({
    text: c.name,
    id: c.id,
    value: (<MenuItem primaryText={c.name} />)
  })).toJS();

  // Callback function that is fired when a list item is selected,
  // or enter is pressed in the TextField
  const onCustomerChange = (chosenRequest: string, index: number) => {
    if (index === -1) return;
    const id = customers.get(index).id;
    props.onChange('customer', id);
    props.onChange('id', props.generateProjectId(id));
  };

  const onResponsibleChange = (chosenRequest: string, index: number) => {
    if (index === -1) return;
    const id = employees.get(index).id;
    props.onChange('responsible', id);
  };

  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <AutoComplete
          floatingLabelText='Kundenavn'
          disabled={!props.isNew}
          filter={AutoComplete.fuzzyFilter}
          openOnFocus
          dataSource={customerElements}
          searchText={props.customers.data
            .get(props.form.data.get('customer'), { name: '' }).name}
          onNewRequest={onCustomerChange}
          id='customer-form'
        />
      </div>
      {
        props.isNew ?
          <div>
            <CustomerDialog />
          </div>
          : null
      }
      <div>
        <TextField
          value={props.form.data.get('name')}
          floatingLabelText={'Prosjekt'}
          floatingLabelFixed={false}
          onChange={event => {
            props.onChange('name', event.target.value);
          }}
          id='name-form'
        />
      </div>
      <div>
        <SelectField
          value={props.form.data.get('billable')}
          children={billableElements}
          floatingLabelText={'Fakturerbar'}
          floatingLabelFixed={false}
          onChange={(event, index, value) => {
            props.onChange('billable', value);
          }}
          id='billable-form'
        />
      </div>
      <div>
        <TextField
          value={props.form.data.get('id')}
          floatingLabelText={'Prosjektkode'}
          floatingLabelFixed={false}
          onChange={event => {
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
          searchText={props.employees
            .get(props.form.data.get('responsible'), { name: '' }).name}
          onNewRequest={onResponsibleChange}
          id='responsible-form'
        />
      </div>
      <div>
        <RaisedButton
          type='submit'
          label='Lagre'
          primary
        />
      </div>
    </form>
  );
};

ProjectEditor.propTypes = {
  customers: React.PropTypes.object,
  employees: React.PropTypes.object,
  onSubmit: React.PropTypes.func,
  onChange: React.PropTypes.func,
  generateProjectId: React.PropTypes.func,
  form: React.PropTypes.object,
  isNew: React.PropTypes.bool
};

export default ProjectEditor;
