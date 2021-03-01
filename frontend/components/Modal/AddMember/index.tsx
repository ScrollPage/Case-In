import {
  MemberAddForm,
  MemberAddFormValues,
} from "@/components/Command/MemberAddForm";
import { exitOrInviteCommand } from "@/store/actions/command";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Wrapper } from "./styles";

export interface AddMemberProps {}

interface AddMember extends AddMemberProps {
  setClose: () => void;
}

const AddMemberComponent: React.FC<AddMember> = ({ setClose }) => {
  const dispatch = useDispatch();

  const onSubmit = (values: MemberAddFormValues) => {
    dispatch(exitOrInviteCommand(values.userId));
    setClose();
  };

  return (
    <Wrapper>
      <MemberAddForm handleSubmit={onSubmit} />
    </Wrapper>
  );
};

export const AddMember = memo(AddMemberComponent);
