import React, { memo } from "react";
import { Wrapper, Inner, Title } from "./styles";
import { Formik, Form, FormikProps } from "formik";
import { Button } from "@/components/UI/Button";
import { Select } from "@/components/UI/Select";
import { useDispatch } from "react-redux";
import { addMentor } from "@/store/actions/mentor";
import { useRouter } from "next/router";
import { useUser } from "@/hooks/useUser";

export interface ProfileMentorValues {
  userId?: number;
}

const ProfileMentorComponent: React.FC = ({}) => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { isCanBeMentor, userId } = useUser();

  if (!isCanBeMentor || query.ID === userId) {
    return null;
  }

  return (
    <Wrapper>
      <Title>Хотите стать наставником?</Title>
      <Formik
        initialValues={{
          userId: undefined,
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          dispatch(addMentor(Number(values.userId)));
          setSubmitting(false);
          resetForm();
        }}
      >
        {({
          dirty,
          isValid,
          setFieldValue,
          values,
        }: FormikProps<ProfileMentorValues>) => (
          <Form>
            <Inner>
              <Select
                apiLink="/api/worker/padawan/"
                name="userId"
                onChange={setFieldValue}
                placeholder="Выберите ученика"
                value={values.userId}
              />
              <Button
                myType="outline"
                type="submit"
                width="218px"
                disabled={!(dirty && isValid)}
              >
                Хочу
              </Button>
            </Inner>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export const ProfileMentor = memo(ProfileMentorComponent);
