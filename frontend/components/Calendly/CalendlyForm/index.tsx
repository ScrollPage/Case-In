import React, { memo } from "react";
import { Wrapper, Inner, Title } from "./styles";
import { object, string } from "yup";
import { Formik, Form, FormikProps } from "formik";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { TimePicker } from "antd";
import moment from "moment";
import { format } from "prettier";

const validationSchema = object().shape({
  time: string().required("Введите время"),
  name: string()
    .min(3, "Слишком короткое название")
    .max(50, "Слишком длинное название")
    .required("Введите название мероприятия"),
});

export interface CalendlyFormValues {
  name: string;
  time: string;
}

interface CalendlyFormProps {
  handleSubmit: (values: CalendlyFormValues) => void;
}

const CalendlyFormComponent: React.FC<CalendlyFormProps> = ({
  handleSubmit,
}) => {
  return (
    <Wrapper>
      <Title>Добавить мероприятие</Title>
      <Formik
        initialValues={{
          name: "",
          time: "12:00",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          handleSubmit(values);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({
          dirty,
          isValid,
          setFieldValue,
          values,
        }: FormikProps<CalendlyFormValues>) => {
          return (
            <Form>
              <Inner>
                <Input type="text" name="name" placeholder="Название" />
                <TimePicker
                  value={moment(values.time, "HH:mm")}
                  onChange={(value) => setFieldValue("time", value)}
                />
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

export const CalendlyForm = memo(CalendlyFormComponent);
