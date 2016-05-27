import * as _ from 'lodash';
import React, { Component } from 'react';

class Project extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '', customer: -1 };
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.project)) {
      this.setState({
        name: nextProps.project.name,
        customer: nextProps.project.customer
      });
    }
  }

  onNameChange = (event) => this.setState({ name: event.target.value });

  onCustomerChange = (event) => this.setState({ customer: event.target.value });

  onSubmit = (event) => {
    event.preventDefault();

    this.props.onProjectUpdate(this.state);
  }

  render() {
    if (this.state.name === null) {
      return <p>...loading</p>;
    }

    let customerElements = this.props.customers.map((c) =>
      <option key={c.id} value={c.id}>{c.name}</option>);

    customerElements.push(<option disabled hidden key='-1' value='-1'></option>);

    const isNew = _.isEmpty(this.props.project);

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Prosjekt: </label>
            <input type='text' value={this.state.name} onChange={this.onNameChange} />
          </div>
          <div>
            <label>Kunde: </label>
            <select disabled={!isNew} value={this.state.customer} onChange={this.onCustomerChange}>
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
  }
}

Project.propTypes = {
  project: React.PropTypes.object.isRequired,
  customers: React.PropTypes.array.isRequired,
  onProjectUpdate: React.PropTypes.func.isRequired
};

export default Project;
