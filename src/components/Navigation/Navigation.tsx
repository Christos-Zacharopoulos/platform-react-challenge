import { useNavigate } from "react-router-dom";
import { routing } from "../../config/routing";
import Button from "../Button";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-2 flex justify-center">
      <Button onClick={() => navigate(routing.home())}>Cats </Button>
      <Button onClick={() => navigate(routing.breeds())}>Breeds </Button>
      <Button onClick={() => navigate(routing.favorites())}>Favorites</Button>
    </div>
  );
};

export default Navigation;
