import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';
import { PropTypes } from 'prop-types';

const ArchiveNotes = ({ notes, onSearch, title }) => {
	return (
		<>
			<main>
				<section className='archives-page'>
					<h2>Catatan Arsip</h2>
					<SearchBar
						onSearch={onSearch}
						title={title}
					/>
					{notes.length > 0 ? (
						<NoteList notes={notes} />
					) : (
						<section className='notes-list-empty'>
							<p className='notes-list__empty'>Arsip Kosong</p>
						</section>
					)}
				</section>
			</main>
		</>
	);
};

ArchiveNotes.propTypes = {
	notes: PropTypes.arrayOf(PropTypes.object).isRequired,
	onSearch: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
};
export default ArchiveNotes;
