import { gql, useApolloClient } from "@apollo/client"
import { useEffect } from "react";

export default function Movies() {
  const client = useApolloClient();
  useEffect(()=>{
    
    client.query({
      query: gql `
        {
          allMovies {
            title
          }
        }
      `
    }).then(result=>console.log(result))
  }, [])
  
  return <div>This Is a List of Movie </div>
}