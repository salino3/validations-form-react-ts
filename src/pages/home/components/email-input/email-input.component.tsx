import React from 'react';
import { UserProps, startValidationColorProps } from '@/core';
import { isValidEmail } from '@/hooks';

interface Props {
  setUser: React.Dispatch<React.SetStateAction<UserProps>>;
  user: UserProps;
  setStartValidationColor: React.Dispatch<React.SetStateAction<startValidationColorProps>>;
  startValidationColor: startValidationColorProps;
  firstValueEmail: boolean;
};

export const EmailInput: React.FC<Props> = (props) => {
  const {
    user,
    setUser,
    firstValueEmail,
    startValidationColor,
    setStartValidationColor,
  } = props;

  const [isEmailValid, setIsEmailValid] = React.useState<boolean | null>();


  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, email: e.target.value.trim() });

    isValidEmail({
      user,
      startValidationColor,
      setStartValidationColor,
      setIsEmailValid,
    });
  };

  React.useEffect(() => {
    isValidEmail({
      user,
      startValidationColor,
      setStartValidationColor,
      setIsEmailValid,
    });
  }, [isEmailValid, user.email]);

  return (
    <>
      <input
        className={`${isEmailValid ? "valid" : ""}
           ${
             isEmailValid === false ||
             (startValidationColor.email && !isEmailValid) ||
             (user.email === "" && firstValueEmail)
               ? "invalid"
               : ""
           }`}
        value={user.email}
        onChange={handleEmail}
        type="text"
        placeholder="Email.. (NO space)"
      />
      <br />
      <div className="boxTxtError">
        <span className="errorText" hidden={isEmailValid || user.email === ""}>
          Invalid email address!
        </span>
        {user.email === "" && firstValueEmail && (
          <span className="errorText">You must refill this input</span>
        )}
      </div>
    </>
  );
}
