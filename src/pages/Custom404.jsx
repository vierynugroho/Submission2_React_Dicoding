import { useNavigate } from 'react-router-dom';

const Custom404 = () => {
	const navigate = useNavigate();

	return (
		<>
			<h1>404</h1>
			<p>Ooops! Saya tidak menemukan halaman yang Anda cari!</p>
			<button onClick={() => navigate('/')}>Kembali ke halaman utama</button>
		</>
	);
};

export default Custom404;
