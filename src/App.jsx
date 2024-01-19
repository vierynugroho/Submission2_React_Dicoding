import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { getAllNotes } from './utils/local-data';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NoteHeader from './components/NoteHeader';

import LocaleContext from './contexts/LocaleContext';

import ActiveNotes from './pages/ActiveNotes';
import ArchiveNotes from './pages/ArchiveNotes';
import DetailNote from './pages/DetailNote';
import AddNote from './pages/AddNote';
import Custom404 from './pages/Custom404';
import ThemeContext from './contexts/ThemeContext';
import RegisterPage from './pages/Auth/RegisterPage';
import LoginPage from './pages/Auth/LoginPage';

import { getUserLogged, putAccessToken } from './utils/network-data';

const App = () => {
	// state
	const [initializing, setInitializing] = useState(true);
	const [authedUser, setAuthedUser] = useState(null);

	// from context
	const [locale, setLocale] = useState(localStorage.getItem('locale') || 'id');
	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

	// params
	const [searchParams, setSearchParams] = useSearchParams();
	const title = searchParams.get('title') || '';

	const changeSearchParams = (keyword) => {
		setSearchParams({ title: keyword });
	};

	// toggle lang
	const toggleLocale = () => {
		setLocale((prevLocale) => {
			const newLocale = prevLocale === 'id' ? 'en' : 'id';
			localStorage.setItem('locale', newLocale);
			return newLocale;
		});
	};

	const localeContextValue = useMemo(() => {
		return {
			locale,
			toggleLocale,
		};
	}, [locale]);

	const toggleTheme = () => {
		setTheme((prevTheme) => {
			const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
			localStorage.setItem('theme', newTheme);
			return newTheme;
		});
	};

	const ThemeContextValue = useMemo(() => {
		return {
			theme,
			toggleTheme,
		};
	}, [theme]);

	const onLoginSuccess = async ({ accessToken }) => {
		putAccessToken(accessToken);
		const { data } = await getUserLogged();
		setAuthedUser(data);
	};

	useEffect(() => {
		const fetchUser = async () => {
			const { data } = await getUserLogged();
			setAuthedUser(data);
			setInitializing(false);
		};
		fetchUser();
	}, []);

	const onLogout = () => {
		setAuthedUser(null);
		putAccessToken('');
		toast.success(locale === 'id' ? 'Logout Sukses' : 'Logout Success');
	};

	if (initializing) {
		return null;
	}

	return (
		<>
			<LocaleContext.Provider value={localeContextValue}>
				<ThemeContext.Provider value={ThemeContextValue}>
					<div
						className='app-container'
						data-theme={theme}
					>
						<ToastContainer autoClose={300} />
						<NoteHeader
							authedUser={authedUser}
							onLogout={onLogout}
						/>
						<Routes>
							{authedUser === null ? (
								<>
									<Route
										path='/*'
										element={<LoginPage loginSuccess={onLoginSuccess} />}
									/>
									<Route
										path='/register'
										element={<RegisterPage />}
									/>
								</>
							) : (
								<>
									<Route
										path='/'
										element={
											<ActiveNotes
												onSearch={changeSearchParams}
												title={title}
											/>
										}
									/>
									<Route
										path='/archives'
										element={
											<ArchiveNotes
												onSearch={changeSearchParams}
												title={title}
											/>
										}
									/>
									<Route
										path='/notes/:id'
										element={<DetailNote />}
									/>
									<Route
										path='/notes/new'
										element={<AddNote />}
									/>
								</>
							)}

							{/* 404 NotFound Page */}
							<Route
								path='*'
								element={<Custom404 />}
							/>
						</Routes>
					</div>
				</ThemeContext.Provider>
			</LocaleContext.Provider>
		</>
	);
};

export default App;
