/*
 *
 * SignInPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitSignIn } from './actions';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

export class SignInPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    submitSignIn: React.PropTypes.func,
  }
  contextTypes: {
    router: React.PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      rememberMe: true,
      userNameError: null,
      passwordError: null,
    };
  }
  handleRememberMeChecked = (event, rememberMe) => {
    this.setState({ rememberMe });
  }
  handleUserNameChange = (event, username) => {
    this.setState({ username });
  }
  handlePasswordChange = (event, password) => {
    this.setState({ password });
  }
  displayErrors = () => {
    if (!this.state.username) {
      this.setState({ userNameError: 'This field is required' });
    } else {
      this.setState({ userNameError: null });
    }
    if (!this.state.password) {
      this.setState({ passwordError: 'This field is required' });
    } else {
      this.setState({ passwordError: null });
    }
  }
  handleClickOnSubmitButton = () => {
    if (this.state.username && this.state.password) {
      this.handleSubmit();
    }
    this.displayErrors();
  }
  handleEnterKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (this.state.username && this.state.password) {
        this.handleSubmit();
      }
      this.displayErrors();
    }
  }
  handleSubmit = () => {
    const { username, password, rememberMe } = this.state;
    this.props.submitSignIn(username, password, rememberMe);
    // this.props.router.goBack();
  }
  checkUserNameAndPassword = () => {
    if (this.state.username && this.state.password) {
      return false;
    }
    return true;
  }
  render() {
    return (
      <Grid style={{ marginTop: '26vh' }}>
        <Row>
          <Col xsOffset={2} xs={8} smOffset={3} sm={6} >
            <TextField
              floatingLabelText={'User Name'}
              onKeyDown={this.handleEnterKeyDown}
              onChange={this.handleUserNameChange}
              errorText={this.state.userNameError}
              fullWidth
              autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
            />
            <TextField
              floatingLabelText={'Password'}
              onKeyDown={this.handleEnterKeyDown}
              onChange={this.handlePasswordChange}
              type="password"
              errorText={this.state.passwordError}
              fullWidth
              autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
            />
            <Checkbox
              defaultChecked={this.state.rememberMe}
              label="Remember Me"
              style={{ marginTop: '20px' }}
              onCheck={this.handleRememberMeChecked}
            />
            <RaisedButton
              primary
              label="Submit"
              style={{ float: 'right' }}
              onClick={this.handleClickOnSubmitButton}
              disabled={this.checkUserNameAndPassword()}
            />
          </Col>
          <Col xs={2} >
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitSignIn: bindActionCreators(submitSignIn, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(SignInPage);
