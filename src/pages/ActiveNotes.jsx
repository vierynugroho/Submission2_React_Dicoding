import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import AddButton from '../components/AddButton';
import { useEffect, useState, useContext } from 'react';
import { getActiveNotes } from '../utils/network-data';

import LocaleContext from '../contexts/LocaleContext';

const ActiveNotes = ({ onSearch, title }) => {
	const { locale, toggleLocale } = useContext(LocaleContext);

	const [notes, setNotes] = useState([]);

	// render awal dan render selanjutnya
	useEffect(() => {
		const fetchNotes = async () => {
			const { data } = await getActiveNotes(locale);
			setNotes(data);
		};
		fetchNotes();
	}, [notes]);

	const searchNote = !title ? notes : notes.filter((note) => note.title.toLowerCase().match(title));

	return (
		<>
			<main>
				<section className='homepage'>
					<h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}</h2>
					<SearchBar
						onSearch={onSearch}
						title={title}
					/>
					{/* Notes List */}
					{searchNote.length > 0 ? (
						<NoteList notes={searchNote} />
					) : (
						<section className='notes-list-empty'>
							<p className='notes-list__empty'>{locale === 'id' ? 'Tidak Ada Catatan' : 'Notes Empty'}</p>
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
	notes: PropTypes.arrayOf(PropTypes.object),
	onSearch: PropTypes.func.isRequired,
	title: PropTypes.string,
};

export default ActiveNotes;
