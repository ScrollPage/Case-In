import { Button } from "@/components/UI/Button";
import { deletePost } from "@/store/actions/post";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Wrapper, Inner, Title } from "./styles";

export interface DeletePostProps {
  id: number;
}

interface IDeletePost extends DeletePostProps {
  setClose: () => void;
}

const DeletePostComponent: React.FC<IDeletePost> = ({ setClose, id }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost(id));
    setClose();
  };

  return (
    <Wrapper>
      <Title>Вы действительно хотите удалить объявление?</Title>
      <Inner>
        <Button onClick={handleDelete} myType="outline">
          Удалить
        </Button>
        <Button onClick={setClose} myType="outline">
          Отменить
        </Button>
      </Inner>
    </Wrapper>
  );
};

export const DeletePost = memo(DeletePostComponent);
