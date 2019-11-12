import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
// Сперва делаем структуру формы используя формик, для ее стилизации берем компоненты бутстрап
import { Button, FormGroup, Label, Alert } from "reactstrap";

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

// const saveCredentialData = credentialsValues => {
//   setTimeout(() => {
//     alert(JSON.stringify(credentialsValues, null, 2));
//   }, 400);
// };

// -------------- initialisations end -----------
const RegistrationForm = props => (
  <div>
    <h1>Форма регистарции</h1>

    <Formik
      initialValues={INITIAL_VALUES}
      validate={validateInputs}
      onSubmit={(values, actions) => {
        props.handleSubmit(values);
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {/* оборачиваем специальным компонентом  FormGroup, доьавляем компоненту Field (формика) класс бутстрапа form-control. Создаем кастомный компонент FormInput и добавляем его атрибутом в компонент Field*/}
      {({ isSubmitting }) => (
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
          {/* {errors.name && <div id="feedback">{errors.name}</div>} */}
          <Button block type="submit" disabled={isSubmitting}>
            Зарегистрироваться
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default RegistrationForm;
