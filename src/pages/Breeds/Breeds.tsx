import List from "../../components/List";
import ListItem from "../../components/List/components/ListItem";
import useBreeds from "../../hooks/useBreeds";
import InfoCard from "../../components/InfoCard";

const Breeds = () => {
  const { data, loading, error } = useBreeds();

  return (
    <div>
      <h1 className="text-center pb-2">
        Learn more about cat breeds <span>&#128269;</span>
      </h1>{" "}
      <List>
        {loading && <InfoCard status="info">{"Loading"}</InfoCard>}
        {error && <InfoCard status="error">{"Something went wrong"}</InfoCard>}
        {data.map((breed) => (
          <ListItem key={breed.id} onClick={() => console.log(breed)}>
            <h3>{breed.name}</h3>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Breeds;
