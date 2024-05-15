import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../adapter/context/AppContext';
import ActionTags from '../components/Cards/ActionTags';
import EntityTags from '../components/Cards/EntityTags';
import Input from '../components/Input/Input';

const TaskDetails = () => {
	const params = useParams();
	const [submitLink, setSubmitLink] = useState();
	const { posts, isLoading, error } = useContext(AppContext);
	console.log(params);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error...</div>;
	if (!posts?.length) return <div>There are not tasks to display :(</div>;
	const post_dt = posts.find((item) => item.id === params.id);
	if (!post_dt) return <div>Post data not found!</div>;
	const {
		title,
		description,
		url: post_url,
		entities,
		actions,
		endTime,
	} = post_dt;

	return (
		<div className='flex flex-col items-start p-8 border gap-4 [&>*]:w-full [&>*]:border'>
			<div className='flex flex-col items-start'>
				<h2 className='text-xl font-semibold text-[#121212]'>{title}</h2>
				<div>
					<span className='text-gray-400 text-xs ml-2'>
						{new Date(endTime).getMonth()} {new Date(endTime).getDay()}
					</span>
				</div>
			</div>
			<p className='text-gray-500 text-start text-sm'>{description}</p>
			<div className='flex flex-col items-start gap-y-4'>
				<h3 className='font-semibold text-primary text-start '>Entities</h3>
				{Object.entries(entities).map(([key, value], idx) => {
					if (value.length)
						return (
							<div key={key + idx} className='flex gap-x-2 items-start'>
								<span className='text-xs'>{key.toUpperCase()}</span>
								<div className='flex flex-wrap gap-1'>
									{value.map((item) => {
										return <EntityTags key={item} item={item} />;
									})}
								</div>
							</div>
						);
				})}
			</div>
			<div className='flex flex-col items-start'>
				<h3 className='font-semibold text-primary text-start '>Task Action</h3>
				<div className='space-x-2'>
					{Object.entries(actions).map(([key, value]) => {
						if (value) return <ActionTags key={key} item={key} />;
					})}
				</div>
			</div>
			<div className='grid grid-cols-1 items-start w-[calc(80%)]'>
				<h3 className='font-semibold text-primary text-start'>Task Link</h3>
				<a
					href='http://'
					target='_blank'
					rel='noopener noreferrer'
					className='text-sky-400 hover:text-sky-700 underline truncate'
				>
					{post_url}
				</a>
			</div>
			<div className='mt-4 flex flex-col items-center gap-2 w-full'>
				<Input placeholder='Task URL' type='url' />
				<button className='btn btn-primary w-full md:w-96' onClick={() => {}}>
					Submit link
				</button>
			</div>
		</div>
	);
};

export default TaskDetails;
