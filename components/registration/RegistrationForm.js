import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
// Сперва делаем структуру формы используя формик, для ее стилизации берем компоненты бутстрап
import { Button, FormGroup, Label } from "reactstrap";

import FormInput from "./FormInput";

// -------------- initialisations start -----------

const INITIAL_VALUES = { name: "", email: "", password: "", password2: "" };

const validateInputs = values => {
  let errors = {};
  // console.log(values);

  Object.keys(values).forEach(key => {
    if (!values[key]) {
      errors[key] = `Поле ${key} для заполнения обязательно`;
    }
  });

  // if (password != password2) {
  //   errors.text = "Пароли не совпадают";
  // }

  return errors;
};

const saveCredentialData = credentialsValues => {
  setTimeout(() => {
    alert(JSON.stringify(credentialsValues, null, 2));
  }, 400);
};

// const reqCredentialData = credentialsValues => {
//   axios
//     .post("/users/registration", credentialsValues)
//     // .post("/users/register", JSON.stringify(credentialsValues))
//     .then(function(response) {
//       console.log("response from server =", response);
//       // На сервере делаем проверку есть юзер в базе или нет, создаем его
//     })
//     .catch(function(error) {
//       console.log("error from server =", error);
//       // ошибки с сервера
//     });
// };

// const handle400Error = (backendErrors, setStatus) => {
//   let errors = {};
//   for (let key in backendErrors) {
//     errors[key] = backendErrors[key][0]; // for now only take the first error of the array
//   }
//   console.log("errors object", errors);
//   setStatus({ errors });
// };

// const handleSubmit = async (values, { setStatus, resetForm }) => {
//   try {
//     const res = axios.post("/users/registration", values);

//     console.log(res.data);
//     resetForm();
//   } catch (e) {
//     setStatus(transformMyApiErrors(e));
//   }
// };

// -------------- initialisations end -----------
const RegistrationForm = () => (
  <div>
    <h1>Форма регистарции</h1>
    <Formik
      initialValues={INITIAL_VALUES}
      validate={validateInputs}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {/* оборачиваем специальным компонентом  FormGroup, доьавляем компоненту Field (формика) класс бутстрапа form-control. Создаем кастомный компонент FormInput и добавляем его атрибутом в компонент Field*/}
      {({ isSubmitting, errors }) => (
        <Form>
          <Field
            className="form-control"
            type="name"
            name="name"
            component={FormInput}
          />
          <Field
            className="form-control"
            type="email"
            name="email"
            component={FormInput}
          />

          <Field
            className="form-control"
            type="password"
            name="password"
            component={FormInput}
          />

          <Field
            className="form-control"
            type="password"
            name="password2"
            component={FormInput}
          />
          {errors.name && <div id="feedback">{errors.name}</div>}
          <Button block type="submit" disabled={isSubmitting}>
            Зарегистрироваться
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default RegistrationForm;
