import { UserProps, startValidationColorProps } from "@/core";


interface Props {
  user: UserProps;
  startValidationColor: startValidationColorProps;
  setStartValidationColor: (value: React.SetStateAction<startValidationColorProps>) => void;
  setIsEmailValid: React.Dispatch<React.SetStateAction<boolean | null | undefined>>;
};

export const isValidEmail = ({
  user,
  startValidationColor,
  setStartValidationColor,
  setIsEmailValid,
}: Props) => {
 
    if (user.email !== "") {
    setStartValidationColor({ ...startValidationColor, email: true });
  };

  const isValid = user.email
    ? //# ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)
      // (Ñ)
      /^[\w+\-._]+@[a-zA-ZñÑáéíóúÁÉÍÓÚ]+\.[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,}$/.test(
        user.email
      )
    : null;

  setIsEmailValid(isValid);
  return isValid;
};
