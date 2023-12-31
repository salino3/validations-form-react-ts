import { UserProps, startValidationColorProps } from "@/core";
import React from "react";

interface Props {
  user: UserProps;
  startValidationColor: startValidationColorProps;
  setStartValidationColor: (value: React.SetStateAction<startValidationColorProps>) => void;
  setIsPasswordStrong: (value: React.SetStateAction<boolean | null | undefined>) => void;
  setIsConfirmedPassword: React.Dispatch<React.SetStateAction<boolean | null | undefined>>
};

export const isValidInput = ({
  user,
  setStartValidationColor,
  startValidationColor,
  setIsPasswordStrong,
  setIsConfirmedPassword,
}: Props) => {
  //
  const isValidEmail = () => {

    if (user.email !== "") {
      setStartValidationColor({ ...startValidationColor, email: true });
    };

    const isValid = user.email
      ? //# ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)
        // (Ñ)
        /^[\w+\-._]+@[a-zA-ZñÑáéíóúÁÉÍÓÚ]+\.[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,}$/.test(
          user.email
        )
      : null;

    return isValid;
  };
  //
  const isStrongPassword = () => {
    if (user.password !== "") {
      setStartValidationColor({ ...startValidationColor, password: true });
    };

    const isValid = user.password
      ? //# ? /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9\d])(?=.*\d).{8,}/.test(user.password)
        // (Ñ)
        /^(?=.*[a-zA-ZñÑáéíóúÁÉÍÓÚ])(?=.*[0-9])(?=.*[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9]).{8,}$/.test(
          user.password
        )
      : null;
    setIsPasswordStrong(isValid);
    return isValid;
  };
  //
  const isPasswordConfirmed = () => {
    if (user.confirmPassword !== "" && user.password !== user.confirmPassword) {
      setStartValidationColor({
        ...startValidationColor,
        confirmPassword: true,
      });
    };
    const bool = user.confirmPassword
      ? user.password === user.confirmPassword
      : null;
    setIsConfirmedPassword(bool);
    return bool;
  };
//
      const isMajor = () => {
        if (user.age && user.age < 18) {
          const bool = user && user?.age && user?.age >= 18 ? true : null;
          setStartValidationColor({ ...startValidationColor, age: bool });
        };
        if (user.age >= 18) {
          setStartValidationColor({ ...startValidationColor, age: false });
        };
        return true;
      };


  return {
    isValidEmail,
    isStrongPassword,
    isPasswordConfirmed,
    isMajor
  };
};

 
