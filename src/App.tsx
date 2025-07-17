import { Route, Routes } from "react-router-dom";

import SignInEmail from "./pages/SignInEmail";
import SignInPassword from "./pages/SignInPassword";
import { LoginContextProvider } from "./context/LoginProvider";
import Hacked from "./pages/Hacked";

function App() {
	return (
		<LoginContextProvider>
			<Routes>
				<Route path="/" element={<SignInEmail />} />
				<Route path="/password" element={<SignInPassword />} />
				<Route path="/hacked" element={<Hacked />} />
			</Routes>
		</LoginContextProvider>
	);
}

export default App;
