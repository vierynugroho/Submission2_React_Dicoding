import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';
import { PropTypes } from 'prop-types';
import { getArchivedNotes } from '../utils/network-data';
import { useEffect, useState } from 'react';

const ArchiveNotes = ({ onSearch, title }) => {
	const [notes, setNotes] = useState([]);

	// render awal dan render selanjutnya
	useEffect(() => {
		const fetchNotes = async () => {
			const { data } = await getArchivedNotes();
			setNotes(data);
		};
		fetchNotes();
	}, []);
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
	onSearch: PropTypes.func.isRequired,
	title: PropTypes.string,
};
export default ArchiveNotes;
