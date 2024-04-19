import { AuthProvider } from './auth/authContext.jsx';
import { AppRouter } from './routers/AppRouter.jsx';
import './App.css';

export const App = () => {
	return (
		<AuthProvider>
			<AppRouter />
		</AuthProvider>
	);
};

export default App;
