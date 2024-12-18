import axios from "axios";
import { useEffect, useState } from "react";
import "../component/pokemon.css";

export function Pokemon() {
  let url = "https://ashwini-2-default-rtdb.firebaseio.com/pokemons/.json";
  let [data, setdata] = useState([]);
  let [selected, setselected] = useState({
    id: 1,
    name: "bulbasaur",
    description:
      "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.get(url);
        setdata(response.data);
        setselected(response.data[1]);
        console.log(response.data);
      } catch (error) {
        console.log("error in fetching data", error);
      }
    }
    fetchData();
  }, []);

    function handlename(e) {
        const orgname = e.target.value;
      const newdata = data.find((item) => {
        return item !== null && item.name === orgname;
      });
        setselected(newdata);
      console.log(newdata)  
    }

    function handlebutton(i) {
        let currentpage = selected.filter((index) => index.id + i)
        setselected(currentpage)
    }

  return (
    <>
      <div className="sel-center">
        <select onChange={handlename}>
          {data.map((ele) => {
            if (ele !== null) {
              return (
                <option key={ele.id} value={ele.name}>
                  {ele.name}
                </option>
              );
            }
          })}
        </select>
      </div>
      <div className="parent">
        <div className="card" key={selected.id}>
          <img src={selected.image} alt="image" />
          <h1>Name: {selected.name}</h1>
          <h1>Description: {selected.description}</h1>
        </div>
      </div>
      <div className="but-div">
              <button onChange={() => handlebutton(-1)}>Previous</button>
              <button onChange={() => handlebutton(1)}>Next</button>
      </div>
    </>
  );
}
