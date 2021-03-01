import React, { memo } from "react";
import { Wrapper, Inner, Title, DocInput } from "./styles";
import { Formik, Form, FormikProps } from "formik";
import { Button } from "@/components/UI/Button";
import { Select } from "antd";

export interface DocFormValues {
  file: any;
}

interface DocFormProps {
  handleSubmit: (values: DocFormValues) => void;
}

const DocFormComponent: React.FC<DocFormProps> = ({ handleSubmit }) => {
  return (
    <Wrapper>
      <Title>Загрузка документа</Title>
      <Formik
        initialValues={{
          file: null,
        }}
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
        }: FormikProps<DocFormValues>) => (
          <Form>
            <Inner>
              <DocInput
                id="file"
                name="file"
                type="file"
                onChange={(event) => {
                  // @ts-ignore
                  setFieldValue("file", event.currentTarget.files[0]);
                }}
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
        )}
      </Formik>
    </Wrapper>
  );
};

export const DocForm = memo(DocFormComponent);
