import { useNavigate } from 'react-router-dom';

const Custom404 = () => {
	const navigate = useNavigate();

	return (
		<>
			<div class='error-page'>
				<h1>404</h1>
				<p>
					{' '}
					<span>Ooops!</span> Saya tidak menemukan halaman yang Anda cari!
				</p>
				<br />
				<button onClick={() => navigate('/')}>Kembali ke halaman utama</button>
			</div>
		</>
	);
};

export default Custom404;
