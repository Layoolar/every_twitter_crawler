import Input from '../Input/Input';

type CardProps = {
	post: {
		title: string;
		description: string;
		url: string;
		entities: Record<string, Array<string>>;
		actions: Record<string, number>;
	};
};

const Card = ({ post }: CardProps) => {
	const { title, description, url, entities, actions } = post;
	return (
		<div className='card w-96 rounded-none border'>
			<div className='card-body'>
				<h2 className='card-title self-center'>{title}</h2>
				<p>{description}</p>
				<a
					href={url}
					target='_blank'
					className='text-blue-200 truncate hover:text-blue-400'
				>
					{url}
				</a>
				<div className='flex flex-col items-start gap-y-4'>
					{Object.entries(entities).map(([key, value]) => {
						if (value.length)
							return (
								<div className='flex gap-x-2 items-start'>
									<span className='text-xs'>{key.toUpperCase()}</span>
									<div className='flex flex-wrap gap-1'>
										{value.map((item) => {
											return (
												<span className='py-0.5 px-2 rounded-md bg-primary text-xs text-base-100 font-bold'>
													{item}
												</span>
											);
										})}
									</div>
								</div>
							);
					})}
				</div>
				<div className='space-x-2'>
					{Object.entries(actions).map(([key, value]) => {
						if (value)
							return (
								<span className='py-1 px-2 rounded-md bg-primary-content text-sm text-base-100 font-bold'>
									{key}
								</span>
							);
					})}
				</div>
				<div className='card-actions mt-4 flex-col items-center'>
					<Input />
					<button className='btn btn-primary w-full md:w-96' onClick={() => {}}>
						Submit link
					</button>
				</div>
			</div>
		</div>
	);
};

export default Card;
