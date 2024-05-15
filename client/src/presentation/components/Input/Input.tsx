enum Variant {
	xs = 'xs',
	sm = 'sm',
	md = 'md',
	lg = 'lg',
}

const VariantMaps: Record<Variant, string> = {
	[Variant.xs]: 'input-xs',
	[Variant.sm]: 'input-sm',
	[Variant.md]: 'input-md',
	[Variant.lg]: 'input-lg',
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	variant?: Variant;
};

const Input = ({
	label,
	variant = Variant.md,
	type = 'text',
	placeholder,
	onChange,
	value,
	...props
}: InputProps) => {
	return (
		<label className={`form-control w-full max-w-xs`}>
			{label && (
				<div className='label'>
					<span className='label-text'>{label}</span>
				</div>
			)}
			<input
				type={type}
				className={`input input-bordered w-full max-w-xs grow ${VariantMaps[variant]}`}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				required={true}
				{...props}
			/>
		</label>
	);
};

Input.variant = Variant;

export default Input;
