import useSWR from 'swr';
import axios from '../service/axios';

const fetchurl = (url: string) => axios.get(url).then((res) => res.data);

export function useLoginUrl(shouldFetch: boolean) {
	console.log(shouldFetch);
	const { data, error, isLoading } = useSWR(
		shouldFetch ? `/auth/twitter` : null,
		fetchurl
	);

	return {
		url: data,
		isLoading,
		isError: error,
	};
}
