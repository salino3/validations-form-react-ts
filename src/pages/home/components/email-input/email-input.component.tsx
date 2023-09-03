import React from 'react';
import { UserProps, startValidationColorProps } from '@/core';

interface Props {
  setUser: React.Dispatch<React.SetStateAction<UserProps>>;
  user: UserProps;
  startValidationColor: startValidationColorProps;
  isValidEmail: () => boolean | null;
  isEmailValid: boolean | null | undefined;
  firstValueEmail: boolean;
};

export const EmailInput: React.FC<Props> = (props) => {
    const {
      setUser,
      user,
      isValidEmail,
      isEmailValid,
      startValidationColor,
      firstValueEmail,
    } = props;

     const handleEmail = (e: any) => {
       setUser({ ...user, email: e.target.value });

       isValidEmail();
     };

     React.useEffect(() => {
       isValidEmail();
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
        placeholder="Email.."
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
