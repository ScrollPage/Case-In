import { Button } from "@/components/UI/Button";
import FileUpload from "@/components/UI/FileUpload";
import { addPost } from "@/store/actions/post";
import React, { memo, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Wrapper, TextArea, Inner } from "./styles";

interface PostAddProps {}

const PostAddComponent: React.FC<PostAddProps> = ({}) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(undefined);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text.trim() !== "" || image) {
      dispatch(addPost(text, image));
      setImage(null);
      setCurrentImage(undefined);
      setText("");
    }
  };

  return (
    <div>
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <Inner>
            <TextArea value={text} onChange={(e) => setText(e.target.value)} />
            <FileUpload
              setImage={setImage}
              currentImage={currentImage}
              setCurrentImage={setCurrentImage}
            />
          </Inner>
          <Button
            type="submit"
            myType="blue"
            disabled={!(text.trim() !== "" || image)}
          >
            Добавить объявление
          </Button>
        </form>
      </Wrapper>
    </div>
  );
};

export const PostAdd = memo(PostAddComponent);
