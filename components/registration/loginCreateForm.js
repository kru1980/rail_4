// Render Prop
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
// Сперва делаем структуру формы используя формик, для ее стилизации берем компоненты бутстрап
import { Button, FormGroup, Label } from "reactstrap";

import FormInput from "./FormInput";

// -------------- initialisations start -----------

const INITIAL_VALUES = { email: "", password: "" };

const validateInputs = values => {
  //debugger;
  let errors = {};

  Object.keys(values).forEach(key => {
    if (!values[key]) {
      errors[key] = `Поле ${key} для заполнения обязательно`;
    }
  });

  return errors;
};

const saveCredentialData = credentialsValues => {
  setTimeout(() => {
    alert(JSON.stringify(credentialsValues, null, 2));
  }, 400);
};

// -------------- initialisations end -----------
const LoginCreateForm = () => (
  <div>
    <h1>Форма входа</h1>
    <Formik
      initialValues={INITIAL_VALUES}
      validate={validateInputs}
      onSubmit={(values, { setSubmitting }) => {
        saveCredentialData(values);
        setSubmitting(false);
      }}
    >
      {/* оборачиваем специальным компонентом  FormGroup, доьавляем компоненту Field (формика) класс бутстрапа form-control. Создаем кастомный компонент FormInput и добавляем его атрибутом в компонент Field*/}
      {({ isSubmitting }) => (
        <Form>
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

          <Button block type="submit" disabled={isSubmitting}>
            Войти
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default LoginCreateForm;
