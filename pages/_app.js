import MainLayout from '../components/MainLayout';
import '../styles/globals.css';
import UserContext from '../components/context/userContext';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Slide, ToastContainer } from 'react-toastify';
import Login from '../components/pages/login';
import Axios from '../utils/axios';

const MyApp = ({ Component, pageProps }) => {
	const axiosObj = Axios();

	console.log({ axiosObj });

	const { user } = axiosObj;

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
