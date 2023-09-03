import React from "react";
import { UserProps, startValidationColorProps } from "@/core";

interface Props {
  user: UserProps;
  startValidationColor: startValidationColorProps;
  firstValueName: boolean | null;
  setUser: (value: React.SetStateAction<UserProps>) => void;
  setFirstValueName: (value: React.SetStateAction<boolean | null>) => void;
  setStartValidationColor: (
    value: React.SetStateAction<startValidationColorProps>
  ) => void;
}

export const NameInput: React.FC<Props> = (props) => {
  const {
    user,
    startValidationColor,
    firstValueName,
    setUser,
    setFirstValueName,
    setStartValidationColor,
  } = props;

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, name: e.target.value });
  };

  React.useEffect(() => {
    if (user.name) {
      setFirstValueName(true);
    }
    if (user.name.length >= 2) {
      setStartValidationColor({ ...startValidationColor, name: true });
      setFirstValueName(false);
    }
    if (user.name.length < 2) {
      setStartValidationColor({ ...startValidationColor, name: false });
    }
  }, [user.name, firstValueName]);

  return (
    <>
      <input
        className={`${
          startValidationColor.name
            ? "valid"
            : startValidationColor.name === false && firstValueName
            ? "invalid"
            : ""
        }`}
        type="text"
        value={user.name}
        onChange={handleName}
        id="name"
        placeholder="Name.."
      />
      <br />
      <div className="boxTxtError">
        <span
          className="errorText"
          hidden={
            !!startValidationColor.name ||
            (!startValidationColor.name && !firstValueName)
          }
        >
          You must refill name input
        </span>
      </div>
    </>
  );
};
