import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';
import { PropTypes } from 'prop-types';
import { getArchivedNotes } from '../utils/network-data';
import { useEffect, useState, useContext } from 'react';

import LocaleContext from '../contexts/LocaleContext';

const ArchiveNotes = ({ onSearch, title }) => {
	const { locale, toggleLocale } = useContext(LocaleContext);

	const [loading, setLoading] = useState(true);
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		const fetchNotes = async () => {
			const { data } = await getArchivedNotes(locale);
			setNotes(data);
		};
		fetchNotes();
	}, [notes]);

	// for loading
	useEffect(() => {
		const fetchNotes = async () => {
			setLoading(true);
			const { data } = await getArchivedNotes(locale);
			setNotes(data);
			setLoading(false);
		};
		fetchNotes();
	}, []);

	const searchNote = !title ? notes : notes.filter((note) => note.title.toLowerCase().match(title));

	return (
		<>
			{loading ? (
				<p>Loading...</p>
			) : (
				<main>
					<section className='archives-page'>
						<h2>{locale === 'id' ? 'Catatan Arsip' : 'Archive Notes'}</h2>
						<SearchBar
							onSearch={onSearch}
							title={title}
						/>
						{searchNote.length > 0 ? (
							<NoteList notes={searchNote} />
						) : (
							<section className='notes-list-empty'>
								<p className='notes-list__empty'>Arsip Kosong</p>
							</section>
						)}
					</section>
				</main>
			)}
		</>
	);
};

ArchiveNotes.propTypes = {
	onSearch: PropTypes.func.isRequired,
	title: PropTypes.string,
};
export default ArchiveNotes;
