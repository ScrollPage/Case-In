import React, { memo, useContext } from "react";
import { Wrapper, Inner, SelectWrapper } from "./styles";
import { object, string } from "yup";
import { Formik, Form, FormikProps, useField, useFormikContext } from "formik";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { Select } from "antd";
import useSWR from "swr";
import { useRouter } from "next/router";
import { UserTaskContext, UserTaskProps } from "@/pages/profile/[ID]/task";
import { useDispatch } from "react-redux";
import { getAsString } from "@/utils/getAsString";
import { editUserTask } from "@/store/actions/task";

const { Option } = Select;

const validationSchema = object().shape({
  name: string().required("Введите задачу"),
});

export interface EditTaskFormValues {
  name: string;
  percentage?: string;
}

interface EditTaskFormProps {}

const EditTaskFormComponent: React.FC<EditTaskFormProps> = ({}) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Formik
        initialValues={{
          name: "",
          percentage: undefined,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          dispatch(editUserTask(values));
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ dirty, isValid }: FormikProps<EditTaskFormValues>) => {
          return (
            <Form>
              <Inner>
                <InitiativeSelect name="name" placeholder="Выберите задачу" />
                <Input
                  type="text"
                  name="percentage"
                  placeholder="Процент от 0 до 100"
                />
                <Button
                  myType="outline"
                  type="submit"
                  width="228px"
                  disabled={!(dirty && isValid)}
                >
                  Изменить задачу
                </Button>
              </Inner>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};
  
export const EditTaskForm = memo(EditTaskFormComponent);

interface InitiativeSelectProps {
  name: string;
  placeholder: string;
}

const InitiativeSelect: React.FC<InitiativeSelectProps> = ({
  placeholder,
  ...props
}) => {
  const { tasks } = useContext(UserTaskContext) as UserTaskProps;
  const { setFieldValue } = useFormikContext();
  const [field] = useField({
    name: props.name,
  });

  const { query } = useRouter();
  const pageUserId = getAsString(query.ID);

  const { error, data } = useSWR(`/api/worker/${pageUserId}/diagramtask/`, {
    initialData: tasks,
  });

  const tasksData = !error && data ? data : [];

  return (
    <SelectWrapper>
      <Select
        {...field}
        {...props}
        onChange={(value) => setFieldValue("name", value)}
        optionFilterProp="children"
        showSearch
        placeholder={placeholder}
      >
        {tasksData.map((task) => (
          <Option key={`taskItem__key__${task.id}`} value={task.id}>
            {task.name}
          </Option>
        ))}
      </Select>
    </SelectWrapper>
  );
};
