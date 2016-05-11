import React, { Component } from 'react';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = { name: null };

    this.onNameChange = this.onNameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.state = { name: nextProps.project.name };
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.onProjectUpdate(this.state);
  }

  render() {
    if (this.state.name === null) {
      return <p>...loading</p>;
    }

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type='text' value={this.state.name} onChange={this.onNameChange} />
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
  onProjectUpdate: React.PropTypes.func.isRequired
};

export default Project;
