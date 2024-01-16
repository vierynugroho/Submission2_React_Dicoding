import { React, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../../components/Auth/RegisterInput';
import { register } from '../../utils/network-data';

import LocaleContext from '../../contexts/LocaleContext';
// contexts

const RegisterPage = () => {
	const navigate = useNavigate();
	const { locale, toggleLocale } = useContext(LocaleContext);

	async function onRegisterHandler(user) {
		const { error } = await register(user);
		if (!error) {
			navigate('/');
		}
	}

	return (
		<>
			<section className='register-page'>
				<h2>{locale === 'id' ? 'Registrasi' : 'Register'}</h2>
				<RegisterInput register={onRegisterHandler} />
				<p>
					{locale === 'id' ? 'Kembali ke' : 'Back to'} <Link to='/'>{locale === 'id' ? 'Masuk' : 'Login'}</Link>
				</p>
			</section>
		</>
	);
};

export default RegisterPage;
