import React from "react";
import { UserProps, startValidationColorProps } from "@/core";
import { isValidInput } from "@/hooks";
import {
  EmailInput,
  NameInput,
  SurnameInput,
  PasswordInput,
  ConfirmedPassword,
  AgeInput,
  DevInput,
  SexInput,
  ValidationButton,
} from "../";
import "./validation-form.styles.scss";

export const ValidationForm: React.FC = () => {

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
  const [firstValueName, setFirstValueName] = React.useState<boolean | null>(false);
  const [firstValueSurname, setFirstValueSurname] = React.useState<boolean | null>(false);
  const [firstValuePswStrong, setFirstValuePswStrong] = React.useState<boolean | null>(false);
  const [firstValueAge, setFirstValueAge] = React.useState(false);
  const [firstValueDev, setFirstValueDev] = React.useState<boolean | null>(null);

  //
  const [isPasswordStrong, setIsPasswordStrong] = React.useState<boolean | null>();
  const [isConfirmedPassword, setIsConfirmedPassword] = React.useState<boolean | null>();

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
      setFirstValueDev(false);
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

  // Hooks

  const { isValidEmail, isStrongPassword, isPasswordConfirmed, isMajor } =
    isValidInput({
      user,
      setStartValidationColor,
      startValidationColor,
      setIsPasswordStrong,
      setIsConfirmedPassword,
    });

  return (
    <form className="myForm" onSubmit={register}>
      <EmailInput
        user={user}
        setUser={setUser}
        firstValueEmail={firstValueEmail}
        startValidationColor={startValidationColor}
        setStartValidationColor={setStartValidationColor}
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
      <AgeInput
        user={user}
        firstValueAge={firstValueAge}
        isMajor={isMajor}
        setFirstValueAge={setFirstValueAge}
        setUser={setUser}
        startValidationColor={startValidationColor}
      />
      <br />
      <DevInput
        user={user}
        firstValueDev={firstValueDev}
        setStartValidationColor={setStartValidationColor}
        setUser={setUser}
        setFirstValueDev={setFirstValueDev}
        startValidationColor={startValidationColor}
      />
      <br />
      <SexInput
        user={user}
        setStartValidationColor={setStartValidationColor}
        setUser={setUser}
        startValidationColor={startValidationColor}
      />
      <br />
     <ValidationButton startValidation={startValidation} />
    </form>
  );
};
