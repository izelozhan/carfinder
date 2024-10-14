import { useState } from "react";
import SearchBox from "./search-box/search-box";
import SelectedItems from "./selected-items/selected-items";
import SearchResultType from "./search-box/search-result-type";
import { useNavigate } from "react-router-dom";
import env from "./environment";

const Home: React.FC = () => {
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [added, setAdded] = useState<SearchResultType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const addToList = (result: SearchResultType) => {
    console.log(result);
    setAdded((curr) => [...curr, result]);
    setRatings((curr) => ({
      ...curr,
      [result.id]: 3,
    }));
  };

  const deleteFromAdded = (item: SearchResultType) => {
    setAdded((curr) => {
      return curr.filter((i) => i.id != item.id);
    });
  };

  const onRatingsChange = (id: number, rating: number) => {
    setRatings((curr) => ({
      ...curr,
      [id]: rating,
    }));
  };

  const findBestCar = () => {
    setLoading(true);
    fetch(`${env.apiUrl}/find/`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(ratings),
    })
      .then((res) => res.json())
      .then(({ foundCarName }) => {
        setLoading(false);
        navigate(`/best-pick/${encodeURIComponent(foundCarName)}`);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };

  return (
    <>
      <SearchBox addedIds={added.map((i) => i.id)} onAdded={addToList} />

      <SelectedItems
        ratings={ratings}
        onRatingsChange={onRatingsChange}
        deleteFromAdded={deleteFromAdded}
        items={added}
      />

      <button
        onClick={findBestCar}
        className="findMeButton uppercase bg-white text-black mt-4"
        disabled={added.length != 3 || loading}
      >
        Find my next car
      </button>
    </>
  );
};

export default Home;
