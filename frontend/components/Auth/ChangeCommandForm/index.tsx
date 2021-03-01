import React, { memo, useCallback } from "react";
import { Wrapper, Inner, Title } from "./styles";
import { object, string } from "yup";
import { Formik, Form, FormikProps } from "formik";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { ICommand } from "@/types/command";
import { IOption } from "@/types/option";
import { Select } from "@/components/UI/Select";

const validationSchema = object().shape({
  name: string()
    .min(3, "Слишком короткое поле")
    .max(50, "Слишком длинное поле")
    .required("Поле пусток"),
  description: string()
    .min(3, "Слишком короткое поле")
    .max(50, "Слишком длинное поле")
    .required("Поле пусток"),
  motto: string()
    .min(3, "Слишком короткое поле")
    .max(50, "Слишком длинное поле")
    .required("Поле пусток"),
});

export interface ChangeCommandFormValues {
  name: string;
  description: string;
  motto: string;
}

interface ChangeCommandFormProps {
  handleSubmit: (values: ChangeCommandFormValues) => void;
  initialValues?: ICommand;
}

const ChangeCommandFormComponent: React.FC<ChangeCommandFormProps> = ({
  handleSubmit,
  initialValues,
}) => {
  return (
    <Wrapper>
      <Title>Изменение / Дополнение отдела</Title>
      <Formik
        initialValues={{
          name: initialValues?.name ?? "",
          description: initialValues?.info.description ?? "",
          motto: initialValues?.info.motto ?? "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          handleSubmit(values);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ dirty, isValid }: FormikProps<ChangeCommandFormValues>) => (
          <Form>
            <Inner>
              <Input type="text" name="name" placeholder="Название отдела" />
              <Input type="text" name="description" placeholder="Описание" />
              <Input type="text" name="motto" placeholder="Девиз" />
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
        )}
      </Formik>
    </Wrapper>
  );
};

export const ChangeCommandForm = memo(ChangeCommandFormComponent);
