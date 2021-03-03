import React, { memo, useMemo } from "react";
import { Wrapper } from "./styles";
import { Select as AntdSelect } from "antd";
import useSWR from "swr";
import { User } from "@/types/user";

const { Option } = AntdSelect;

const renderOptions = (options: User[]) => {
  return options.map((option) => {
    return (
      <Option key={`categoryOption__key__${option.id}`} value={option.id}>
        {`${option.first_name} ${option.last_name}`}
      </Option>
    );
  });
};

interface SelectProps {
  onChange: (field: string, value: any, shouldValidate?: boolean) => void;
  name: string;
  placeholder: string;
  value?: number;
  width?: string;
  apiLink: string;
}

const SelectComponent: React.FC<SelectProps> = ({
  onChange,
  name,
  placeholder,
  value,
  width,
  apiLink,
}) => {
  const { error, data } = useSWR<User[]>(apiLink);

  const options = useMemo(() => (!error && data ? data : []), [data, error]);

  const handleChange = (value: number[]) => {
    onChange(name, value);
  };

  return (
    <Wrapper width={width}>
      <AntdSelect
        optionFilterProp="children"
        size="large"
        allowClear
        style={{ width: "100%" }}
        value={value ? [value] : undefined}
        placeholder={placeholder}
        onChange={handleChange}
      >
        {renderOptions(options)}
      </AntdSelect>
    </Wrapper>
  );
};

export const Select = memo(SelectComponent);
