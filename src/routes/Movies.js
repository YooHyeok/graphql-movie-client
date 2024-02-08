import { gql, useApolloClient } from "@apollo/client"
import { useEffect, useState } from "react";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const client = useApolloClient();
  useEffect(()=>{
    
    client.query({
      query: gql `
        {
          allMovies {
            id
            title
          }
        }
      `
    }).then(result=>setMovies(result.data.allMovies))
  }, [client])

  return <div>
    <ul>
      {movies.map(movie=> (<li key={movie.id}>{movie.title}</li>))} 
      </ul>
  </div>
}