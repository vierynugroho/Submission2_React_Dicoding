import { FaPlus } from 'react-icons/fa';

const AddButton = () => {
	return (
		<button
			className='action'
			type='button'
			title='Tambah'
		>
			<FaPlus />
		</button>
	);
};

export default AddButton;
