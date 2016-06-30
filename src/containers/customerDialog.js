import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { createCustomer } from '../actions';

class CustomerDialog extends Component {
  state = {
    open: false,
    value: ''
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.createCustomer({ name: this.state.value });
    // this.props.generateProjectId(parseInt(this.state.value));
    this.handleClose();
  };

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    return (
      <div>
        <RaisedButton label='Opprett ny kunde' onTouchTap={this.handleOpen} />
        <Dialog
          title='Opprett ny kunde'
          modal
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <form onSubmit={this.onSubmit}>
            <div>
              <label>Kundenavn: </label>
              <input
                type='text'
                onChange={this.onChange}
                value={this.state.value}
              />
            </div>
          </form>
          <FlatButton
            label='Lagre'
            primary
            onTouchTap={this.onSubmit}
            type='submit'
          />
          <FlatButton
            label='Avbryt'
            primary
            onTouchTap={this.handleClose}
          />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

CustomerDialog.propTypes = {
  createCustomer: React.PropTypes.func
};

export default connect(mapStateToProps, { createCustomer })(CustomerDialog);
