import React from 'react';
import CustomerDialog from '../containers/customerDialog';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const ProjectEditor = (props) => {
  let customerElements = props.customers.data.valueSeq().map((c) =>
    <MenuItem key={c.id} value={c.id} primaryText={c.name} />).toJS();

  let billableElements = [
    { value: 'billable', name: 'Fakturerbart prosjekt' },
    { value: 'nonbillable', name: 'Ikke-fakturerbart prosjekt' },
    { value: 'unavailable', name: 'Utilgjengelig tid' }
  ].map((c) =>
    <MenuItem key={c.value} value={c.value} primaryText={c.name} />);

  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <SelectField
          children={customerElements}
          disabled={!props.isNew}
          value={props.form.data.get('customer')}
          floatingLabelText={'Kunde'}
          floatingLabelFixed={false}
          onChange={(event, index, value) => {
            props.onChange('customer', value);
            props.onChange('id', props.generateProjectId(value));
          }}
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
  onSubmit: React.PropTypes.func,
  onChange: React.PropTypes.func,
  generateProjectId: React.PropTypes.func,
  form: React.PropTypes.object,
  isNew: React.PropTypes.bool
};

export default ProjectEditor;
