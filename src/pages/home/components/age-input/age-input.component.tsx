import React from "react";
import { UserProps, startValidationColorProps } from "@/core";

interface Props {
  user: UserProps;
  setUser: (value: React.SetStateAction<UserProps>) => void;
  setFirstValueAge: (value: React.SetStateAction<boolean>) => void;
  isMajor: () => boolean;
  firstValueAge: boolean;
  startValidationColor: startValidationColorProps;
};

export const AgeInput: React.FC<Props> = (props) => {
  const {
    user,
    setUser,
    setFirstValueAge,
    isMajor,
    firstValueAge,
    startValidationColor,
  } = props;

  const handleAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, age: parseInt(e.target.value) });

    isMajor();
    setFirstValueAge(true);
  };

  React.useEffect(() => {
    isMajor();
  }, [user.age]);

  return (
    <>
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
    </>
  );
};
