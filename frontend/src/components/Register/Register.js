import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import RegisterAxiosApiInstance from '../axios_instance';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function Register() {
	const initialState = {
		username: '',
		password1: '',
		password2: '',
		firstName: '',
		lastName: '',
		email: '',
		errorMessage: '',
	};

	const history = useHistory();

	const classes = useStyles();

	const [formState, setformState] = useState(initialState);

	const message = formState.errorMessage === '' ? false : true;

	const handleChange = (e) => {
		const value = e.target.value;

		setformState({
			...formState,
			[e.target.name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (formState.password1 != formState.password2) {
			setformState({
				username: '',
				password1: '',
				password2: '',
				email: '',
				firstName: '',
				lastName: '',
				errorMessage: 'Both passwords should match',
			});
			return;
		}

		RegisterAxiosApiInstance.RegisterAxiosApiInstance.post(
			'api/register/',
			{
				username: formState.username,
				email: formState.email,
				password: formState.password1,
				first_name: formState.firstName,
				last_name: formState.lastName,
			}
		)
			.then((response) => {
				console.log(JSON.stringify(response.data));
				history.push('/login/');
			})
			.catch((error) => {
				alert(error);
				setformState({
					username: '',
					password1: '',
					password2: '',
					email: '',
					firstName: '',
					lastName: '',
					errorMessage: JSON.stringify(error.response.data.detail),
				});
			});
	};

	return (
		<Container maxWidth='xs'>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h4'>
					Register Now
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete='fname'
								name='firstName'
								variant='outlined'
								required
								fullWidth
								id='firstName'
								label='First Name'
								autoFocus
								InputLabelProps={{ required: false }}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='lastName'
								label='Last Name'
								name='lastName'
								autoComplete='lname'
								InputLabelProps={{ required: false }}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='username'
								label='Username'
								name='username'
								InputLabelProps={{ required: false }}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								type='email'
								autoComplete='email'
								InputLabelProps={{ required: false }}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='password1'
								label='Password'
								type='password'
								id='password1'
								InputLabelProps={{ required: false }}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='password2'
								label='Re-enter Password'
								type='password'
								id='password2'
								InputLabelProps={{ required: false }}
								onChange={handleChange}
							/>
						</Grid>
					</Grid>

					{message ? (
						<Alert severity='error'>
							{' '}
							{formState.errorMessage}{' '}
						</Alert>
					) : null}

					<Button type='submit' fullWidth className={classes.submit}>
						Register
					</Button>
					<Grid container justify='flex-end'>
						<Grid item>
							<RouterLink to='/login/'>
								<Link variant='body2'>
									Already have an account? Login
								</Link>
							</RouterLink>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}

export default Register;
