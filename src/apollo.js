import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri:"http://localhost:4000/", /* graphQL API server url */
  cache: new InMemoryCache(), /* 데이터 캐시 객체 */
})

/* 클라이언트 쿼리조회 테스트 */
/* client.query({
  query: gql `
    {
      allMovies {
        title
      }
    }
  `
}).then(data=>console.log(data)) */

export default client