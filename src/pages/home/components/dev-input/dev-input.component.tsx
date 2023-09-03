import React from "react";
import { useMediaQuery } from "react-responsive";
import { UserProps, startValidationColorProps } from "@/core";

interface Props {
  user: UserProps;
  setUser: (value: React.SetStateAction<UserProps>) => void;
  setFirstValueDev: (value: React.SetStateAction<boolean | null>) => void;
  setStartValidationColor: (value: React.SetStateAction<startValidationColorProps>) => void;
  startValidationColor: startValidationColorProps;
  firstValueDev: boolean | null;
};

export const DevInput: React.FC<Props> = (props) => {
  const {
    user,
    setUser,
    setFirstValueDev,
    setStartValidationColor,
    startValidationColor,
    firstValueDev,
  } = props;

  const isMobile: boolean = useMediaQuery({ maxWidth: "725px" });

  const handleDev = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser({ ...user, dev: e.target.value });
    setFirstValueDev(true);
  };

  React.useEffect(() => {
    if (user.dev !== "") {
      setStartValidationColor({ ...startValidationColor, dev: true });
    }
    if (user.dev === "" && firstValueDev) {
      setStartValidationColor({ ...startValidationColor, dev: false });
    }
  }, [user.dev]);

  return (
    <>
      <div className="boxDev">
        <label htmlFor="dev">What developer are you?</label> &nbsp;
        {isMobile && <br />}
        <select
          className={` ${
            startValidationColor.dev === true
              ? "validPadding"
              : startValidationColor.dev === false
              ? "invalidPadding"
              : ""
          } ${firstValueDev === false ? "invalidPadding" : ""} `}
          value={user.dev}
          id="dev"
          onChange={handleDev}
        >
          <option value="">..</option>
          <option value="Front-end">Front-end</option>
          <option value="Back-end">Back-end</option>
          <option value="DevOps">DevOps</option>
        </select>
      </div>
    </>
  );
};
