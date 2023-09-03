import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { UserProps, startValidationColorProps } from '@/core';

interface Props {
  user: UserProps;
  startValidationColor: startValidationColorProps;
  setUser: (value: React.SetStateAction<UserProps>) => void;
   setStartValidationColor: (value: React.SetStateAction<startValidationColorProps>) => void
};

export const SexInput: React.FC<Props> = (props) => {
    const {startValidationColor, user, setUser, setStartValidationColor} = props;

    const isMobile: boolean = useMediaQuery({ maxWidth: "725px" });

    
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

  return (
    <>
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
          <label htmlFor="Female">Female</label>
          <input
            checked={isFemaleChecked}
            type="checkbox"
            onChange={() => onChangeSex("Female")}
          /> 
           &nbsp;
          <label htmlFor="Male">Male</label>
          <input
            checked={isMaleChecked}
            id="Male"
            type="checkbox"
            onChange={() => onChangeSex("Male")}
          />
        </div>
      </div>
    </>
  );
}
