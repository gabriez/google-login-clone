import googleLogo from "../assets/google-logo.png";
import TextField from "../components/TextField";
import TextButton from "../components/TextButton";
import FilledButton from "../components/FilledButton";
import Footer from "../components/Footer";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignInEmail() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (value: string): void => {
    setEmail(value);
  }

  const handleCreateAccount = ():void => {
    console.log("Create Account");
  }

  const handleSubmitClick = ():void => {
    console.log("Next");
    navigate("/password");
  }

  return (
    <section className="font-roboto h-screen bg-light-gray sm:flex sm:flex-col sm:justify-center sm:items-center">
      {/* Card */}
      <div className="h-full w-full bg-whiteBg p-6 flex flex-col justify-between sm:w-md sm:h-fit sm:rounded-3xl lg:rounded-3xl lg:p-10 lg:w-4xl xl:w-5xl">
        {/* Input Container*/}
        <div>
          <div>
            <img src={googleLogo} alt="Google Logo" className="h-10" /> 
          </div>

          <div className="lg:flex lg:gap-28">
            <div>
              <h3 className="mt-8 text-3xl md:text-4xl xl:text-5xl">
                Sign in
              </h3>

              <p className="mt-5 mb-10 tracking-normal">
                with your Google Account. This account will be available to other Google apps in the browser.
              </p>
            </div>

            <div className="lg:mt-8">
              <TextField label="Email or phone" value={email} onChange={handleEmailChange} />

              <button className="p-0.5 mt-2 text-sm text-blue-acc font-medium rounded-lg cursor-pointer hover:bg-blueBg">
                Forgot email?
              </button>

              <p className="mt-10 text-sm text-black tracking-wide">
                Not your computer? Use Private Browsing windows to sign in. <span className="text-blue-acc font-medium cursor-pointer hover:underline">
                  Learn more about using Guest mode
                </span>
              </p>

              <div className="mt-10 flex justify-between lg:justify-end lg:gap-3">
                <TextButton label="Create account" onClick={handleCreateAccount} />
                <FilledButton label="Next" onClick={handleSubmitClick}/>
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
  )
}