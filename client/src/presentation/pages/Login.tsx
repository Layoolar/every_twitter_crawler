import { useCallback, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../adapter/context/AppContext';
import { useLoginUrl } from '../../adapter/getLoginUrlAdapter';
import axios from '../../service/axios';

const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const state = queryParams.get('state');
	const code = queryParams.get('code');
	const { url: authUrl, isError, isLoading } = useLoginUrl(!(code && state));
	const { dispatch } = useContext(AppContext);

	const login = useCallback(async () => {
		try {
			const res = await axios.post(
				'/auth/twitter/callback',
				{ state, code },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			console.log(res.data);
			dispatch({ type: 'AUTHENTICATE' });
			navigate('/');
		} catch (error) {
			// TODO Handle error
			console.error('Error:', error);
		}
	}, [state, code, dispatch, navigate]);

	// Use useEffect to get initial authurl
	useEffect(() => {
		if (state && code) {
			login();
		}
	}, [state, code, login]);

	return (
		<div className='py-8 flex flex-col gap-4 px-4 w-full items-center justify-center'>
			{authUrl?.length ? (
				<a className='btn btn-outline btn-primary' href={authUrl}>
					Login With Twitter
				</a>
			) : (
				<div>
					{isLoading && 'Loading...'} {isError && 'Error!'}
				</div>
			)}
		</div>
	);
};

export default Login;
