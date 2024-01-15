import parser from 'html-react-parser';
import { PropTypes } from 'prop-types';
import React, { useState } from 'react';

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
							<svg
								stroke='currentColor'
								fill='currentColor'
								strokeWidth='0'
								viewBox='0 0 24 24'
								height='1em'
								width='1em'
							>
								<path
									fill='none'
									d='M0 0h24v24H0V0z'
								></path>
								<path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'></path>
							</svg>
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
