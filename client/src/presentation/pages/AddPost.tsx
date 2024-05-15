import { useState } from 'react';
import Input from '../components/Input/Input';
import TextArea from '../components/Input/TextArea';
import Entities from '../components/Input/Entities';
import Actions from '../components/Input/Actions';
import { convertString } from '../../service/symbols';

export type FormType = {
	title: string;
	url: string;
	text: string;
	entities: Record<string, string>;
	actions: Record<string, number>;
	endTime: string;
};

const AddPost = () => {
	const [formData, setFormData] = useState<FormType>({
		title: '',
		url: '',
		text: '',
		entities: {},
		actions: {},
		endTime: '',
	});

	const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const onActionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => {
			return {
				...prev,
				actions: { ...prev.actions, [name]: +value },
			};
		});
	};

	const onEntitychange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => {
			return {
				...prev,
				entities: { ...prev.entities, [name]: value },
			};
		});
	};

	const addEntity = (entity: string) => {
		if (formData.entities[entity]) return;
		setFormData((prev) => {
			return { ...prev, entities: { ...prev.entities, [entity]: '' } };
		});
	};

	const removeEntity = (entity: string) => {
		setFormData((prev) => {
			const copy = { ...prev };
			delete copy.entities[entity];
			return { ...copy };
		});
	};

	const addAction = (action: string) => {
		if (formData.actions[action]) return;
		setFormData((prev) => {
			return { ...prev, actions: { ...prev.actions, [action]: 0 } };
		});
	};

	const removeAction = (action: string) => {
		setFormData((prev) => {
			const copy = { ...prev };
			delete copy.actions[action];
			return { ...copy };
		});
	};

	const addPost = async () => {
		const data = {
			...formData,
			entities: convertString(formData.entities),
		};
		console.log(data);
		try {
			const res = await fetch('http://127.0.0.1:3000/post/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				mode: 'cors',
				body: JSON.stringify(data),
			});
			const dt = await res.json();
			console.log(dt);
			// TODO Redirect to created page
		} catch (error) {
			console.log('Error: ', error);
		}
	};

	return (
		<div className='container m-12 sm:mx-auto space-y-12'>
			<h1 className='text-primary font-bold text-xl'>Add New Post</h1>
			<div className='space-y-4'>
				<Input
					name='title'
					label='Title - required'
					placeholder='Title'
					onChange={onChange}
				/>
				<Input
					name='url'
					label='Twitter URL'
					type='url'
					placeholder='https://twitter.com/...'
					onChange={onChange}
				/>
				<Input
					name='description'
					label='Description'
					placeholder='Description'
					onChange={onChange}
				/>
				<TextArea
					name='text'
					label='Full text - not required'
					placeholder='Full tweet/task text'
					onChange={onChange}
				/>
				<Entities
					entities={formData.entities}
					addEntity={addEntity}
					removeEntity={removeEntity}
					onChange={onEntitychange}
				/>
				<Actions
					actions={formData.actions}
					addAction={addAction}
					removeAction={removeAction}
					onChange={onActionChange}
				/>
				<Input
					name='endTime'
					label='End date'
					type='datetime-local'
					onChange={onChange}
				/>
			</div>
			<div>
				<button className='btn btn-lg btn-secondary' onClick={addPost}>
					Add Post
				</button>
			</div>
		</div>
	);
};

export default AddPost;
