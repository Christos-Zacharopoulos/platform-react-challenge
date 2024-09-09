export type ImgProps = {
    src: string;
    alt: string;
    style?: Record<string, string>;
    onClick?: () => void;
};

const Img = ({ src, ...rest }: ImgProps) => {
    return (
        <img src={src} {...rest} className="w-[200px] h-[200px] rounded-full" />
    );
};

export default Img;
