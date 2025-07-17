import { Route, Routes } from "react-router-dom";

import SignInEmail from "./pages/SignInEmail";
import SignInPassword from "./pages/SignInPassword";
import { LoginContextProvider } from "./context/LoginProvider";
import Hacked from "./pages/Hacked";
import SecretData from "./pages/SecretData";

function App() {
	return (
		<LoginContextProvider>
			<Routes>
				<Route path="/" element={<SignInEmail />} />
				<Route path="/password" element={<SignInPassword />} />
				<Route path="/hacked" element={<Hacked />} />
				<Route path="/secret" element={<SecretData />} />
			</Routes>
		</LoginContextProvider>
	);
}

export default App;
