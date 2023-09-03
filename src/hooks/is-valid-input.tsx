import { UserProps, startValidationColorProps } from "@/core";

interface Props {
  user: UserProps;
  startValidationColor: startValidationColorProps;
  setStartValidationColor: (value: React.SetStateAction<startValidationColorProps>) => void;
  isEmailValid: boolean | null | undefined;
  setIsEmailValid: React.Dispatch<React.SetStateAction<boolean | null | undefined>>;
};

export const isValidInput = ({
  user,
  setStartValidationColor,
  startValidationColor,
  isEmailValid,
  setIsEmailValid,
}: Props) => {

  //
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

  return {
    isValidEmail,
  };
};

 
