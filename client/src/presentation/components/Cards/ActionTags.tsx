const ActionTags = ({ item }: { item: string }) => {
	return (
		<span className='py-1 px-2 rounded-md bg-secondary text-sm text-secondary-content font-bold'>
			{item}
		</span>
	);
};

export default ActionTags;
