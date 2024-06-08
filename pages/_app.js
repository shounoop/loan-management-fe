import MainLayout from '../components/MainLayout';
import '../styles/globals.css';
import UserContext from '../context/userContext';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Slide, ToastContainer } from 'react-toastify';
import Login from '../components/Login';
import useAxios from '../utils/axios';
import '/styles/Home.module.css';

const MyApp = ({ Component, pageProps }) => {
	const { user } = useAxios();

	if (typeof window !== 'undefined') {
		if (!user) {
			return (
				<>
					<Login />

					<ToastContainer
						position="top-right"
						autoClose={3000}
						hideProgressBar={false}
						newestOnTop={false}
						draggable={false}
						closeOnClick
						pauseOnHover
						transition={Slide}
					/>
				</>
			);
		}
	}

	return (
		<UserContext.Provider>
			<MainLayout>
				<Component {...pageProps} />

				<ToastContainer
					position="top-right"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					draggable={false}
					closeOnClick
					pauseOnHover
					transition={Slide}
				/>
			</MainLayout>
		</UserContext.Provider>
	);
};
export default MyApp;
