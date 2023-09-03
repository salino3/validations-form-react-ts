
export interface UserProps {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: any;
  sex: string;
  dev: string;
};

export interface startValidationColorProps {
  name: boolean | null;
  surname: boolean | null;
  email: boolean | null;
  password: boolean | null;
  confirmPassword: boolean | null;
  age: boolean | null;
  sex: boolean | null;
  dev: boolean | null;
};
