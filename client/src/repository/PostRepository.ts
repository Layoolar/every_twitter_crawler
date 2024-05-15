interface PostsRepository {
	getAllPosts(): Promise<[]>;
}

export default PostsRepository;
