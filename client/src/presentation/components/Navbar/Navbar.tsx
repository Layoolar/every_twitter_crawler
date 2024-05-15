import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../adapter/context/AppContext';
import { Permission } from '../../../entities.ts/User';

const Navbar = () => {
	const { user } = useContext(AppContext);
	return (
		<div className='navbar w-full h-20 sticky top-0 bg-base-100 border-b z-50 border-text-700'>
			<div className='flex-1'>
				<a href='/' className='btn btn-ghost text-xl text-primary'>
					twitterCRAWL
				</a>
			</div>
			<div className='flex-none gap-2'>
				<div className='dropdown dropdown-end'>
					<button tabIndex={0} className='btn btn-ghost btn-circle avatar'>
						<div className='w-10 rounded-full'>
							<img
								alt={user?.twitter?.username}
								src={user?.twitter?.profile_image_url}
							/>
						</div>
					</button>
					<ul
						// tabIndex={0}
						className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'
					>
						<li>
							<Link to='/profile'>
								Profile <span className='badge'>New</span>
							</Link>
						</li>
						<li>
							{user?.permission === Permission.ADMIN && (
								<Link to='/add'>Add Post</Link>
							)}
						</li>
						<li>
							<a href='/'>Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
