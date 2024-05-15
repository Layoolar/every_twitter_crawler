import Input from './Input';

const _actions = ['post', 'retweet', 'quote', 'comment'];

type EntitiesProps = {
	actions: Record<string, number>;
	addAction: (action: string) => void;
	removeAction: (action: string) => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Actions = ({
	actions,
	addAction,
	removeAction,
	onChange,
}: EntitiesProps) => {
	const wrapped = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		if (!isNaN(+value) && +value >= 0) {
			onChange(e);
		}
	};
	return (
		<div>
			<h2 className='text-lg text-secondary font-bold text-left mb-4'>
				Actions
			</h2>
			<div className='gap-x-2 flex'>
				{_actions.map((action) => (
					<button
						name={action}
						key={action}
						value={action}
						onClick={() => addAction(action)}
						className='btn btn-sm btn-secondary'
						disabled={actions[action] >= 0}
					>
						{action}
					</button>
				))}
			</div>
			<div className='my-4 flex items-center justify-start gap-4 flex-wrap'>
				{Object.entries(actions).map((item) => {
					const [key, value] = item;
					return (
						<div key={key} className='flex gap-2 items-end grow'>
							<Input
								name={key}
								value={value}
								label={`${key} - points for ${key}`}
								pattern='[1-9]\d*'
								onChange={wrapped}
								variant={Input.variant.sm}
								required
							/>
							<button
								onClick={() => removeAction(key)}
								className='btn btn-sm btn-secondary'
							>
								X
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Actions;
