import { useNavigate, useParams } from 'react-router-dom';
import { showFormattedDate } from '../utils';
import { PropTypes } from 'prop-types';
import DeleteButton from './../components/DeleteButton';
import ArchiveButton from '../components/ArchiveButton';
import UnArchiveButton from '../components/UnArchiveButton';
import { getNote } from '../utils/network-data';
import { useEffect, useState } from 'react';

const DetailNote = ({ onDelete, onArchive, onUnArchive }) => {
	const { id } = useParams();
	const [note, setNote] = useState([]);

	// render awal dan render selanjutnya
	useEffect(() => {
		const fetchNote = async () => {
			const { data } = await getNote(id);
			setNote(data);
		};
		fetchNote();
	}, []);

	return (
		<>
			{/* Main */}
			<main>
				<section className='detail-page'>
					<h3 className='detail-page__title'>{note.title}</h3>
					<p className='detail-page__createdAt'>{showFormattedDate(note.createdAt)}</p>
					<div className='detail-page__body'>{note.body}</div>
					<div className='detail-page__action'>
						{note.archived === false ? (
							<ArchiveButton
								onArchive={onArchive}
								noteId={note.id}
							/>
						) : (
							<UnArchiveButton
								onUnArchive={onUnArchive}
								noteId={note.id}
							/>
						)}
						<DeleteButton
							onDelete={onDelete}
							noteId={note.id}
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
