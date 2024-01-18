import parser from 'html-react-parser';
import { PropTypes } from 'prop-types';
import React, { useContext, useState } from 'react';
import { FaCheck } from 'react-icons/fa';

import LocaleContext from '../contexts/LocaleContext';

const NoteForm = ({ onAdd }) => {
	const { locale, toggleLocale } = useContext(LocaleContext);

	const [newNote, setNewNote] = useState({
		title: '',
		body: '',
	});

	const onTitleChange = (e) => {
		setNewNote({ ...newNote, title: e.target.value });
	};

	const onBodyChange = (e) => {
		setNewNote({ ...newNote, body: parser(e.target.innerHTML) });
	};

	const onSub = (e) => {
		e.preventDefault();
		onAdd(newNote);
		setNewNote(() => {
			return {
				title: '',
				body: '',
			};
		});
	};

	return (
		<>
			<div className='add-new-page__input'>
				<form onSubmit={onSub}>
					<input
						id='title'
						type='text'
						className='add-new-page__input__title'
						placeholder={locale === 'id' ? 'Judul' : 'Title'}
						value={newNote.title}
						onChange={onTitleChange}
						required
					/>
					<div
						id='body'
						className='add-new-page__input__body'
						contentEditable='true'
						data-placeholder={locale == 'id' ? 'Tulis Isi Catatan Anda Disini...' : 'Write the contents of your note here...'}
						onInput={onBodyChange}
						value={newNote.body}
						required
					></div>
					<div className='add-new-page__action'>
						<button
							className='action'
							type='submit'
							title={locale === 'id' ? 'Tambah Catatan' : 'Add Note'}
						>
							<FaCheck />
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

NoteForm.propTypes = {
	onAdd: PropTypes.func.isRequired,
};

export default NoteForm;
