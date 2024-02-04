import React from 'react';
import { Card, Grid, Typography, TextField, Button, Link, Paper, InputBase, CardMedia, CardContent } from '@material-ui/core';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { MarginDiv, StyledButton, StyledCardMedia, StyledPaper } from './Login.style';
import { useHttpService } from '../../services/useAxiosCustomHook';
import { useSnackbar } from '../../utils/SnackBar';

type User = {
	username: string,
	email: string,
	password: string
}

const Login: React.FC = () =>
{
	const navigate = useNavigate();

	const { showSnackbar } = useSnackbar()

	const { httpService } = useHttpService();

	const [isRegister, setIsRegister] = React.useState<boolean>(false);

	const [authorization, setAuthorization] = React.useState<User>({
		username: "",
		email: "",
		password: ""
	});

	const swithToRegisterForm = (e: any) =>
	{
		e.preventDefault();

		setAuthorization({ ...authorization, username: "", password: "" });
		setIsRegister(true);
	};

	const swithToSignInForm = (e: any) =>
	{
		e.preventDefault();

		setAuthorization({ ...authorization, username: "", password: "" });
		setIsRegister(false);
	};

	const handSubmit = async (e: any) =>
	{
		e.preventDefault();

		if (!authorization.username || !authorization.password)
		{
			showSnackbar("username or password required");
			return;
		}

		try
		{
			const path = isRegister ? "/auth/register" : "/auth/login";

			const loginRes: any = await httpService("post", path, authorization);

			if (!loginRes || !loginRes.data)
			{
				showSnackbar(loginRes.message);
				setAuthorization({ ...authorization, username: "", password: "" });
				return;
			}

			Cookies.set("authToken", loginRes.data.token);
			Cookies.set("authUser", JSON.stringify(loginRes.data.user));

			setAuthorization({ ...authorization, username: "", password: "" });
			navigate('/quotes');

			showSnackbar(loginRes.message);

		} catch (error: any)
		{
			console.log('login error=', error)
			showSnackbar(error.message)
		}
	}

	React.useEffect(() =>
	{
		Cookies.remove('authToken');
		Cookies.remove('authUser');
	}, [])

	return (
		<Grid container xs={ 12 } alignItems="center" justifyContent="center" style={ { height: "100vh" } }>
			<Grid item>
				<Card square style={ { display: "flex" } }>
					<div style={ { display: "flex", flexDirection: "column" } }></div>
					<CardMedia
						// component={ "img" }
						// className={ classes.media }
						// image="/luffy3.jpg"
						image="luffy2.jpg"
						title="Luffy"
						// alt='Luffy'
						style={ { width: "320px" } }
					/>

					<MarginDiv marginTop={ 30 } marginBottom={ 30 } marginRight={ 30 } marginLeft={ 30 }>
						<Typography align="center" variant="h5" style={ { color: "darkcyan" } }>MG App</Typography>

						<form onSubmit={ handSubmit }>

							<Grid
								container
								direction="column"
								justifyContent="flex-start"
								alignItems="stretch"
							>
								<Grid item>
									<MarginDiv marginTop={ 20 }>
										<Typography align="center">Please enter your credentials to { isRegister ? "sign up" : "login" }.</Typography>
									</MarginDiv>
								</Grid>

								<Grid item>
									<MarginDiv marginTop={ 20 }>
										<StyledPaper square elevation={ 0 }>
											<InputBase
												placeholder="username *"
												type="text"
												required
												style={ { width: "100%" } }
												inputProps={ { 'aria-label': 'user name' } }
												value={ authorization.username }
												onChange={ (event: any) => setAuthorization({ ...authorization, username: (event.target.value).trimStart() }) }
												autoFocus
											/>
										</StyledPaper>
									</MarginDiv>
								</Grid>

								{ isRegister &&
									<Grid item>
										<MarginDiv marginTop={ 15 }>
											<StyledPaper square elevation={ 0 }>
												<InputBase
													placeholder="email *"
													type="email"
													required
													style={ { width: "100%" } }
													inputProps={ { 'aria-label': 'email' } }
													value={ authorization.email }
													onChange={ (event) => setAuthorization({ ...authorization, email: (event.target.value).trimStart() }) }
												/>
											</StyledPaper>
										</MarginDiv>
									</Grid>
								}

								<Grid item>
									<MarginDiv marginTop={ 15 }>
										<StyledPaper square elevation={ 0 }>
											<InputBase
												placeholder="password *"
												type="password"
												required
												style={ { width: "100%" } }
												inputProps={ { 'aria-label': 'password' } }
												value={ authorization.password }
												onChange={ (event) => setAuthorization({ ...authorization, password: (event.target.value).trim() }) }
											/>
										</StyledPaper>
									</MarginDiv>
								</Grid>

								<Grid item>
									<MarginDiv marginTop={ 15 }>
										<StyledButton variant="outlined" size="small" type="submit" value="submit">{ isRegister ? "Sign up" : "Sign in" }</StyledButton>
									</MarginDiv>
								</Grid>

								<Grid item>
									<Grid container justifyContent="center">
										{ !isRegister &&
											<MarginDiv marginTop={ 20 } marginLeft={ 10 }>
												<Typography variant="body2" display="inline" align="center" color="textSecondary">Not registered? <Link style={ { cursor: "pointer", color: "darkslateblue" } } onClick={ swithToRegisterForm }>Create an account</Link></Typography>
											</MarginDiv>
										}

										{ isRegister &&
											<MarginDiv marginTop={ 20 } marginLeft={ 10 }>
												<Typography variant="body2" display="inline" align="center" color="textSecondary">Already have an account? <Link style={ { cursor: "pointer", color: "darkslateblue" } } onClick={ swithToSignInForm }>login</Link></Typography>
											</MarginDiv>
										}
									</Grid>
								</Grid>


							</Grid>
						</form>
					</MarginDiv>
				</Card>


			</Grid>
		</Grid>
	)
}

export default Login;




