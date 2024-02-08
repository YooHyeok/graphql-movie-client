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

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import client from './apollo'; //클라이언트 쿼리조회 테스트

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
```
위와 같이 전역 컴포넌트에 import만 해도 조회가 된다.


## React Apollo-Client 적용

`ApolloProvider`를 사용하여 DOM 전역으로 client 객체를 제공해준다.

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import client from './apollo'; //클라이언트 쿼리조회 테스트

import { ApolloProvider } from '@apollo/client';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
```

각 컴포넌트에서 Provider로 부터 client를 제공받을 때에는 `useApolloClient`를 사용한다.
```js
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
```