import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AddPost from './pages/AddPost';
import Home from './pages/Home';
import TaskDetails from './pages/TaskDetails';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { AppProvider } from '../adapter/context/AppContext';
import ProtectedPage from './SecureRoute';
import ErrorBoundary from './components/Errors/ErrorBoundary';

function App() {
	return (
		<ErrorBoundary>
			<AppProvider>
				<Navbar />
				<Routes>
					<Route
						path='/'
						element={
							<ProtectedPage>
								<Home />
							</ProtectedPage>
						}
					/>
					<Route path='/login' element={<Login />} />
					<Route
						path=':id'
						element={
							<ProtectedPage>
								<TaskDetails />
							</ProtectedPage>
						}
					/>
					<Route
						path='/add'
						element={
							<ProtectedPage>
								<AddPost />
							</ProtectedPage>
						}
					/>
					<Route
						path='/profile'
						element={
							<ProtectedPage>
								<Profile />
							</ProtectedPage>
						}
					/>
					<Route
						path='/details'
						element={
							<ProtectedPage>
								<TaskDetails />
							</ProtectedPage>
						}
					/>
				</Routes>
			</AppProvider>
		</ErrorBoundary>
	);
}

export default App;
