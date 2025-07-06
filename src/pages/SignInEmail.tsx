import { useState } from "react";
import googleLogo from "../assets/google-logo.png";
import TextField from "../components/TextField";
import TextButton from "../components/TextButton";
import FilledButton from "../components/FilledButton";
import Footer from "../components/Footer";

export default function SignInEmail() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (value: string): void => {
    setEmail(value);
  }

  const handleCreateAccount = ():void => {
    console.log("Create Account");
  }

  const handleSubmitClick = ():void => {
    console.log("Next");
  }

  return (
    <section className="font-roboto h-screen bg-light-gray">
      {/* Card */}
      <div className="h-full w-full bg-whiteBg p-6 flex flex-col justify-between">
        {/* Input Container*/}
        <div> 
          <img src={googleLogo} alt="Google Logo" className="h-10" />

          <h3 className="mt-8 text-3xl">
            Sign in
          </h3>

          <p className="mt-5 mb-10 tracking-normal">
            with your Google Account. This account will be available to other Google apps in the browser.
          </p>

          <TextField label="Email or phone" value={email} onChange={handleEmailChange} />

          <button className="p-0.5 mt-2 text-sm text-blue-acc font-medium rounded-lg cursor-pointer hover:bg-blueBg">
            Forgot email?
          </button>

          <p className="mt-10 text-sm text-black tracking-wide">
            Not your computer? Use Private Browsing windows to sign in. <span className="text-blue-acc font-medium cursor-pointer hover:underline">
              Learn more about using Guest mode
            </span>
          </p>

          <div className="mt-10 flex justify-between">
            <TextButton label="Create account" onClick={handleCreateAccount} />
            <FilledButton label="Next" onClick={handleSubmitClick}/>
          </div>
        </div>

        {/* Footer Container */}
        <Footer />
      </div>
    </section>
  )
}