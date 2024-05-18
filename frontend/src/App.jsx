import { AuthProvider } from './auth/authContext.jsx';
import { AppRouter } from './routers/AppRouter.jsx';
import './App.css';

export const App = () => {
	return (
		<div className='App'>
			<AuthProvider>
				<AppRouter />
			</AuthProvider>
		</div>
	);
};

export default App;
