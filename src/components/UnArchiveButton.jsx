import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';

const UnArchiveButton = ({ onUnArchive, noteId }) => {
	const navigate = useNavigate();
	return (
		<>
			<button
				className='action'
				type='button'
				title='Arsipkan'
				onClick={() => {
					onUnArchive(noteId);
					navigate('/');
				}}
			>
				<svg
					stroke='currentColor'
					fill='currentColor'
					strokeWidth='0'
					viewBox='0 0 24 24'
					height='1em'
					width='1em'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						fill='none'
						d='M0 0h24v24H0V0z'
					></path>
					<path d='M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm3-5h2.55v3h2.9v-3H16l-4-4z'></path>
				</svg>
			</button>
		</>
	);
};

UnArchiveButton.proptypes = {
	onUnArchive: PropTypes.func.isRequired,
	noteId: PropTypes.string.isRequired,
};

export default UnArchiveButton;
