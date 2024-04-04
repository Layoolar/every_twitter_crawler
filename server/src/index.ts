import express from 'express';
import dotenv from 'dotenv';

// Loading environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('Hello, TypeScript Express Server!');
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
