import { createContext, useContext } from "react";

export interface LoginContextType {
	email: string;
	password: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	loading: boolean;
}

export const LoginContext = createContext<LoginContextType | undefined>(
	undefined
);

// Custom hook to use the context
export const useLoginContext = () => {
	const context = useContext(LoginContext);
	if (context === undefined) {
		throw new Error("useLogin must be used within a LoginContextProvider");
	}
	return context;
};
