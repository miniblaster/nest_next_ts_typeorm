import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles, WithStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const styles = ({ spacing }: Theme) => createStyles({
  root: {
    textAlign: 'center',
    paddingTop: spacing.unit * 8
  },
  container: {
    width: 480,
    margin: `${spacing.unit * 2}px auto`
  },
  card: {
    padding: spacing.unit * 4
  },
  formControl: {
    minWidth: 320,
    margin: `${spacing.unit}px 0`
  },
  submitButton: {
    margin: `${spacing.unit * 4}px 0`
  }
});

interface Props extends WithStyles<typeof styles> {};

const Login = withStyles(styles)(
  class extends React.Component<Props> {
    emailLabelRef;
    passwordLabelRef;

    state = {
      email: '',
      emailLabelWidth: 0,
      password: '',
      passwordLabelWidth: 0
    };

    componentDidMount() {
      this.setState({
        emailLabelWidth: (ReactDOM.findDOMNode(this.emailLabelRef) as HTMLElement).offsetWidth,
        passwordLabelWidth: (ReactDOM.findDOMNode(this.passwordLabelRef) as HTMLElement).offsetWidth,
      });
    }

    handleChange =  (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };

    handleClick = (e) => {
      e.preventDefault();
      window.location.href = '/auth/signup';
    };

    render() {
      const { classes } = this.props;

      return (
        <div className={classes.root}>
          <Typography variant="h2">ARK</Typography>
          <form
            method="POST"
            action="/auth/login"
            className={classes.container}
            noValidate
            autoComplete="off"
          >
            <Card className={classes.card}>
              <CardContent>
                <FormControl className={classes.formControl} variant="outlined">
                  <InputLabel htmlFor="email" ref={ref => this.emailLabelRef = ref}>EMAIL</InputLabel>
                  <OutlinedInput
                    id="email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    labelWidth={this.state.emailLabelWidth}
                  />
                </FormControl>
                <br />
                <FormControl className={classes.formControl} variant="outlined">
                  <InputLabel htmlFor="password" ref={ref => this.passwordLabelRef = ref}>PASSWORD</InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    labelWidth={this.state.passwordLabelWidth}
                  />
                </FormControl>
                <br />
                <Button
                  className={classes.submitButton}
                  type="submit"
                  variant="outlined"
                  color="primary"
                  size="large"
                >
                  LOGIN
                </Button>
                <br />
                <Button
                  size="small"
                  onClick={this.handleClick}
                >
                  Or create an account
                </Button>
              </CardContent>
            </Card>
          </form>
        </div>
      );
    }
  }
)

export default Login;
