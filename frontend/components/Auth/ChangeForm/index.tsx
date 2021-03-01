import React, { memo } from "react";
import { Wrapper, Inner, Title } from "./styles";
import { object, string } from "yup";
import { Formik, Form, FormikProps } from "formik";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { User } from "@/types/user";

const validationSchema = object().shape({
  firstName: string()
    .min(3, "Слишком короткое имя")
    .max(50, "Слишком длинное имя")
    .required("Введите имя"),
  lastName: string()
    .min(3, "Слишком короткая фамилиия")
    .max(50, "Слишком длинное фамилия")
    .required("Введите фамилию"),
  phone: string()
    .min(11, "Слишком короткий номер")
    .max(11, "Слишком длинный номер")
    .required("Введите номер телефона"),
});

export interface ChangeFormValues {
  firstName: string;
  lastName: string;
  phone: string;
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
          firstName: initialValues?.info.first_name ?? "",
          lastName: initialValues?.info.last_name ?? "",
          phone: initialValues?.info.phone_number ?? "",
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
