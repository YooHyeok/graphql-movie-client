import {gql, useQuery } from "@apollo/client"
import { Link } from "react-router-dom"

const ALL_MOVIES = gql`
  query getMovies {
    allMovies 
      {
        id
        title
      }
  }
`

export default function Movies() {

  /**
   * 선언형 코드
   * 단계별로 진행하지 않고, 원하는것을 작성하기만 한다.
   */
  const {data, loading, error} = useQuery(ALL_MOVIES)
  if(loading) {
    return <h1>Loading....</h1>
  }
  if(error) {
    console.log(error)
    return <h1>Could not fetch :(</h1>
  }
  return <div>
    <ul>
    {data.allMovies.map(movie=> (<li key={movie.id}><Link to={`/movies/${movie.id}`}>{movie.title}</Link></li>))} 
      </ul>
  </div>
}

// import { gql, useApolloClient } from "@apollo/client"
// import { useEffect, useState } from "react";

// export default function Movies() {
//   // const [movies, setMovies] = useState([]);
//   const [result, setResult] = useState({data: null, loading: true, error: false });
//   const client = useApolloClient();
//     /**
//      * 명령형 코드
//      * client가 로딩되면 쿼리요청을 보낸 뒤 state에 저장하는 등의
//      * 단계별로 진행된다.
//      */
//   useEffect(()=>{
//     client.query({
//       query: gql `
//         {
//           allMovies {
//             id
//             title
//           }
//         }
//       `
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
//     return (<div>
//     <ul>
//       {data.allMovies.map(movie=> (<li key={movie.id}>{movie.title}</li>))} 
//       </ul>
//   </div>)
// } 
