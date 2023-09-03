import React from 'react';
import { useMediaQuery } from "react-responsive";
import { UserProps, startValidationColorProps } from "@/core";
import { isValidInput } from '@/hooks';
import { EmailInput, NameInput, SurnameInput, PasswordInput, ConfirmedPassword } from "../";
import './validation-form.styles.scss';

export const ValidationForm: React.FC = () => {

  const isMobile: boolean = useMediaQuery({ maxWidth: "725px" });


  const [startValidationColor, setStartValidationColor] =
    React.useState<startValidationColorProps>({
      name: false,
      surname: false,
      email: false,
      password: false,
      confirmPassword: false,
      age: false,
      sex: null,
      dev: null,
    });
  const [startValidation, setStartValidation] = React.useState(false);

  //
  const [firstValueEmail, setFirstValueEmail] = React.useState(false);
  const [firstValueName, setFirstValueName] = React.useState<boolean | null>(
    false
  );
  const [firstValueSurname, setFirstValueSurname] = React.useState<
    boolean | null
  >(false);
  const [firstValuePswStrong, setFirstValuePswStrong] = React.useState<
    boolean | null
  >(false);
  const [firstValueAge, setFirstValueAge] = React.useState(false);
  const [firstValueDev, setfirstValueDev] = React.useState<boolean | null>(
    null
  );

  //
  const [isEmailValid, setIsEmailValid] = React.useState<boolean | null>();
  const [isPasswordStrong, setIsPasswordStrong] = React.useState<
    boolean | null
  >();
  const [isConfirmedPassword, setIsConfirmedPassword] = React.useState<
    boolean | null
  >();

  const [user, setUser] = React.useState<UserProps>({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: null,
    sex: "",
    dev: "",
  });

  const [isMaleChecked, setIsMaleChecked] = React.useState(false);
  const [isFemaleChecked, setIsFemaleChecked] = React.useState(false);

  const onChangeSex = (sex: string) => {
    if (sex === "Male") {
      setUser({ ...user, sex: "Male" });
      setIsMaleChecked(true);
      setIsFemaleChecked(false);
      setStartValidationColor({ ...startValidationColor, sex: true });
    }
    if (sex === "Female") {
      setUser({ ...user, sex: "Female" });
      setIsMaleChecked(false);
      setIsFemaleChecked(true);
      setStartValidationColor({ ...startValidationColor, sex: true });
    }
  };

  const register = (event: any) => {
    event.preventDefault();
    setStartValidation(true);
    setStartValidationColor({
      name: true,
      surname: true,
      email: true,
      password: true,
      confirmPassword: true,
      age: true,
      sex: true,
      dev: true,
    });

    if (user.email === "") {
      setFirstValueEmail(true);
    }

    if (user.name === "") {
      setFirstValueName(true);
    }

    if (user.surname === "") {
      setFirstValueSurname(true);
    }

    if (user.age === null) {
      setFirstValueAge(true);
    }

    if (user.password === "") {
      setFirstValuePswStrong(true);
    }

    if (user.dev === "") {
      setfirstValueDev(false);
    }

    if (!startValidationColor.sex) {
      setStartValidationColor({ ...startValidationColor, sex: false });
    }

    if (
      isValidEmail() &&
      user.name &&
      user.surname &&
      isStrongPassword() &&
      isPasswordConfirmed() &&
      isMajor() &&
      user.sex &&
      user.dev
    ) {
      alert("Registering...");
      console.log(JSON.stringify(user, null, 2));
    } else {
      alert("Sorry, an error has occurred..");
      console.log(user);
    }

    setStartValidation(false);
  };

  // //
  // const isPasswordConfirmed = () => {
  //   if (user.confirmPassword !== "" && user.password !== user.confirmPassword) {
  //     setStartValidationColor({
  //       ...startValidationColor,
  //       confirmPassword: true,
  //     });
  //   }

  //   const bool = user.confirmPassword
  //     ? user.password === user.confirmPassword
  //     : null;
  //   setIsConfirmedPassword(bool);
  //   return bool;
  // };

  const isMajor = () => {
    if (user.age && user.age < 18) {
      const bool = user && user?.age && user?.age >= 18 ? true : null;
      setStartValidationColor({ ...startValidationColor, age: bool });
    }
    if (user.age >= 18) {
      setStartValidationColor({ ...startValidationColor, age: false });
    }
    return true;
  };
  // Handlers


  //
  const handleAge = (e: any) => {
    setUser({ ...user, age: parseInt(e.target.value) });

    isMajor();
    setFirstValueAge(true);
  };

  React.useEffect(() => {
    isMajor();
  }, [user.age]);
  
  //

  const handleDev = (e: any) => {
    setUser({ ...user, dev: e.target.value });
    console.log("handleDev", user.dev);
    setfirstValueDev(true);
  };
  React.useEffect(() => {
    if (user.dev !== "") {
      setStartValidationColor({ ...startValidationColor, dev: true });
    }
    if (user.dev === "" && firstValueDev) {
      setStartValidationColor({ ...startValidationColor, dev: false });
    }
    console.log("handleDev2", startValidationColor.dev);
  }, [isConfirmedPassword, user.dev]);

// Hooks
    const { isValidEmail, isStrongPassword, isPasswordConfirmed } =
      isValidInput({
        user,
        setStartValidationColor,
        startValidationColor,
        setIsEmailValid,
        setIsPasswordStrong,
        setIsConfirmedPassword,
      });


  return (
    <form className="myForm" onSubmit={register}>
      <EmailInput
        firstValueEmail={firstValueEmail}
        isEmailValid={isEmailValid}
        isValidEmail={isValidEmail}
        setUser={setUser}
        startValidationColor={startValidationColor}
        user={user}
      />
      <br />
    <NameInput
     firstValueName={firstValueName} 
     setFirstValueName={setFirstValueName}
     setStartValidationColor={setStartValidationColor}
     startValidationColor={startValidationColor}
     user={user}
     setUser={setUser}
     />
      <br />
      <SurnameInput
      firstValueSurname={firstValueSurname}
      setFirstValueSurname={setFirstValueSurname}
      setStartValidationColor={setStartValidationColor}
      setUser={setUser}
      startValidationColor={startValidationColor}
      user={user}
      />
      <br />
    <PasswordInput
     firstValuePswStrong={firstValuePswStrong}
     isPasswordStrong={isPasswordStrong}
     isStrongPassword={isStrongPassword}
     setUser={setUser}
     startValidationColor={startValidationColor}
     user={user}
     />
      <br />
      <ConfirmedPassword
      isConfirmedPassword={isConfirmedPassword}
      isPasswordConfirmed={isPasswordConfirmed}
      isStrongPassword={isStrongPassword}
      setUser={setUser}
      startValidationColor={startValidationColor}
      user={user}
      />
      <br />
      <input
        className={
          (firstValueAge &&
            (user.age < 18 || startValidationColor.age === null)) ||
          isNaN(user.age) ||
          (user.age === null && firstValueAge)
            ? "invalid invalidPseudoClass"
            : user && user?.age && user?.age >= 18
            ? "valid validPseudoClass"
            : ""
        }
        value={user.age || ""}
        onChange={handleAge}
        type="number"
        min="0"
        placeholder="Age.."
      />
      <br />
      <div className="boxTxtError">
        <span
          className="errorText"
          hidden={
            (user.age !== null && user.age >= 18) ||
            (isNaN(user.age) && firstValueAge) ||
            user.age === null
          }
        >
          You must be Major!
        </span>
        {(user.age === null && firstValueAge) || isNaN(user.age) ? (
          <span className="errorText">You must refill this input</span>
        ) : (
          ""
        )}
      </div>
      <br />
      <div className="boxDev">
        <label htmlFor="dev">What developer are you?</label> &nbsp;
        {isMobile && <br />}
        <select
          className={` ${
            startValidationColor.dev === true
              ? "validPadding"
              : startValidationColor.dev === false
              ? "invalidPadding"
              : ""
          } ${firstValueDev === false ? "invalidPadding" : ""} `}
          value={user.dev}
          id="dev"
          onChange={handleDev}
        >
          <option value="">..</option>
          <option value="Front-end">Front-end</option>
          <option value="Back-end">Back-end</option>
          <option value="DevOps">DevOps</option>
        </select>
      </div>
      <br />
      <div className="inputsCheckBox">
        <label>Your sex:</label> {!isMobile && <> &nbsp; &nbsp; </>}
        <div
          className={`${
            startValidationColor.sex
              ? "valid"
              : startValidationColor.sex === false
              ? "invalid"
              : ""
          } `}
        >
          <label htmlFor="Male">Male</label>
          <input
            checked={isMaleChecked}
            id="Male"
            type="checkbox"
            onChange={() => onChangeSex("Male")}
          />
          &nbsp;
          <label htmlFor="Female">Female</label>
          <input
            checked={isFemaleChecked}
            type="checkbox"
            onChange={() => onChangeSex("Female")}
          />
        </div>
      </div>
      <br />
      <button type="submit" disabled={startValidation}>
        Register
      </button>
    </form>
  );
}
