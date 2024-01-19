import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './styles/style.css';
import { BrowserRouter, RouterProvider } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
root.render(
	<StrictMode>
		<RouterProvider router={router}>
			<App />
		</RouterProvider>
	</StrictMode>
);
