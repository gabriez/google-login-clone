
import googleLogo from "../assets/google-logo.png";
import CheckBox from "../components/CheckBox";
import DropdownButton from "../components/DropdownButton";
import PasswordField from "../components/PasswordField";

import { useState } from "react";
import TextButton from "../components/TextButton";
import FilledButton from "../components/FilledButton";
import Footer from "../components/Footer";

export default function SignInPassword() {
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handlePasswordChange = (value: string): void => {
    setPassword(value);
  };

  const togglePassword = () => {
    setIsShowPassword(prev => !prev);
  }

  const handleSubmitClick = () => {
    console.log("Submitted");
  }
  
  return (
    <section className="h-screen font-roboto bg-light-gray sm:flex sm:flex-col sm:justify-center sm:items-center dark:bg-darkBg">
      {/* Card */}
      <div className="h-full w-full bg-whiteBg p-6 flex flex-col justify-between sm:w-md sm:h-fit sm:rounded-3xl lg:p-10 lg:w-4xl xl:w-5xl dark:bg-dark-second dark:text-white">
        {/* Input Container */}
        <div>
          {/* Logo */}
          <div>
            <img 
              src={googleLogo} 
              alt="Google Logo"
              className="h-10"
            />
          </div>

          <div className="lg:flex lg:gap-28 lg:justify-between">
            <div className="lg:w-full">
              <h3 className="mt-8 text-3xl md:text-4xl xl:text-5xl">
                Welcome
              </h3>

              <div className="mt-5 mb-10">
                <DropdownButton email="vincenzocassano0721@gmail.com" />
              </div>
            </div>

            <div className="lg:mt-8 lg:w-full">
              <p className="text-sm text-black font-roboto dark:text-white">
                To continue, first verify it's you
              </p>

              <div className="mt-10">
                <PasswordField label="Enter your password" value={password} onChange={handlePasswordChange} isShowPassword={isShowPassword}/>
              </div>

              <div className="mt-3 p-1">
                <CheckBox label="Show password" isChecked={isShowPassword} onChange={togglePassword} />
              </div>

              <div className="mt-10 flex justify-between items-center lg:justify-end lg:gap-3">
                <TextButton 
                  label="Try another way"
                  onClick={() => console.log("Try another way")} 
                />

                <FilledButton 
                  label="Next"
                  onClick={handleSubmitClick}/>
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