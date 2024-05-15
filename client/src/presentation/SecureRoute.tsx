import { PropsWithChildren, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../adapter/context/AppContext';

const ProtectedPage = ({ children }: PropsWithChildren) => {
	const { state } = useContext(AppContext);
	const token = document.cookie
		.split('; ')
		.find((row) => row.startsWith('token='))
		?.split('=')[1];
	console.log(token);
	return <>{token ? children : <Navigate to='/login' />}</>;
};

export default ProtectedPage;
