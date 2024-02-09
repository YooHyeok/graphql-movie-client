import { gql, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id:$movieId) {
      id
      title
    }
  }
`

export default function Movie() {
  const params = useParams()
  const {data, loading, error} = useQuery(GET_MOVIE, {variables: {
    movieId: params.id
  }})
  if(loading) {
    return <h1>Fetcing movie....</h1>
  }
  if(error) {
    console.log(error)
    return <h1>Could not fetch :(</h1>
  }
  return <div>{data.movie.title}</div>
}
