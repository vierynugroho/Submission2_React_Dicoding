import { useContext } from 'react';
import LocaleContext from './../contexts/LocaleContext';

const showFormattedDate = (date) => {
	const { locale, toggleLocale } = useContext(LocaleContext);
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	return new Date(date).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', options);
};

export { showFormattedDate };
