import { ReactNode, useState } from "react";
import { createContext, Dispatch, SetStateAction } from "react";

export function useStateContext<A>(defaultValue: A) {
  type UpdateType = Dispatch<SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const Ctx = createContext({ state: defaultValue, update: defaultUpdate });
  function Provider({ children }: { children: ReactNode }) {
    const [state, update] = useState(defaultValue);
    return <Ctx.Provider value={{ state, update }}> {children} </Ctx.Provider>;
  }
  return { Ctx, Provider };
}
