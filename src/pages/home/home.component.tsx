import React from "react";
import { ValidationForm } from "./components";
import "./home.styles.scss";


export const Home: React.FC = () => {

  return (
    <div className="root">
      <h1 className="title">
        <span>&#9728;</span> Validation User Form <span>&#9728;</span>
      </h1>
      <ValidationForm />
    </div>
  );
};
