import Img from "../../../../components/Img";
import { Breed } from "../../../../api/breeds/types";
import useImage from "../../../../hooks/useImage";

type BreedImgProps = {
  id: Breed["reference_image_id"];
};

const BreedImg = ({ id }: BreedImgProps) => {
  const { data } = useImage(id);

  if (!data) {
    return (
      <Img
        src={"https://media.tenor.com/KEzW7ALwfUAAAAAM/cat-what.gif"}
        alt={"breed-image"}
      />
    );
  }

  return <Img src={data.url} alt={"breed-image"} />;
};

export default BreedImg;
