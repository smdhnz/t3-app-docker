import type { ReactNode } from "react";

import { TextGroup } from "./TextGroup";

type Props = {
  size?: number;
  children: ReactNode;
};

export const Title = (props: Props) => {
  const size = props.size ?? 40;
  return (
    <TextGroup size={size} weight="bold">
      {props.children}
    </TextGroup>
  );
};
