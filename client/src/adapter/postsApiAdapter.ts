import useSWR from 'swr';
import { Post } from '../entities.ts/Post';
import axios from '../service/axios';

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data.data);

export function usePosts() {
	const { data: posts, error, isLoading } = useSWR<Post[]>(`/post/all`, fetcher);

	return {
		posts,
		error,
		isLoading,
	};
}
