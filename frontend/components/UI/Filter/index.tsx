import React, { memo } from "react";
import { Formik, Form, FormikProps } from "formik";
import { Wrapper, Inner, Title } from "./styles";
import { Button } from "../Button";
import { useRouter } from "next/router";
import { getAsString } from "@/utils/getAsString";
import { Radio } from "antd";

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

interface FilterProps {}

interface FiliterFormValues {
  sort?: number;
}

const FilterComponent: React.FC<FilterProps> = ({}) => {
  const { push, query, pathname } = useRouter();

  return (
    <Wrapper>
      <Title>Сортировка: </Title>
      <Formik
        initialValues={{
          sort: query.sort ? Number(getAsString(query.sort)) : undefined,
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          let queryParams: any = { sort: values.sort };
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
              <Radio.Group
                value={values.sort}
                onChange={(e) => setFieldValue("sort", e.target.value)}
              >
                <Radio style={radioStyle} value={1}>
                  По рейтингу
                </Radio>
                <Radio style={radioStyle} value={2}>
                  По имени
                </Radio>
              </Radio.Group>
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
