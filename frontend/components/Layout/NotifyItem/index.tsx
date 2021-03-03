import { renderTimestamp } from "@/utils/renderTimestamp";
import { memo, useMemo } from "react";
import { Wrapper, Title, Time } from "./styles";

interface NotifyItemProps {
  seen: boolean;
  timestamp: string;
  note: number;
}

const NotifyItemComponent: React.FC<NotifyItemProps> = ({
  seen,
  timestamp,
  note,
}) => {
  const text = useMemo(() => {
    if (note === 1) {
      return `Вас приняли в отдел`;
    } else {
      return `Вам разрешили доступ к документам отдела`;
    }
  }, [note]);

  return (
    <Wrapper>
      <Title>{text}</Title>
      <Time>{renderTimestamp(timestamp)}</Time>
    </Wrapper>
  );
};

export const NotifyItem = memo(NotifyItemComponent);
