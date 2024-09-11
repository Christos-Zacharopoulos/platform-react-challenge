import { PropsWithChildren } from "react";

export type ListProps = {};

const List = ({ children }: PropsWithChildren<ListProps>) => {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-9 justify-center">
      {children}
    </div>
  );
};

export default List;
