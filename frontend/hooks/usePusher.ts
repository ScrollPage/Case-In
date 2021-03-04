import { show } from "@/store/actions/alert";
import { INotify } from "@/types/notify";
import { achieveData } from "@/utils/achieveData";
import Pusher from "pusher-js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUser } from "./useUser";

export const usePusher = () => {
  const { userId } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    const pusher = new Pusher("6a7cdf965390e2c19b3b", {
      cluster: "eu",
      // @ts-ignore: Unreachable code error
      encrypted: true,
    });
    if (userId) {
      const channel = pusher.subscribe(`achieve${userId}`);
      channel.bind("new-achieve", function (data: INotify) {
        dispatch(
          show(
            `Вы выполнили достижение: ${achieveData[data.name]}!`,
            "success"
          )
        );
      });
    }
    return () => {
      pusher.disconnect();
    };
  }, [userId]);
};
