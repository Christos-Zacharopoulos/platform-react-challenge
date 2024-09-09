import { useNavigate } from "react-router-dom";
import { routing } from "../../config/routing";
import Button from "../Button";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate(routing.home())}>Cats </Button>
      <Button onClick={() => navigate(routing.breeds())}>Breeds </Button>
      <Button onClick={() => navigate(routing.favorites())}>&#10084;</Button>
    </>
  );
};

export default Navigation;
