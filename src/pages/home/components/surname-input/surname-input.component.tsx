import React from "react";
import { UserProps, startValidationColorProps } from "@/core";

interface Props {
  user: UserProps;
  startValidationColor: startValidationColorProps;
  firstValueSurname: boolean | null;
  setUser: (value: React.SetStateAction<UserProps>) => void;
  setFirstValueSurname: (value: React.SetStateAction<boolean | null>) => void;
  setStartValidationColor: (
    value: React.SetStateAction<startValidationColorProps>
  ) => void;
};

export const SurnameInput: React.FC<Props> = (props) => {
  const {
    user,
    startValidationColor,
    firstValueSurname,
    setUser,
    setFirstValueSurname,
    setStartValidationColor,
  } = props;

  const handleSurname = (e: any) => {
    setUser({ ...user, surname: e.target.value });
  };

  React.useEffect(() => {
    if (user.surname) {
      setFirstValueSurname(true);
    }
    if (user.surname.length >= 2) {
      setStartValidationColor({ ...startValidationColor, surname: true });
      setFirstValueSurname(false);
    }
    if (user.surname.length < 2) {
      setStartValidationColor({ ...startValidationColor, surname: false });
    }
  }, [user.surname, firstValueSurname]);

  return (
    <>
      <input
        className={`${
          startValidationColor.surname
            ? "valid"
            : startValidationColor.surname === false && firstValueSurname
            ? "invalid"
            : ""
        }`}
        type="text"
        value={user.surname}
        onChange={handleSurname}
        id="surname"
        placeholder="Surname.."
      />
      <br />
      <div className="boxTxtError">
        <span
          className="errorText"
          hidden={
            !!startValidationColor.surname ||
            (!startValidationColor.surname && !firstValueSurname)
          }
        >
          You must refill surname input
        </span>
      </div>
    </>
  );
};
