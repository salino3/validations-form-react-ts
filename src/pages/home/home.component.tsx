import React from 'react';
import './home.styles.scss';

interface startValidationColorProps {
  email: boolean | null;
  password: boolean | null;
  confirmPassword: boolean | null;
  age: boolean | null;
  sex:  boolean | null;
  dev:  boolean | null;
};

export const Home: React.FC = () => {
   const [startValidation, setStartValidation] = React.useState(false);
   const [startValidationColor, setStartValidationColor] =
     React.useState<startValidationColorProps>({
       email: false,
       password: false,
       confirmPassword: false,
       age: false,
       sex: false,
       dev: false,
     });

   //!
const [isEmailValid, setIsEmailValid] = React.useState< boolean | null>();
const [firstValue, setFirstValue] = React.useState(false);
const [isPasswordStrong, setIsPasswordStrong] = React.useState<boolean | null>();

 

   //!

   const [user, setUser] =
     React.useState<any>({
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
     }
     if (sex === "Female") {
       setUser({ ...user, sex: "Female" });
       setIsMaleChecked(false);
       setIsFemaleChecked(true);
     }
   };

   const register = (event: any) => {
     event.preventDefault();
     setStartValidation(true);
     setStartValidationColor({
       email: true,
       password: true,
       confirmPassword: true,
       age: true,
       sex: true,
       dev: true,
     });

     if (
       isValidEmail() &&
       isStrongPassword() &&
       isPasswordConfirmed() &&
       isMajor() &&
       user.sex &&
       user.dev
     ) {
       alert("Registering...");
       console.log(JSON.stringify(user, null, 2));
     } else {
       alert("You have some error in the Form...");
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
     console.log('isEmailValid', isEmailValid);
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
     if (
       user.confirmPassword !== "" &&
       user.password !== user.confirmPassword
     ) {
       setStartValidationColor({
         ...startValidationColor,
         confirmPassword: true,
       });
     }

    //  const bool = user.confirmPassword ? user.password === user.confirmPassword : null;
    //  setIsPasswordStrong;(bool);
    //   return bool;
    return user.confirmPassword
        ? user.password === user.confirmPassword
        : null;
   };

   const isMajor = () => {
      
      if(user.age && user.age < 18){
        const bool = user && user?.age && user?.age >= 18 ? true : null;
        setStartValidationColor({ ...startValidationColor, age: bool });
     }
      if (user.age >= 18)  {
       setStartValidationColor({ ...startValidationColor, age: false });
     }
     return true;
   };
   
   const handleEmail = (e: any) => {
    setUser({ ...user, email: e.target.value });

    isValidEmail();
   }

     React.useEffect(() => {
       isValidEmail();
     }, [isEmailValid, user.email]);

     //
   const handleAge = (e: any) => {
  setUser({ ...user, age: parseInt(e.target.value) });

     isMajor();
     setFirstValue(true);
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



  return (
    <div>
      <h1 className="title">
        <span>&#9728;</span> Validation User Form <span>&#9728;</span>
      </h1>
      <form className="myForm" onSubmit={register}>
        <input
          className={`${isEmailValid ? "valid" : ""}
           ${
             isEmailValid === false ||
             (startValidationColor.email && !isEmailValid)
               ? "invalid"
               : ""
           }`}
          value={user.email}
          onChange={handleEmail}
          type="text"
          placeholder="Email.."
        />
        <br />
        <span className="errorText" hidden={isEmailValid || user.email === ""}>
          Invalid email address!
        </span>
        <br />
        {/* Problema1 */}
        <input
          className={
            isPasswordStrong === true
              ? "valid"
              : isPasswordStrong === false ||
                (startValidationColor.password && !isPasswordStrong)
              ? "invalid"
              : ""
          }
          value={user.password}
          onChange={handlePassword}
          type="password"
          placeholder="Password.."
        />
        <br />
        <span className="errorText">
          {user.password !== "" && !isPasswordStrong && "Weak password!"}
        </span>
        <br />
        <input
          className={
            user.password !== user.confirmPassword
              ? "passwordConfirmed"
              : isPasswordConfirmed() === true
              ? "valid"
              : isPasswordConfirmed() === false ||
                (startValidationColor.confirmPassword && !isPasswordConfirmed())
              ? "invalid"
              : ""
          }
          value={user.confirmPassword}
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
          type="password"
          placeholder="Confirm password"
        />
        <br />
        <span className="errorText">
          {user.confirmPassword !== "" &&
            !isPasswordConfirmed() &&
            "Repeat password!"}
        </span>
        <br />

        <input
          className={
            firstValue && (user.age < 18 || startValidationColor.age === null)
              ? "invalid"
              : user && user?.age && user?.age >= 18
              ? "valid"
              : ""
          }
          value={user.age || ""}
          onChange={handleAge}
          type="number"
          min="0"
          placeholder="Age.."
        />
        <br />
        <span
          className="errorText"
          hidden={
            (user.age !== null && user.age >= 18) ||
            (isNaN(user.age) && firstValue) ||
            (user.age === null && !firstValue)
          }
        >
          You must be Major!
        </span>
        <br />

        <div>
          <label htmlFor="dev">What developer are you?</label> &nbsp;
          <select
            value={user.dev}
            id="dev"
            onChange={(e) => setUser({ ...user, dev: e.target.value })}
          >
            <option value="">..</option>
            <option value="Front-end">Front-end</option>
            <option value="Back-end">Back-end</option>
            <option value="DevOps">DevOps</option>
          </select>
        </div>
        <br />

        <div>
          <p>Your sex:</p>
          <label htmlFor="Male">Male</label>
          <input
            checked={isMaleChecked}
            id="Male"
            type="checkbox"
            className="inputCheckBox"
            onChange={() => onChangeSex("Male")}
          />
          &nbsp;
          <label htmlFor="Female">Female</label>
          <input
            checked={isFemaleChecked}
            type="checkbox"
            className="inputCheckBox"
            onChange={() => onChangeSex("Female")}
          />
        </div>
        <br />

        <button type="submit" disabled={startValidation}>
          Register
        </button>
      </form>
    </div>
  );
};
