import useSWR from 'swr';
import { User } from '../entities.ts/User';
import axios from '../service/axios';

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);

export function useUser() {
	const { data: user, error, isLoading } = useSWR<User>(`/user`, fetcher);

	return {
		user,
		error,
		isLoading,
	};
}
