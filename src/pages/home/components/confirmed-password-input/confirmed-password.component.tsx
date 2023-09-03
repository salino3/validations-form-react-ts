import React from "react";
import { UserProps, startValidationColorProps } from "@/core";

interface Props {
  user: UserProps;
  isConfirmedPassword: boolean | null | undefined;
  startValidationColor: startValidationColorProps;
  setUser: (value: React.SetStateAction<UserProps>) => void;
  isStrongPassword: () => boolean | null;
  isPasswordConfirmed: () => boolean | null;
};

export const ConfirmedPassword: React.FC<Props> = (props) => {
  const {
    user,
    isConfirmedPassword,
    startValidationColor,
    setUser,
    isStrongPassword,
    isPasswordConfirmed,
  } = props;

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, confirmPassword: e.target.value.trim() });

    isStrongPassword();
  };

  React.useEffect(() => {
    isPasswordConfirmed();
  }, [isConfirmedPassword, user.confirmPassword]);

  return (
    <>
      <input
        className={
          user.password !== user.confirmPassword
            ? "passwordNotConfirmed"
            : isConfirmedPassword === true
            ? "valid"
            : isConfirmedPassword === false ||
              (startValidationColor.confirmPassword && !isConfirmedPassword)
            ? "invalid"
            : ""
        }
        value={user.confirmPassword}
        onChange={handleConfirmPassword}
        type="password"
        placeholder="Confirm password"
      />
      <br />
      <div className="boxTxtError">
        <span className="errorText">
          {(user.password !== user.confirmPassword &&
            user.confirmPassword !== "" &&
            "Repeat password!") ||
            (user.confirmPassword !== "" &&
              !isConfirmedPassword &&
              "Repeat password!")}
        </span>
      </div>
    </>
  );
};
