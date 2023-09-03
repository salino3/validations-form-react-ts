import { UserProps, startValidationColorProps } from "@/core";

interface Props {
  user: UserProps;
  setStartValidation: (value: React.SetStateAction<boolean>) => void;
  setStartValidationColor: (
    value: React.SetStateAction<startValidationColorProps>
  ) => void;
  setFirstValueEmail: (value: React.SetStateAction<boolean>) => void;
  setFirstValueName: (value: React.SetStateAction<boolean | null>) => void;
  setFirstValueSurname: (value: React.SetStateAction<boolean | null>) => void;
  setFirstValueAge: (value: React.SetStateAction<boolean>) => void;
  setFirstValuePswStrong: (value: React.SetStateAction<boolean | null>) => void;
  setFirstValueDev: (value: React.SetStateAction<boolean | null>) => void;
  startValidationColor: startValidationColorProps;
  isValidEmail: () => boolean | null;
  isStrongPassword: () => boolean | null;
  isPasswordConfirmed: () => boolean | null;
  isMajor: () => boolean;
}

export const SubmitFormValidation = ({
  user,
  setStartValidation,
  setStartValidationColor,
  setFirstValueEmail,
  setFirstValueName,
  setFirstValueSurname,
  setFirstValueAge,
  setFirstValuePswStrong,
  setFirstValueDev,
  startValidationColor,
  isValidEmail,
  isStrongPassword,
  isPasswordConfirmed,
  isMajor,
}: Props) => {
    //
  const registerData = (data: Props) => {
    //

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
      setFirstValueDev(false);
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
  return {
    registerData,
  };
};
