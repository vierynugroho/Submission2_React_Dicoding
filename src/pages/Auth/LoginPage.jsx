import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { login } from '../../utils/network-data';
import LoginInput from '../../components/Auth/LoginInput';
import { Link } from 'react-router-dom';

import LocaleContext from '../../contexts/LocaleContext';

const LoginPage = ({ loginSuccess }) => {
	// contexts
	const { locale, toggleLocale } = useContext(LocaleContext);

	async function onLogin({ email, password }) {
		const { error, data } = await login({ email, password });

		if (!error) {
			loginSuccess(data);
		}
	}

	return (
		<>
			<section className='login-page'>
				<h2>{locale === 'id' ? 'Silahkan masuk untuk melanjutkan' : 'Please LogIn to Continue'} ...</h2>
				<LoginInput login={onLogin} />
				<p>
					{locale === 'id' ? 'Belum mempunyai akun?' : "don't have an account?"} <Link to='/register'>{locale === 'id' ? 'Daftar Di sini' : 'Register here'}</Link>
				</p>
			</section>
		</>
	);
};

LoginPage.propTypes = {
	loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
