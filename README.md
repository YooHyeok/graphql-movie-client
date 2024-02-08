# GraphQL을 활용한 React Movie App


## *프로젝트 셋업 *

<details>
  <summary> 상세보기 </summary>
  
  　  　
 - `Apollo Client 설치`
    ```
    > npm install @apollo/client graphql
    ```
 - `React-Router-Dom 설치`
    ```
    > npm install react-router-dom@6
    ```
</details>

## *apollo client 구축*

Apollo Client는 요청할 GraphQL API가 구축된 Apollo Server와 연결을 도와준다.    
GraphQL API를 구동시켜주는 Apollo Server의 uri를 입력하고 데이터를 캐싱할 객체를 지정하여 client객체를 생성한다.   

생성된 client객체로 부터 query메소드를 통해 쿼리를 직접 입력하여 조회한다.

```js
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri:"http://localhost:4000/", /* graphQL API server url */
  cache: new InMemoryCache(), /* 데이터 캐시 객체 */
})

client.query({
  query: gql `
    {
      allMovies {
        title
      }
    }
  `
}).then(data=>console.log(data))
```
