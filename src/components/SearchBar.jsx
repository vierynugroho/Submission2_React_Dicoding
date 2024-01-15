import { PropTypes } from 'prop-types';

const SearchBar = ({ onSearch, title }) => {
	return (
		<>
			<section className='search-bar'>
				<input
					type='text'
					placeholder='Cari Berdasarkan Judul...'
					value={title}
					onChange={(e) => onSearch(e.target.value.toLowerCase())}
				/>
			</section>
		</>
	);
};

SearchBar.propTypes = {
	onSearch: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
};
export default SearchBar;
