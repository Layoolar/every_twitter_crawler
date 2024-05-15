import { Link } from 'react-router-dom';

type CardProps = {
	post: {
		id: string;
		title: string;
		description: string;
		text: string;
		url: string;
		entities: Record<string, Array<string>>;
		actions: Record<string, number>;
	};
};

const TaskCard = ({ post }: CardProps) => {
	const { id, title, description, text, actions } = post;
	return (
		<div className='w-full p-8 flex flex-col gap-y-3 items-start hover:bg-gray-100'>
			<h2 className='font-semibold text-left'>{title || 'To Complete'}</h2>
			<div className='flex sm:gap-2'>
				{Object.keys(actions).map((item) => (
					<div
						key={item}
						className='max-w-fit py-0.5 px-3 rounded-badge text-xs md:text-sm bg-secondary gradien text-text font-bold'
					>
						{item}
					</div>
				))}
			</div>
			<p className='text-base-content text-start line-clamp-3'>
				{description || text}
			</p>
			<div className='flex items-center w-full'>
				<span className='text-sm text-gray-400'>Nov 24</span>
				<Link
					to={id}
					className='btn btn-sm ml-auto bg-primary text-primary-content'
				>
					Details...
				</Link>
			</div>
		</div>
	);
};

export default TaskCard;
