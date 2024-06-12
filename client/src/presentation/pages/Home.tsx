import { useContext } from 'react';
import { AppContext } from '../../adapter/context/AppContext';
import TaskCard from '../components/Cards/TaskCard';

const Home = () => {
	const { posts, isLoading, error } = useContext(AppContext);

	const altcname =
		'px-4 py-8 gap-4 flex flex-col md:flex-row flex-wrap items-center justify-center';

	if (isLoading) {
		return <div>Loading all today's posts...</div>;
	}

	if (error) {
		return <div>Error while fetching posts! {JSON.stringify(error)}</div>;
	}

	return (
		<div className='pb-8 flex flex-col divide-y divide-text-700'>
			<div className='w-full flex divide-x divide-text-700'>
				<div className='h-20 w-20 bg-accent'></div>
				<div className='h-20 w-20 bg-secondary'></div>
				<div className='h-20 w-20 bg-text'></div>
				<div className='h-20 w-20 bg-primary'></div>
				<div className='h-20 w-20 bg-background'></div>
				<div className='h-20 w-20 bg-accent'></div>
				<div className='h-20 w-20 bg-accent'></div>
				<div className='h-20 w-20 bg-accent'></div>
			</div>
			{posts?.length ? (
				posts?.map((post, idx) => {
					return <TaskCard key={`card-${idx}`} post={post} />;
				})
			) : (
				<div>No post to display...</div>
			)}
		</div>
	);
};

export default Home;
