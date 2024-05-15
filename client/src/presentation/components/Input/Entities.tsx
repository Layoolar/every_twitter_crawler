import Input from './Input';

const _entities = ['cashtags', 'hashtags', 'keywords', 'mentions'];

type EntitiesProps = {
	entities: Record<string, string>;
	addEntity: (entity: string) => void;
	removeEntity: (entity: string) => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Entities = ({
	entities,
	addEntity,
	removeEntity,
	onChange,
}: EntitiesProps) => {
	return (
		<div>
			<h2 className='text-lg text-secondary font-bold text-left mb-4'>
				Entities
			</h2>
			<div className='gap-x-2 flex'>
				{_entities.map((entity) => (
					<button
						name={entity}
						key={entity}
						value={entity}
						onClick={() => addEntity(entity)}
						className='btn btn-sm btn-secondary'
						disabled={Object.keys(entities).includes(entity)}
					>
						{entity}
					</button>
				))}
			</div>
			<div className='my-4 flex items-center justify-start gap-4 flex-wrap'>
				{Object.entries(entities).map((item) => {
					const [key, value] = item;
					return (
						<div key={key} className='flex gap-2 items-end grow'>
							<Input label={key} name={key} value={value} onChange={onChange} variant={Input.variant.sm} />
							<button
								onClick={() => removeEntity(key)}
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

export default Entities;
