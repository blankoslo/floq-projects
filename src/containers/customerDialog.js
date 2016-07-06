import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { createCustomer } from '../actions';

class CustomerDialog extends Component {
  state = {
    open: false,
    value: ''
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.createCustomer({ name: this.state.value });
    this.handleClose();
  };

  onChange = (event, index, value) => {
    this.setState({ value });
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
        <RaisedButton
          type='button'
          onTouchTap={this.handleOpen}
          label={'Opprett ny kunde'}
          fullWidth
          style={{ width: 180 }}
        />
        <Dialog
          title='Opprett ny kunde'
          modal
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <form onSubmit={this.onSubmit}>
            <div>
              <TextField
                type='text'
                floatingLabelFixed={false}
                floatingLabelText={'Kundenavn:'}
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
            secondary
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
