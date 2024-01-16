import React, { useContext, useState } from 'react';
import Proptypes from 'prop-types';

import LocaleContext from '../../contexts/LocaleContext';

const LoginInput = ({ login }) => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	// contexts
	const { locale, toggleLocale } = useContext(LocaleContext);

	const onEmailChangeHandler = (e) => {
		setEmail(e.target.value);
	};

	const onPasswordChangeHandler = (e) => {
		setPassword(e.target.value);
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();

		login({
			email: email,
			password: password,
		});
	};

	return (
		<>
			<div className='input-login'>
				<form onSubmit={onSubmitHandler}>
					<label htmlFor='email'>Email</label>
					<input
						id='email'
						type='email'
						placeholder='Email'
						value={email}
						onChange={onEmailChangeHandler}
					/>
					<label htmlFor='password'>Password</label>
					<input
						id='password'
						type='password'
						placeholder='Password'
						value={password}
						onChange={onPasswordChangeHandler}
					/>
					<button type='submit'>{locale === 'id' ? 'Masuk' : 'Login'}</button>
				</form>
			</div>
		</>
	);
};

LoginInput.propTypes = {
	login: Proptypes.func.isRequired,
};

export default LoginInput;
