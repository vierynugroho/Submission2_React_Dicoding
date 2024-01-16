import { React } from 'react';
import { Link } from 'react-router-dom';
import RegisterInput from '../../components/RegisterInput';
import { register } from '../../utils/network-data';

const RegisterPage = () => {
	async function onRegisterHandler(user) {
		await register(user);
		console.log(user);
	}

	return (
		<>
			<section className='register-page'>
				<h2>Gak perlu serius-serius ya isinya ...</h2>
				<RegisterInput register={onRegisterHandler} />
				<p>
					Kembali ke <Link to='/'>Masuk</Link>
				</p>
			</section>
		</>
	);
};

export default RegisterPage;
