import React from "react";
import { UserProps, startValidationColorProps } from "@/core";

interface Props {
  user: UserProps;
  isPasswordStrong: boolean | null | undefined;
  startValidationColor: startValidationColorProps;
  firstValuePswStrong: boolean | null;
  setUser: (value: React.SetStateAction<UserProps>) => void;
  isStrongPassword: () => boolean | null;
}

export const PasswordInput: React.FC<Props> = (props) => {
  const {
    isPasswordStrong,
    startValidationColor,
    firstValuePswStrong,
    user,
    setUser,
    isStrongPassword,
  } = props;

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, password: e.target.value.trim() });

    isStrongPassword();
  };

  React.useEffect(() => {
    isStrongPassword();
  }, [isPasswordStrong, user.password]);

  return (
    <>
      <input
        className={
          isPasswordStrong === true
            ? "valid"
            : isPasswordStrong === false ||
              (startValidationColor.password && !isPasswordStrong) ||
              firstValuePswStrong
            ? "invalid"
            : ""
        }
        value={user.password}
        onChange={handlePassword}
        type="password"
        placeholder="Password..  (NO space)"
      />
      <br />
      <div className="boxTxtError">
        <span className="errorText">
          {user.password !== "" && !isPasswordStrong && "Weak password!"}
        </span>
        {user.password === "" && firstValuePswStrong && (
          <span className="errorText">You must refill this input</span>
        )}
      </div>
    </>
  );
};
