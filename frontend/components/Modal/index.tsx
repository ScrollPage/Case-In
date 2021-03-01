import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModalInfo } from "@/store/selectors";
import { modalHide } from "@/store/actions/modal";
import { BackDrop, Wrapper, Close } from "./styles";

import { ChangeProfile } from "./ChangeProfile";
import { ChangeCommand } from "./ChangeCommand";
import { DeletePost } from "./DeletePost";
import { DeleteCommand } from "./DeleteCommand";
import { AddCommand } from "./AddCommand";
import { AddDoc } from "./AddDoc";
import { DeleteChat } from "./DeleteChat";
import { ExitCommand } from "./ExitCommand";
import { DeleteComment } from "./DeleteComment";
import { DeleteReview } from "./DeleteReview";
import { AddCalendlyEvent } from "./AddCalendlyEvent";

const MODAL_COMPONENTS = {
  CHANGE_COMMAND: ChangeCommand,
  DELETE_COMMAND: DeleteCommand,
  EXIT_COMMAND: ExitCommand,
  ADD_COMMAND: AddCommand,
  CHANGE_PROFILE: ChangeProfile,
  DELETE_POST: DeletePost,
  ADD_DOC: AddDoc,
  DELETE_CHAT: DeleteChat,
  DELETE_COMMENT: DeleteComment,
  DELETE_REVIEW: DeleteReview,
  ADD_CALENDLY_EVENT: AddCalendlyEvent,
};

const RootModalComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { props, name } = useSelector(getModalInfo);

  const setClose = () => {
    dispatch(modalHide());
  };

  useEffect(() => {
    if (name) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [name]);

  if (!name) {
    return null;
  }

  // @ts-ignore
  const SpecificModal = MODAL_COMPONENTS[name];

  return (
    <>
      <Wrapper>
        <div>
          <Close onClick={setClose} />
          <SpecificModal {...props} setClose={setClose} />
        </div>
      </Wrapper>
      <BackDrop onClick={() => setClose()} />
    </>
  );
};

export const RootModal = memo(RootModalComponent);
