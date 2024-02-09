import { gql, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id:$movieId) {
      id
      title
      small_cover_image
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

// import { gql, useApolloClient } from "@apollo/client"
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"

// export default function Movies() {
//   const params = useParams()
//   const [result, setResult] = useState({data: null, loading: true, error: false });
//   const client = useApolloClient();
//     /**
//      * 명령형 코드
//      * client가 로딩되면 쿼리요청을 보낸 뒤 state에 저장하는 등의
//      * 단계별로 진행된다.
//      */
//   useEffect(()=>{
//     client.query({
//       query: gql`
//         query getMovie($movieId: String!) {
//           movie(id: $movieId) {
//             id
//             title
//           }
//         }
//       `,
//       variables: {
//         movieId: params.id
//       }
//     }).then(result=>{
//       setResult(result)
//     }).catch(error=>{
//       console.log(error)
//       setResult(result=>({...result, error:true}))
//     })
//   }, [client])
//   const {data, loading, error} = result
//   if(!error && (loading)) {
//     return <h1>Loading....</h1>
//   }
//   if(error) {
//     return <h1>Could not fetch :(</h1>
//   }
//   return <div>{data.movie.title}</div>
// } 
