import axios from "axios";
import { useState } from "react";

const FetchMovies = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const sendReq = async () => {
    try {
      setLoading(false);
      const getmovies = await axios("https://swapi.dev/api/films");
      console.log(getmovies.data);
      setMovies(getmovies);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return {
    sendReq,
    movies,
    loading
  };
};

export default FetchMovies;
