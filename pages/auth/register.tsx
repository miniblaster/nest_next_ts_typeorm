import {
  ChangeEvent,
  FormEvent,
  useState,
} from 'react';
import {
  Theme,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import {
  Typography,
  Button,
  Card,
  CardContent,
  FormControl,
  TextField,
} from '@material-ui/core';
import { Http } from '../../lib/http';
import { Link } from '../../components/Link';
import { User } from '../../interfaces';

const http = new Http();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(8),
    },
    container: {
      width: 480,
      margin: `${theme.spacing(2)}px auto`,
    },
    card: {
      padding: theme.spacing(4),
    },
    formControl: {
      minWidth: 320,
    },
    submitButton: {
      margin: `${theme.spacing(4)}px 0`,
    },
  }),
);

const Register = () => {
  const classes = useStyles({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: e.currentTarget.username.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    }

    try {
      const user: User = await http.post('api/auth/register', data);
      if (user) {
        location.href = '/';
      } else {
        alert('Failed to register!');
      }
    } catch (err) {
      alert(`Failed to register! ${err}`);
    }
  }

  return (
    <div className={classes.root}>
      <Typography variant="h2">ARK</Typography>
      <form
        onSubmit={onSubmit}
        className={classes.container}
        autoComplete="off"
        noValidate
      >
        <Card className={classes.card}>
          <CardContent>
            <FormControl className={classes.formControl} variant="outlined">
              <TextField
                id="username"
                name="username"
                type="text"
                label="NAME"
                value={name}
                onChange={onChangeName}
                variant="outlined"
                margin="normal"
              />
            </FormControl>
            <FormControl className={classes.formControl} variant="outlined">
              <TextField
                id="email"
                name="email"
                type="text"
                label="EMAIL"
                value={email}
                onChange={onChangeEmail}
                variant="outlined"
                margin="normal"
              />
            </FormControl>
            <br />
            <FormControl className={classes.formControl} variant="outlined">
              <TextField
                id="password"
                name="password"
                type="password"
                label="PASSWORD"
                value={password}
                onChange={onChangePassword}
                variant="outlined"
                margin="normal"
              />
            </FormControl>
            <Button
              className={classes.submitButton}
              type="submit"
              variant="outlined"
              color="primary"
              size="large"
            >
              REGISTER
            </Button>
            <br />
            <Link
              href="/auth/login"
              color="secondary"
            >
              Have an Account? Please Login!
            </Link>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default Register;
