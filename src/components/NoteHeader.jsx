import { Link } from 'react-router-dom';

import { FaBox } from 'react-icons/fa';
import { MdGTranslate, MdOutlineWbSunny } from 'react-icons/md';

import { useContext } from 'react';

import LocaleContext from '../contexts/LocaleContext';
import ThemeContext from './../contexts/ThemeContext';

const NoteHeader = ({ authedUser }) => {
	const { locale, toggleLocale } = useContext(LocaleContext);
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<>
			<header>
				<h1>
					<Link
						className='link'
						to={'/'}
					>
						VNotes
					</Link>
				</h1>
				<nav className='navigation'>
					{authedUser !== null ? (
						<ul>
							<li key={'arsip'}>
								<Link
									className='link'
									to={'archives'}
								>
									<FaBox /> {locale === 'id' ? 'Arsip' : 'Archive'}
								</Link>
							</li>
							<li
								className='theme'
								onClick={toggleTheme}
							>
								<MdOutlineWbSunny />
							</li>
							<li
								className='translate'
								onClick={toggleLocale}
							>
								<MdGTranslate />
							</li>
						</ul>
					) : (
						<ul>
							<li>
								<Link
									to={'/login'}
									className='link'
								>
									Login
								</Link>
							</li>
							<li>
								<Link
									to={'/register'}
									className='link'
								>
									Register
								</Link>
							</li>
							<li
								className='theme'
								onClick={toggleTheme}
							>
								<MdOutlineWbSunny />
							</li>
							<li
								className='translate'
								onClick={toggleLocale}
							>
								<MdGTranslate />
							</li>
						</ul>
					)}
				</nav>
			</header>
		</>
	);
};

export default NoteHeader;
