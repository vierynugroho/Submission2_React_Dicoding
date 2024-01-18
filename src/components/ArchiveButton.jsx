import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { MdArchive } from 'react-icons/md';
import { archiveNote } from '../utils/network-data';

import LocaleContext from '../contexts/LocaleContext';
import { useContext } from 'react';

const ArchiveButton = ({ noteId }) => {
	const { locale, toggleLocale } = useContext(LocaleContext);

	const navigate = useNavigate();
	return (
		<>
			<button
				className='action'
				type='button'
				title={locale === 'id' ? 'Arsip' : 'Archive'}
				onClick={() => {
					archiveNote(noteId, locale);
					navigate('/archives');
				}}
			>
				<MdArchive />
			</button>
		</>
	);
};

ArchiveButton.proptypes = {
	noteId: PropTypes.string.isRequired,
};

export default ArchiveButton;
