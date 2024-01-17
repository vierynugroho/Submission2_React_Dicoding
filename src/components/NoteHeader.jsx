import { Link } from 'react-router-dom';

import { FaBox, FaRegMoon } from 'react-icons/fa';
import { MdGTranslate, MdOutlineWbSunny } from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';

import { useContext } from 'react';

import LocaleContext from '../contexts/LocaleContext';
import ThemeContext from './../contexts/ThemeContext';

const NoteHeader = ({ authedUser, onLogout }) => {
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
					<ul>
						<li
							className='theme'
							onClick={toggleTheme}
						>
							{theme === 'dark' ? <MdOutlineWbSunny /> : <FaRegMoon />}
						</li>
						<li
							className='translate'
							onClick={toggleLocale}
						>
							<MdGTranslate />
						</li>
						{authedUser !== null ? (
							<>
								<li key={'arsip'}>
									<Link
										className='link'
										to={'archives'}
									>
										<FaBox /> {locale === 'id' ? 'Arsip' : 'Archive'}
									</Link>
								</li>
								<li
									key={'logout'}
									onClick={onLogout}
								>
									<CiLogout /> {authedUser.name}
								</li>
							</>
						) : (
							<>
								<li>
									<Link
										to={'/login'}
										className='link'
									>
										{locale === 'id' ? 'Masuk' : 'Login'}
									</Link>
								</li>
								<li>
									<Link
										to={'/register'}
										className='link'
									>
										{locale === 'id' ? 'Registrasi' : 'Register'}
									</Link>
								</li>
							</>
						)}
					</ul>
				</nav>
			</header>
		</>
	);
};

export default NoteHeader;
