import React, { Component, PropsWithChildren } from 'react';

interface ErrorBoundaryState extends PropsWithChildren {
	hasError: boolean;
	error: Error | null;
	info: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
	constructor(props: PropsWithChildren) {
		super(props);
		this.state = { hasError: false, error: null, info: null };
	}

	componentDidCatch(error: Error, info: React.ErrorInfo) {
		this.setState({
			hasError: true,
			error: error,
			info: info,
		});
		console.error(
			'Error caught in ErrorBoundary:',
			error,
			info && info.componentStack
		);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className='min-h-screen w-full flex items-center justify-center border'>
					<div className='h-3/4 w-3/4 m-auto rounded-lg p-8 bg-black text-white'>
						<h2 className='text-2xl font-bold text-red-500 mb-4'>
							Something went wrong.
						</h2>
						<details className='mb-4'>
							<summary className='cursor-pointer'>Error details:</summary>
							<div className='whitespace-pre-wrap'>
								<div>
									<strong className='font-bold'>Error:</strong>{' '}
									{this.state.error && this.state.error.toString()}
								</div>
								<div>
									<strong className='font-bold'>Component Stack:</strong>{' '}
									{this.state.info && this.state.info.componentStack}
								</div>
							</div>
						</details>
					</div>
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
