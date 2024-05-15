import React, { useState } from 'react';
import Input from './Input/Input';

interface EntityActionFormProps {
	onSubmit: (entities: string[], actions: Record<string, number>) => void;
}

const _entities = ['cashtags', 'hashtags', 'keywords', 'mentions'];
const _actions = ['post', 'retweet', 'quote', 'comment'];

const EntityActionForm: React.FC<EntityActionFormProps> = ({ onSubmit }) => {
	// State for entities and actions
	const [actions, setActions] = useState<Record<string, number>>({});
	const [testent, setTestent] = useState<Record<string, Array<string>>>({});

	const addEnt = (name: string) => {
		if (testent[name]) return;
		setTestent((prev) => {
			return { ...prev, [name]: [] };
		});
	};

	const removeEnt = (name: string) => {
		console.log(name);
		setTestent((prev) => {
			const copy = { ...prev };
			delete copy[name];
			return copy;
		});
	};

	// Handler for updating an action
	const updateAction = (action: string, value: number) => {
		setActions({ ...actions, [action]: value });
	};

	// Handler for form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(_entities, actions);
	};

	return (
		<div className='w-full'>
			<form onSubmit={handleSubmit}>
				<div>
					<h2 className='text-lg text-secondary font-bold'>Entities</h2>
					<div className='space-x-2'>
						{_entities.map((entity) => (
							<button
								name={entity}
								key={entity}
								value={entity}
								onClick={() => addEnt(entity)}
								className='btn btn-sm btn-secondary'
								disabled={!!testent[entity]}
							>
								{entity}
							</button>
						))}
					</div>
					<div className='my-4 w-full flex flex:col sm:flex-row flex-wrap gap-x-4 gap-y-2'>
						{Object.entries(testent).map((item) => {
							const [key] = item;
							return (
								<div key={key} className='flex gap-2 items-end'>
									<Input label={key} />
									<button onClick={() => removeEnt(key)} className='btn btn-sm'>
										X
									</button>
								</div>
							);
						})}
					</div>
				</div>
				<div>
					<h2 className='text-lg text-secondary font-bold'>Actions</h2>
					<div className='space-x-2'>
						{_actions.map((action) => (
							<button
								name={action}
								key={action}
								value={action}
								onClick={() => addEnt(action)}
								className='btn btn-sm btn-secondary'
								disabled={!!testent[action]}
							>
								{action}
							</button>
						))}
					</div>
					<div className='my-4 w-full flex flex:col sm:flex-row flex-wrap gap-x-4 gap-y-2'>
						{Object.entries(actions).map((item) => {
							const [key] = item;
							return (
								<div key={key} className='flex gap-2 items-end'>
									<Input label={key} />
									<button onClick={() => removeEnt(key)} className='btn btn-sm'>
										X
									</button>
								</div>
							);
						})}
					</div>
					<div>
						<label>
							Comment:
							<input
								type='number'
								value={actions['COMMENT'] || ''}
								onChange={(e) =>
									updateAction('COMMENT', parseInt(e.target.value))
								}
							/>
						</label>
					</div>
					<div>
						<label>
							Quote:
							<input
								type='number'
								value={actions['QUOTE'] || ''}
								onChange={(e) =>
									updateAction('QUOTE', parseInt(e.target.value))
								}
							/>
						</label>
					</div>
				</div>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};

export default EntityActionForm;
