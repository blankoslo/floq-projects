import React from 'react';
import CustomerDialog from '../containers/customerDialog';

const ProjectEditor = (props) => {
  let customerElements = props.customers.data.valueSeq().map((c) =>
    <option key={c.id} value={c.id}>{c.name}</option>).toJS();

  customerElements.push(<option disabled hidden key='-1' value='-1'></option>);

  let billableElements = [
    { value: 'billable', name: 'Fakturerbart prosjekt' },
    { value: 'nonbillable', name: 'Ikke-fakturerbart prosjekt' },
    { value: 'unavailable', name: 'Utilgjengelig tid' },
  ].map((c) =>
    <option key={c.value} value={c.value}>{c.name}</option>);

  billableElements.push(<option disabled hidden key='-1' value='-1'></option>);

  return (
    <div>
      <form style={{ width: '100%' }} onSubmit={props.onSubmit}>
        <div className='mdl-grid'>
          <div className='mdl-cell mdl-cell--4-col' >
            <label>Kunde: </label>
            <select
              disabled={!props.isNew}
              value={props.form.data.get('customer')}
              onChange={(e) => {
                props.onChange('customer', e.target.value);
                props.onChange('id', props.generateProjectId(parseInt(e.target.value)));
              }}
              id='customer-form'
            >
            {customerElements}
            </select>
          </div>
          {
            props.isNew ?
              <div className='mdl-cell mdl-cell--3-col'>
                <CustomerDialog />
              </div>
              : null
          }

        </div>
        <div className='mdl-grid'>
          <label>Prosjekt: </label>
          <input
            type='text'
            value={props.form.data.get('name')}
            onChange={(e) => {
              props.onChange('name', e.target.value);
            }}
            id='name-form'
          />
        </div>
        <div className='mdl-grid'>
          <div className='mdl-cell mdl-cell--4-col'>
            <label>Fakturerbar: </label>
            <select
              value={props.form.data.get('billable')}
              onChange={(e) => {
                props.onChange('billable', e.target.value);
              }}
              id='billable-form'
            >
              {billableElements}
            </select>
          </div>
        </div>
        <div className='mdl-grid'>
          <div className='mdl-cell mdl-cell--4-col'>
            <label>Prosjektkode: </label>
            <input
              type='text'
              value={props.form.data.get('id')}
              onChange={(e) => {
                if (props.isNew) {
                  props.onChange('id', e.target.value);
                }
              }}
              disabled={!props.isNew}
              id='id-form'
            />
          </div>
        </div>
        <button
          className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored'
          type='submit'
        >
          Lagre
        </button>
      </form>
    </div>
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
