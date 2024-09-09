import { PropsWithChildren } from 'react';

export type ListItemProps = {
    onClick?: () => void;
};

const ListItem = ({ onClick, children }: PropsWithChildren<ListItemProps>) => {
    return (
        <div
            onClick={onClick}
            className="p-3 cursor-pointer flex flex-col gap-2 items-center rounded-md  bg-slate-600"
        >
            {children}
        </div>
    );
};

export default ListItem;
