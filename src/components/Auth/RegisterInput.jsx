import { react, useContext, useState } from 'react';
import { PropTypes } from 'prop-types';

// context
import LocaleContext from './../../contexts/LocaleContext';

const RegisterInput = ({ register }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	// contexts
	const { locale, toggleLocale } = useContext(LocaleContext);

	const onNameChange = (e) => {
		setName(e.target.value);
	};

	const onEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const onPasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const onConfirmPasswordChange = (e) => {
		setConfirmPassword(e.target.value);
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();

		if (password === confirmPassword) {
			register({
				name: name,
				email: email,
				password: password,
			});
		} else {
			alert('Password Tidak Sama');
		}
	};

	return (
		<>
			<div className='input-register'>
				<form onSubmit={onSubmitHandler}>
					<label htmlFor='name'>{locale === 'id' ? 'Nama' : 'Name'}</label>
					<input
						id='name'
						type='text'
						placeholder={locale === 'id' ? 'Nama' : 'Name'}
						value={name}
						onChange={onNameChange}
					/>
					<label htmlFor='email'>Email</label>
					<input
						id='email'
						type='email'
						placeholder='Email'
						value={email}
						onChange={onEmailChange}
					/>
					<label htmlFor='password'>Password</label>
					<input
						id='password'
						type='password'
						placeholder='Password'
						autoComplete='current-password'
						value={password}
						onChange={onPasswordChange}
					/>
					<label htmlFor='confirmPassword'>{locale === 'id' ? 'Konfirmasi Password' : 'Confirm Password'}</label>
					<input
						id='confirmPassword'
						type='password'
						placeholder={locale === 'id' ? 'Konfirmasi Password' : 'Confirm Password'}
						autoComplete='current-password'
						value={confirmPassword}
						onChange={onConfirmPasswordChange}
					/>
					<button type='submit'>{locale === 'id' ? 'Registrasi' : 'Register'}</button>
				</form>
			</div>
		</>
	);
};

RegisterInput.propTypes = {
	register: PropTypes.func.isRequired,
};

export default RegisterInput;
