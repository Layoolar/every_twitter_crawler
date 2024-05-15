import React from 'react';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
	label?: string;
};

const TextArea = ({
	label,
	className = '',
	onChange,
	value,
	placeholder,
	...props
}: TextAreaProps) => {
	return (
		<label className={`form-control ${className}`}>
			<div className='label'>
				<span className='label-text'>{label}</span>
			</div>
			<textarea
				className='textarea textarea-bordered h-24'
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				{...props}
			></textarea>
		</label>
	);
};

export default TextArea;
