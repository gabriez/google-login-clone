import googleLogo from "../assets/google-logo.png";
import CheckBox from "../components/CheckBox";
import DropdownButton from "../components/DropdownButton";
import PasswordField from "../components/PasswordField";

import { useState } from "react";
import TextButton from "../components/TextButton";
import FilledButton from "../components/FilledButton";
import Footer from "../components/Footer";
import { useLoginContext } from "../context/LoginContext";

export default function SignInPassword() {
	const { password, email, handleChange, handleSubmit } = useLoginContext();

	const [isShowPassword, setIsShowPassword] = useState(false);

	const togglePassword = () => {
		setIsShowPassword((prev) => !prev);
	};

	return (
		<section className="h-screen font-roboto bg-light-gray sm:flex sm:flex-col sm:justify-center sm:items-center dark:bg-darkBg">
			{/* Card */}
			<div className="h-full w-full bg-whiteBg p-6 flex flex-col justify-between sm:w-md sm:h-fit sm:rounded-3xl lg:p-10 lg:w-4xl xl:w-5xl dark:bg-dark-second dark:text-white">
				{/* Input Container */}
				<div>
					{/* Logo */}
					<div>
						<img src={googleLogo} alt="Google Logo" className="h-10" />
					</div>

					<div className="lg:flex lg:gap-28 lg:justify-between">
						<div className="lg:w-full">
							<h3 className="mt-8 text-3xl md:text-4xl xl:text-5xl">
								Bienvenido
							</h3>

							<div className="mt-5 mb-10">
								<DropdownButton email={email} />
							</div>
						</div>

						<div className="lg:mt-8 lg:w-full">
							<p className="text-sm text-black font-roboto dark:text-white">
								Debes verificar que eres tú para poder continuar
							</p>

							<div className="mt-10">
								<PasswordField
									label="Introduce tu contraseña"
									value={password}
									onChange={handleChange}
									isShowPassword={isShowPassword}
								/>
							</div>

							<div className="mt-3 p-1">
								<CheckBox
									label="Mostrar contraseña"
									isChecked={isShowPassword}
									onChange={togglePassword}
								/>
							</div>

							<div className="mt-10 flex justify-between items-center lg:justify-end lg:gap-3">
								<TextButton
									label="¿Has olvidado tu contraseña?"
									onClick={() => console.log("¿Has olvidado tu contraseña?")}
								/>

								<FilledButton label="Siguiente" onClick={handleSubmit} />
							</div>
						</div>
					</div>
				</div>

				{/* Footer Container */}
				<div className="sm:hidden">
					<Footer />
				</div>
			</div>

			<div className="w-md mt-2 px-6 hidden sm:block lg:w-4xl xl:w-5xl">
				<Footer />
			</div>
		</section>
	);
}
