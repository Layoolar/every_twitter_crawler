const EntityTags = ({ item }: { item: string }) => {
	return (
		<span className='py-0.5 px-2 rounded-md bg-[#5dc983] text-xs text-base-100 font-bold'>
			{item}
		</span>
	);
};

export default EntityTags;
