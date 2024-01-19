import { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';

// context
import LocaleContext from './../../contexts/LocaleContext';

import useInput from '../../hooks/useInput';

const RegisterInput = ({ register }) => {
	const [name, onNameChange] = useInput('');
	const [email, onEmailChange] = useInput('');
	const [password, onPasswordChange] = useInput('');
	const [confirmPassword, onConfirmPasswordChange] = useInput('');

	// contexts
	const { locale, toggleLocale } = useContext(LocaleContext);

	const onSubmitHandler = (e) => {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());

		if (formData.get('password') === formData.get('confirmPassword')) {
			register(formJson);
		} else {
			toast.error(locale === 'id' ? 'Password Tidak Sama' : "password doesn't match");
		}
	};

	return (
		<>
			<div className='input-register'>
				<form onSubmit={onSubmitHandler}>
					<input
						type='hidden'
						name='locale'
						value={locale}
					/>
					<label htmlFor='name'>{locale === 'id' ? 'Nama' : 'Name'}</label>
					<input
						id='name'
						name='name'
						type='text'
						placeholder={locale === 'id' ? 'Nama' : 'Name'}
						value={name}
						onChange={onNameChange}
					/>
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
						autoComplete='current-password'
						value={password}
						onChange={onPasswordChange}
					/>
					<label htmlFor='confirmPassword'>{locale === 'id' ? 'Konfirmasi Password' : 'Confirm Password'}</label>
					<input
						id='confirmPassword'
						name='confirmPassword'
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
