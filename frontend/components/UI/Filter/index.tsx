import React, { memo } from "react";
import { Formik, Form, FormikProps } from "formik";
import { Wrapper, Inner, Title } from "./styles";
import { Button } from "../Button";
import { Select } from "../Select";
import { useRouter } from "next/router";
import { getAsString } from "@/utils/getAsString";
import { Checkbox } from "antd";

interface FilterProps {}

interface FiliterFormValues {
  isRating: boolean;
}

const FilterComponent: React.FC<FilterProps> = ({}) => {
  const { push, query, pathname } = useRouter();

  return (
    <Wrapper>
      <Title>Сортировка: </Title>
      <Formik
        initialValues={{
          isRating: !!getAsString(query.rate),
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          let queryParams = {};
          if (values.isRating) {
            queryParams = {
              ...queryParams,
              rate: true,
            };
          }
          if (query.search) {
            queryParams = {
              ...queryParams,
              search: getAsString(query.search),
            };
          }
          push(
            {
              pathname,
              query: queryParams,
            },
            undefined,
            { shallow: true }
          );
          setSubmitting(false);
        }}
      >
        {({ setFieldValue, values }: FormikProps<FiliterFormValues>) => (
          <Form>
            <Inner>
              <Checkbox
                value={values.isRating}
                onChange={(e) => setFieldValue("isRating", e.target.checked)}
              >
                По рейтингу
              </Checkbox>
              <Button myType="blue" type="submit" width="100%">
                Применить
              </Button>
            </Inner>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export const Filter = memo(FilterComponent);
