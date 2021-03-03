import React, { memo } from "react";
import { Wrapper, Inner, Title } from "./styles";
import { object, string } from "yup";
import { Formik, Form, FormikProps } from "formik";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { User } from "@/types/user";

const validationSchema = object().shape({
  firstName: string()
    .min(3, "Слишком короткая поле")
    .max(50, "Слишком длинное поле")
    .required("Поле пустое"),
  lastName: string()
    .min(3, "Слишком короткая поле")
    .max(50, "Слишком длинное поле")
    .required("Поле пустое"),
  phone: string()
    .min(3, "Слишком короткая поле")
    .max(50, "Слишком длинное поле")
    .required("Поле пустое"),
  hobby: string()
    .min(3, "Слишком короткая поле")
    .max(50, "Слишком длинное поле")
    .required("Поле пустое"),
  about: string()
    .min(3, "Слишком короткая поле")
    .max(50, "Слишком длинное поле")
    .required("Поле пустое"),
  position: string()
    .min(3, "Слишком короткая поле")
    .max(50, "Слишком длинное поле")
    .required("Поле пустое"),
});

export interface ChangeFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  position: string;
  hobby: string;
  about: string;
}

interface ChangeFormProps {
  handleSubmit: (values: ChangeFormValues) => void;
  initialValues?: User;
}

const ChangeFormComponent: React.FC<ChangeFormProps> = ({
  handleSubmit,
  initialValues,
}) => {
  return (
    <Wrapper>
      <Title>Информация о себе</Title>
      <Formik
        initialValues={{
          firstName: initialValues?.first_name ?? "",
          lastName: initialValues?.last_name ?? "",
          phone: initialValues?.info.phone_number ?? "",
          hobby: initialValues?.info.hobby ?? "",
          about: initialValues?.info.about ?? "",
          position: initialValues?.info.position ?? "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          handleSubmit(values);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ dirty, isValid }: FormikProps<ChangeFormValues>) => {
          return (
            <Form>
              <Inner>
                <Input type="text" name="firstName" placeholder="Имя" />
                <Input type="text" name="lastName" placeholder="Фамилия" />
                <Input type="tel" name="phone" placeholder="Номер телефона" />
                <Input type="text" name="position" placeholder="Должность" />
                <Input type="text" name="about" placeholder="О себе" />
                <Input type="text" name="hobby" placeholder="Хобби" />
                <Button
                  myType="outline"
                  type="submit"
                  width="218px"
                  disabled={!(dirty && isValid)}
                >
                  Подтвердить
                </Button>
              </Inner>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export const ChangeForm = memo(ChangeFormComponent);
