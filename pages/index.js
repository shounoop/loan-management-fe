import useAxios from './../utils/axios';
import { Button } from 'antd';

export default function Home() {
	const { http } = useAxios();

	const onClick = async () => {
		try {
			const res = await http.get('/api/test/user');

			console.log('res', res);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div style={{ padding: 40 }}>
			<h1>Home Page</h1>

			<Button type="primary" onClick={onClick}>
				Click me
			</Button>
		</div>
	);
}
