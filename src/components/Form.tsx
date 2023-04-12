import React, { useState } from "react";

interface IFormData {
  login: string;
  email: string;
  password: string;
}

const initialState: IFormData = {
  login: "",
  email: "",
  password: "",
};

const Form = () => {
  const [formData, setFormData] = useState(initialState);

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    switch (name) {
      case "login":
        setFormData((prevState) => ({ ...prevState, login: e.target.value }));
        break;
      case "email":
        setFormData((prevState) => ({ ...prevState, email: e.target.value }));
        break;
      case "password":
        setFormData((prevState) => ({
          ...prevState,
          password: e.target.value,
        }));
        break;
      default:
        return;
    }
  };
  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        login
        <input
          name="login"
          value={formData.login}
          onChange={changeInput}
          type="text"
        />
      </label>
      <label>
        email
        <input
          name="email"
          value={formData.email}
          onChange={changeInput}
          type="text"
        />
      </label>
      <label>
        password
        <input
          name="password"
          value={formData.password}
          onChange={changeInput}
          type="text"
        />
      </label>
      <button>Submit</button>
    </form>
  );
};

export default Form;
