import { gql, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Image = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id:$movieId) {
      id
      title
      medium_cover_image
      rating
      isLiked @client # local only fields
    }
  }
`

export default function Movie() {
  const params = useParams()
  const {data, loading, client: {cache}} = useQuery(GET_MOVIE, {variables: {
    movieId: params.id
  }})
  const onClick = () => {
    console.log(data.movie.isLiked)
    cache.writeFragment({
      id: `Movie:${params.id}`,
       fragment: gql`fragment MovieFragment on Movie {isLiked}`, 
       data:{isLiked: !data.movie.isLiked},
    })
  }
  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading..." : `${data.movie?.title}`}</Title>
        <Subtitle>⭐️ {data?.movie?.rating}</Subtitle>
        <button onClick={onClick}>{data?.movie?.isLiked? "UnLike":"Like"}</button>
      </Column>
      <Image bg={data?.movie?.medium_cover_image} />
    </Container>
  );
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
