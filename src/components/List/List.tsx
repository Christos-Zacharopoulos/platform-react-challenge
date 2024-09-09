import { PropsWithChildren } from 'react';

export type ListProps = {};

const List = ({ children }: PropsWithChildren<ListProps>) => {
    return (
        <div className="flex flex-wrap gap-3 justify-center">{children}</div>
    );
};

export default List;
