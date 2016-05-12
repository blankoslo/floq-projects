import React, { Component } from 'react';

class Project extends Component {
  constructor(props) {
    super(props);

    this.state = { name: null, customer: null };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.project !== {}) {
      this.state = { name: nextProps.project.name, customer: nextProps.project.customer };
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

    const customerElements = this.props.customers.map((c) =>
      <option key={c.id} value={c.id}>{c.name}</option>);

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Prosjekt: </label>
            <input type='text' value={this.state.name} onChange={this.onNameChange} />
          </div>
          <div>
            <label>Kunde: </label>
            <select value={this.state.customer} onChange={this.onCustomerChange}>
              {customerElements}
            </select>
          </div>
          <button type='submit'>
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
