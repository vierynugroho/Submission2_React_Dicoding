import React, { useContext, useState } from 'react';
import Proptypes from 'prop-types';

import LocaleContext from '../../contexts/LocaleContext';
import useInput from '../../hooks/useInput';

const LoginInput = ({ login }) => {
	const [email, onEmailChange] = useInput('');
	const [password, onPasswordChange] = useInput('');

	// contexts
	const { locale, toggleLocale } = useContext(LocaleContext);

	const onSubmitHandler = (e) => {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());

		login(formJson);
	};

	return (
		<>
			<div className='input-login'>
				<form onSubmit={onSubmitHandler}>
					<label htmlFor='email'>Email</label>
					<input
						id='email'
						name='email'
						type='email'
						placeholder='Email'
						value={email}
						onChange={onEmailChange}
					/>
					<label htmlFor='password'>Password</label>
					<input
						id='password'
						name='password'
						type='password'
						placeholder='Password'
						value={password}
						onChange={onPasswordChange}
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
