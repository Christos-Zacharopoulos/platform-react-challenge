import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [cats, setCats] = useState<any[]>([]);

  useEffect(() => {
    fetchRandomCats();
  }, []);

  const fetchRandomCats = async () => {
    const { data } = await axios.get(
      "https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=REPLACE_ME"
    );

    setCats((prevCats) => [...prevCats, ...data]);
  };

  return (
    <div>
      <div>
        {cats.map((cat) => (
          <div key={cat.id}>
            <img
              src={cat.url}
              alt="random cat"
              style={{
                width: "200px",
                height: "200px",
                margin: "10px",
                cursor: "pointer",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
