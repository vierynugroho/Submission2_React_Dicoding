import { react, useState } from 'react';
import { PropTypes } from 'prop-types';

const RegisterInput = ({ register }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

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
		register({
			name: name,
			email: email,
			password: password,
		});
	};

	return (
		<>
			<div className='input-register'>
				<form onSubmit={onSubmitHandler}>
					<label htmlFor='name'>Name</label>
					<input
						id='name'
						type='text'
						placeholder='Nama'
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
					<label htmlFor='confirmPassword'>Confirm Password</label>
					<input
						id='confirmPassword'
						type='password'
						placeholder='Password'
						autoComplete='current-password'
						value={confirmPassword}
						onChange={onConfirmPasswordChange}
					/>
					<button type='submit'>Register</button>
				</form>
			</div>
		</>
	);
};

RegisterInput.propTypes = {
	register: PropTypes.func.isRequired,
};

export default RegisterInput;
