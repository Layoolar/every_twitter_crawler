import { useContext } from 'react';
import { AppContext } from '../../adapter/context/AppContext';

const Profile = () => {
	const { user } = useContext(AppContext);

	return (
		<div className='w-full py-8 px-8 border flex flex-col items-center gap-4'>
			<div className='w-12 h-12 border border-primary rounded-full p-0.5 box-content'>
				<img
					className='rounded-full'
					src={user?.twitter?.profile_image_url}
					alt={`${user?.twitter?.username}`}
				/>
			</div>
			<h2 className='text-sky-700'>
				@{user?.twitter?.username ?? 'no username'}
			</h2>
			<p></p>
			<div className='flex w-full gap-4 justify-center'>
				<div className='w-20 h-20 p-2 rounded-md bg-sky-200 grid items-center justify-center'>
					<p className='text-5xl font-bold text-sky-800'>0</p>
					<span className='text-sky-900 font-semibold text-sm'>Total XP</span>
				</div>
				<div className='w-20 h-20 p-2 rounded-md bg-sky-200 grid items-center justify-center'>
					<p className='text-5xl font-bold text-sky-800'>0</p>
					<span className='text-sky-900 font-semibold text-sm'>Total XP</span>
				</div>
				<div className='w-20 h-20 p-2 rounded-md bg-sky-200 grid items-center justify-center'>
					<p className='text-5xl font-bold text-sky-800'>0</p>
					<span className='text-sky-900 font-semibold text-sm'>Total XP</span>
				</div>
			</div>
			<div></div>
			{!user?.telegram && (
				<div className='rounded-md border flex w-full gap-4 btn btn-primary'>
					Link telegram
				</div>
			)}
		</div>
	);
};

export default Profile;
