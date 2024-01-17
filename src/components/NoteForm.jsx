import parser from 'html-react-parser';
import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const NoteForm = ({ onAdd }) => {
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
						placeholder='Tulis Judul Catatan Anda Disini...'
						value={newNote.title}
						onChange={onTitleChange}
						required
					/>
					<div
						id='body'
						className='add-new-page__input__body'
						contentEditable='true'
						data-placeholder='Tulis Isi Catatan Anda Disini...'
						onInput={onBodyChange}
						value={newNote.body}
						required
					></div>
					<div className='add-new-page__action'>
						<button
							className='action'
							type='submit'
							title='Tambah Catatan'
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
