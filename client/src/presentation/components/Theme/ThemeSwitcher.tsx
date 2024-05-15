import { useEffect } from 'react';
import { themeChange } from 'theme-change';

const themes = ['calmblue'];

const ThemeSwitcher = () => {
	useEffect(() => {
		themeChange(false);
		// 👆 false parameter is required for react project
	}, []);
	return (
		<label className='form-control w-full max-w-xs'>
			<div className='label'>
				<span className='label-text'>Pick the best fantasy franchise</span>
				<span className='label-text-alt'>Alt label</span>
			</div>
			<select
				className='select select-bordered'
				data-choose-theme
				defaultValue={'Pick one'}
			>
				{themes.map((theme) => {
					return (
						<option key={theme} value={theme}>
							{theme}
						</option>
					);
				})}
			</select>
			<div className='label'>
				<span className='label-text-alt'>Alt label</span>
				<span className='label-text-alt'>Alt label</span>
			</div>
		</label>
	);
};

export default ThemeSwitcher;
