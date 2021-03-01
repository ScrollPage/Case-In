import React, { memo } from "react";
import { Wrapper, Inner, Title } from "./styles";
import { Formik, Form, FormikProps } from "formik";
import { Button } from "@/components/UI/Button";
import { Select } from "@/components/UI/Select";

export interface MemberAddFormValues {
  userId?: number;
}

interface MemberAddFormProps {
  handleSubmit: (values: MemberAddFormValues) => void;
}

const MemberAddFormComponent: React.FC<MemberAddFormProps> = ({
  handleSubmit,
}) => {
  return (
    <Wrapper>
      <Title>Добавление сотрудника в отдел</Title>
      <Formik
        initialValues={{
          userId: undefined,
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
        }: FormikProps<MemberAddFormValues>) => (
          <Form>
            <Inner>
              <Select
                name="userId"
                onChange={setFieldValue}
                placeholder="Выберите сотрудника"
                value={values.userId}
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

export const MemberAddForm = memo(MemberAddFormComponent);
