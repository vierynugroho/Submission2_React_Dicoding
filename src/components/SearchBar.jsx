import { PropTypes } from 'prop-types';
import LocaleContext from '../contexts/LocaleContext';
import { useContext } from 'react';

const SearchBar = ({ onSearch, title }) => {
	const { locale, toggleLocale } = useContext(LocaleContext);

	return (
		<>
			<section className='search-bar'>
				<input
					type='text'
					placeholder={locale === 'id' ? 'Cari Berdasarkan Judul...' : 'Search By Title...'}
					value={title}
					onChange={(e) => onSearch(e.target.value.toLowerCase())}
				/>
			</section>
		</>
	);
};

SearchBar.propTypes = {
	onSearch: PropTypes.func.isRequired,
	title: PropTypes.string,
};
export default SearchBar;
