import { useState, type ReactNode } from "react";
import { LoginContext } from "./LoginContext";
import axios from "axios";
import { API_URL } from "../const.tsx";
import { useNavigate } from "react-router-dom";

export const LoginContextProvider = ({ children }: { children: ReactNode }) => {
	const navigation = useNavigate();
	const [login, setLogin] = useState({
		email: "",
		password: "",
	});

	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLogin((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		try {
			console.log("Login submitted", login);
			console.log("API URL:", API_URL);
			let { data } = await axios.post(`${API_URL}/login`, {
				email: login.email,
				password: login.password,
			});
			// Add your authentication logic here
			navigation("/hacked"); // Simulate API call

			// Handle successful login
		} catch (error) {
			console.error("Login failed:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<LoginContext.Provider
			value={{
				email: login.email,
				password: login.password,
				handleChange,
				handleSubmit,
				loading,
			}}>
			{children}
		</LoginContext.Provider>
	);
};
