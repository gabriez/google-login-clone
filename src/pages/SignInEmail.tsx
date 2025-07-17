import googleLogo from "../assets/google-logo.png";
import TextField from "../components/TextField";
import TextButton from "../components/TextButton";
import FilledButton from "../components/FilledButton";
import Footer from "../components/Footer";

import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../context/LoginContext";

export default function SignInEmail() {
	const { email, handleChange } = useLoginContext();
	const navigate = useNavigate();

	const handleCreateAccount = (): void => {
		console.log("Create Account");
	};

	const handleSubmitClick = (): void => {
		console.log("Next");
		navigate("/password");
	};

	return (
		<section className="font-roboto h-screen bg-light-gray sm:flex sm:flex-col sm:justify-center sm:items-center dark:bg-darkBg">
			{/* Card */}
			<div className="h-full w-full bg-whiteBg p-6 flex flex-col justify-between sm:w-md sm:h-fit sm:rounded-3xl lg:rounded-3xl lg:p-10 lg:w-4xl xl:w-5xl dark:bg-dark-second dark:text-white">
				{/* Input Container*/}
				<div>
					<div>
						<img src={googleLogo} alt="Google Logo" className="h-10" />
					</div>

					<div className="lg:flex lg:gap-28">
						<div>
							<h3 className="mt-8 text-3xl md:text-4xl xl:text-5xl">
								Inicia sesión
							</h3>

							<p className="mt-5 mb-10 tracking-normal">
								con tu cuenta de Google. Esta cuenta estará disponible para
								otras aplicaciones de Google en el navegador.{" "}
							</p>
						</div>

						<div className="lg:mt-8">
							<TextField
								label="Correo electrónico o teléfono"
								name="email"
								value={email}
								onChange={handleChange}
							/>

							<button className="p-0.5 mt-2 text-sm text-blue-acc font-medium rounded-lg cursor-pointer hover:bg-blueBg dark:text-dark-blue dark:hover:bg-dark-hover">
								¿Has olvidado tu correo electrónico?{" "}
							</button>

							<p className="mt-10 text-sm text-black tracking-wide dark:text-white">
								¿No es tu ordenador? Usa el modo Invitado para iniciar sesión de
								forma privada.{" "}
								<span className="text-blue-acc font-medium cursor-pointer hover:underline dark:text-dark-blue">
									Más información sobre cómo usar el modo Invitado{" "}
								</span>
							</p>

							<div className="mt-10 flex justify-between lg:justify-end lg:gap-3">
								<TextButton
									label="Crear cuenta"
									onClick={handleCreateAccount}
								/>
								<FilledButton label="Siguiente" onClick={handleSubmitClick} />
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
