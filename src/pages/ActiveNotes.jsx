import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import AddButton from '../components/AddButton';

const ActiveNotes = ({ notes, onSearch, title }) => {
	return (
		<>
			<main>
				<section className='homepage'>
					<h2>Catatan Aktif</h2>
					<SearchBar
						onSearch={onSearch}
						title={title}
					/>
					{/* Notes List */}
					{notes.length > 0 ? (
						<NoteList notes={notes} />
					) : (
						<section className='notes-list-empty'>
							<p className='notes-list__empty'>Tidak ada catatan</p>
						</section>
					)}
					{/* Notes List */}

					{/* homepage__action */}
					<Link to={'/notes/new'}>
						<div className='homepage__action'>
							<AddButton />
						</div>
					</Link>
					{/* homepage__action */}
				</section>
			</main>
		</>
	);
};

ActiveNotes.propTypes = {
	notes: PropTypes.arrayOf(PropTypes.object).isRequired,
	onSearch: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
};

export default ActiveNotes;
