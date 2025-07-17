import { useState, type ReactNode } from "react";
import { LoginContext } from "./LoginContext";

export const LoginContextProvider = ({ children }: { children: ReactNode }) => {
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
	console.log(login);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		try {
			console.log("Login submitted", login);
			// Add your authentication logic here

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Handle successful login
			console.log("Login successful!");
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
