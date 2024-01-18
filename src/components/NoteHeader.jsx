import { Link, useLocation } from 'react-router-dom';

import { FaBox, FaBoxOpen, FaRegMoon } from 'react-icons/fa';
import { MdGTranslate, MdOutlineWbSunny } from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';

import { useContext } from 'react';

import LocaleContext from '../contexts/LocaleContext';
import ThemeContext from './../contexts/ThemeContext';
import { PropTypes } from 'prop-types';

const NoteHeader = ({ authedUser, onLogout }) => {
	const { locale, toggleLocale } = useContext(LocaleContext);
	const { theme, toggleTheme } = useContext(ThemeContext);

	const location = useLocation();
	const pathName = location.pathname;

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
							title={locale === 'id' ? theme : theme}
							className='theme pointer'
							onClick={toggleTheme}
						>
							{theme === 'dark' ? <MdOutlineWbSunny /> : <FaRegMoon />}
						</li>
						<li
							title={locale === 'id' ? 'ID' : 'EN'}
							className='translate pointer'
							onClick={toggleLocale}
						>
							<MdGTranslate />
						</li>
						{authedUser !== null ? (
							<>
								{pathName === '/archives' ? (
									<li
										key={'active'}
										title={locale === 'id' ? 'Aktif' : 'Active'}
									>
										<Link
											className='link pointer'
											to={'/'}
										>
											<FaBoxOpen /> {locale === 'id' ? 'Aktif' : 'Active'}
										</Link>
									</li>
								) : (
									<li
										key={'arsip'}
										title={locale === 'id' ? 'Arsip' : 'Archive'}
									>
										<Link
											className='link pointer'
											to={'archives'}
										>
											<FaBox /> {locale === 'id' ? 'Arsip' : 'Archive'}
										</Link>
									</li>
								)}
								<li
									className='pointer'
									key={'logout'}
									onClick={onLogout}
									title={locale === 'id' ? 'Keluar' : 'Logout'}
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

NoteHeader.proptypes = {
	authedUser: PropTypes.string,
	onLogout: PropTypes.func.isRequired,
};

export default NoteHeader;
