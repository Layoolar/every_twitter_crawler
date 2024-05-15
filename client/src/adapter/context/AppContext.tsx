import { PropsWithChildren, createContext, useMemo } from 'react';
import { Post } from '../../entities.ts/Post';
import { User } from '../../entities.ts/User';
import { usePosts } from '../postsApiAdapter';
import { useUser } from '../userApiAdapter';

interface AppContextData {
	posts: Post[];
	user: User | null;
	isLoading: boolean;
	error: Error | null;
}

const AppContext = createContext({} as AppContextData);

const AppProvider = ({ children }: PropsWithChildren) => {
	const { posts, error: postError, isLoading: postsLoading } = usePosts();
	const { user, error: userError, isLoading: userLoading } = useUser();

	const value: AppContextData = useMemo(
		() => ({
			posts: posts ?? [],
			user: user ?? null,
			isLoading: postsLoading || userLoading,
			error: postError ?? userError ?? null,
		}),
		[posts, user, postsLoading, userLoading, postError, userError]
	);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
