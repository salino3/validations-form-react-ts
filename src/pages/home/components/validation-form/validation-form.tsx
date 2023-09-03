import React from 'react';
import { useMediaQuery } from "react-responsive";
import { UserProps, startValidationColorProps } from "@/core";

export const ValidationForm: React.FC = () => {

  const isMobile: boolean = useMediaQuery({ maxWidth: "725px" });

  const [startValidationColor, setStartValidationColor] =
    React.useState<startValidationColorProps>({
      name: false,
      surname: false,
      email: false,
      password: false,
      confirmPassword: false,
      age: false,
      sex: null,
      dev: null,
    });
  const [startValidation, setStartValidation] = React.useState(false);

  //
  const [firstValueEmail, setFirstValueEmail] = React.useState(false);
  const [firstValueName, setFirstValueName] = React.useState<boolean | null>(
    false
  );
  const [firstValueSurname, setFirstValueSurname] = React.useState<
    boolean | null
  >(false);
  const [firstValuePswStrong, setFirstValuePswStrong] = React.useState<
    boolean | null
  >(false);
  const [firstValueAge, setFirstValueAge] = React.useState(false);
  const [firstValueDev, setfirstValueDev] = React.useState<boolean | null>(
    null
  );

  //
  const [isEmailValid, setIsEmailValid] = React.useState<boolean | null>();
  const [isPasswordStrong, setIsPasswordStrong] = React.useState<
    boolean | null
  >();
  const [isConfirmedPassword, setIsConfirmedPassword] = React.useState<
    boolean | null
  >();

  const [user, setUser] = React.useState<UserProps>({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: null,
    sex: "",
    dev: "",
  });

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

  const register = (event: any) => {
    event.preventDefault();
    setStartValidation(true);
    setStartValidationColor({
      name: true,
      surname: true,
      email: true,
      password: true,
      confirmPassword: true,
      age: true,
      sex: true,
      dev: true,
    });

    if (user.email === "") {
      setFirstValueEmail(true);
    }

    if (user.name === "") {
      setFirstValueName(true);
    }

    if (user.surname === "") {
      setFirstValueSurname(true);
    }

    if (user.age === null) {
      setFirstValueAge(true);
    }

    if (user.password === "") {
      setFirstValuePswStrong(true);
    }

    if (user.dev === "") {
      setfirstValueDev(false);
    }

    if (!startValidationColor.sex) {
      setStartValidationColor({ ...startValidationColor, sex: false });
    }

    if (
      isValidEmail() &&
      user.name &&
      user.surname &&
      isStrongPassword() &&
      isPasswordConfirmed() &&
      isMajor() &&
      user.sex &&
      user.dev
    ) {
      alert("Registering...");
      console.log(JSON.stringify(user, null, 2));
    } else {
      alert("Sorry, an error has occurred..");
      console.log(user);
    }

    setStartValidation(false);
  };

  const isValidEmail = () => {
    if (user.email !== "") {
      setStartValidationColor({ ...startValidationColor, email: true });
    }

    const emailValid = user.email
      ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)
      : null;

    setIsEmailValid(emailValid);
    console.log("isEmailValid", isEmailValid);
    return emailValid;
  };

  const isStrongPassword = () => {
    if (user.password !== "") {
      setStartValidationColor({ ...startValidationColor, password: true });
    }

    const bool = user.password
      ? /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9\d])(?=.*\d).{8,}/.test(
          user.password
        )
      : null;
    setIsPasswordStrong(bool);
    return bool;
  };

  //
  const isPasswordConfirmed = () => {
    if (user.confirmPassword !== "" && user.password !== user.confirmPassword) {
      setStartValidationColor({
        ...startValidationColor,
        confirmPassword: true,
      });
    }

    const bool = user.confirmPassword
      ? user.password === user.confirmPassword
      : null;
    setIsConfirmedPassword(bool);
    return bool;
  };

  const isMajor = () => {
    if (user.age && user.age < 18) {
      const bool = user && user?.age && user?.age >= 18 ? true : null;
      setStartValidationColor({ ...startValidationColor, age: bool });
    }
    if (user.age >= 18) {
      setStartValidationColor({ ...startValidationColor, age: false });
    }
    return true;
  };
  // Handlers

  const handleEmail = (e: any) => {
    setUser({ ...user, email: e.target.value });

    isValidEmail();
  };

  React.useEffect(() => {
    isValidEmail();
  }, [isEmailValid, user.email]);

  const handleName = (e: any) => {
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
  }, [user.name, firstValueName, startValidationColor.name]);

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
  }, [user.surname, firstValueSurname, startValidationColor.surname]);

  //
  const handleAge = (e: any) => {
    setUser({ ...user, age: parseInt(e.target.value) });

    isMajor();
    setFirstValueAge(true);
  };

  React.useEffect(() => {
    isMajor();
  }, [user.age]);
  //
  const handlePassword = (e: any) => {
    setUser({ ...user, password: e.target.value });

    isStrongPassword();
  };

  React.useEffect(() => {
    isStrongPassword();
  }, [isPasswordStrong, user.password]);

  //
  const handleConfirmPassword = (e: any) => {
    setUser({ ...user, confirmPassword: e.target.value });

    isStrongPassword();
  };

  React.useEffect(() => {
    isPasswordConfirmed();
  }, [isConfirmedPassword, user.confirmPassword]);
  //

  const handleDev = (e: any) => {
    setUser({ ...user, dev: e.target.value });
    console.log("handleDev", user.dev);
    setfirstValueDev(true);
  };
  React.useEffect(() => {
    if (user.dev !== "") {
      setStartValidationColor({ ...startValidationColor, dev: true });
    }
    if (user.dev === "" && firstValueDev) {
      setStartValidationColor({ ...startValidationColor, dev: false });
    }
    console.log("handleDev2", startValidationColor.dev);
  }, [isConfirmedPassword, user.dev]);

  return (
    <form className="myForm" onSubmit={register}>
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
      <br />
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
      <br />
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
      <br />
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
        placeholder="Password.."
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
      <br />
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
      <br />
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
      <br />
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
      <br />
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
          <label htmlFor="Male">Male</label>
          <input
            checked={isMaleChecked}
            id="Male"
            type="checkbox"
            onChange={() => onChangeSex("Male")}
          />
          &nbsp;
          <label htmlFor="Female">Female</label>
          <input
            checked={isFemaleChecked}
            type="checkbox"
            onChange={() => onChangeSex("Female")}
          />
        </div>
      </div>
      <br />
      <button type="submit" disabled={startValidation}>
        Register
      </button>
    </form>
  );
}
