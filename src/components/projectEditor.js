import React from 'react';

const ProjectEditor = (props) => {
  let customerElements = props.customers.data.valueSeq().map((c) =>
    <option key={c.id} value={c.id}>{c.name}</option>).toJS();

  customerElements.push(<option disabled hidden key='-1' value='-1'></option>);

  let billableElements = [{ id: true, name: 'Ja' }, { id: false, name: 'Nei' }]
    .map((c) =>
      <option key={c.id} value={c.id}>{c.name}</option>);

  billableElements.push(<option disabled hidden key='-1' value='-1'></option>);

  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <div>
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
        <div>
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
        <div>
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
        <div>
          <label>Kunde: </label>
          <select
            disabled={!props.isNew}
            value={props.form.data.get('customer')}
            onChange={(e) => {
              props.onChange('customer', e.target.value);
            }}
            id='customer-form'
          >
            {customerElements}
          </select>
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
  form: React.PropTypes.object,
  isNew: React.PropTypes.bool
};

export default ProjectEditor;
