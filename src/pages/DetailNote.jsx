import { useNavigate, useParams } from 'react-router-dom';
import { showFormattedDate } from '../utils';
import { PropTypes } from 'prop-types';
import DeleteButton from './../components/DeleteButton';
import ArchiveButton from '../components/ArchiveButton';
import UnArchiveButton from '../components/UnArchiveButton';

const DetailNote = ({ onDelete, onArchive, onUnArchive, notes }) => {
	const { id } = useParams();

	function getNote(id) {
		const foundedNote = notes.find((note) => note.id === id);
		return foundedNote;
	}

	const detailNote = getNote(id);
	const navigate = useNavigate();

	return (
		<>
			{/* Main */}
			<main>
				<section className='detail-page'>
					<h3 className='detail-page__title'>{detailNote.title}</h3>
					<p className='detail-page__createdAt'>{showFormattedDate(detailNote.createdAt)}</p>
					<div className='detail-page__body'>{detailNote.body}</div>
					<div className='detail-page__action'>
						{detailNote.archived === false ? (
							<ArchiveButton
								onArchive={onArchive}
								noteId={detailNote.id}
							/>
						) : (
							<UnArchiveButton
								onUnArchive={onUnArchive}
								noteId={detailNote.id}
							/>
						)}
						<DeleteButton
							onDelete={onDelete}
							noteId={detailNote.id}
						/>
					</div>
				</section>
			</main>
			{/* Main */}
		</>
	);
};

DetailNote.propTypes = {
	notes: PropTypes.arrayOf(PropTypes.object).isRequired,
	onDelete: PropTypes.func.isRequired,
	onArchive: PropTypes.func.isRequired,
	onUnArchive: PropTypes.func.isRequired,
};
export default DetailNote;
