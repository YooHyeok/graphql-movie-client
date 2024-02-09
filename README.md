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
import { useEffect, useState } from "react";

export default function Movies() {
  const [data, setData] = useState([]);
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
    }).then(setData)
  }, [])
  
  return <div>{JSON.stringIfy(data.allMovies)}</div>
}
```

## useQuery 선언형 방식
이전에 적용했던 코드 방식은 명령형 코드 방식이다.
명령형 코드는 단계별로 진행된다.
이전 코드방식은 useEffect를 사용하여 client가 로딩되면 client로 부터 query함수를 통해 쿼리 요청을 보낸뒤, useState를 통해 state에 저장하는 등의 단계로 진행된다.

선언형 방식은 이러한 단계를 생략하고 원하는것을 작성하기만한다.
apollo/client에서는 useEffect, useState, useApolloClient 훅들을 생략하고 useQuery라는 단 하나의 훅으로만 조회를 할 수 있도록 제공해준다.

```js
import {gql, useQuery } from "@apollo/client"

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
  const result = useQuery(ALL_MOVIES)
  
  return <div>{JSON.stringIfy(result.allMovies)}</div>
}
```

실제 코드상에서는 코드량의 차이가 얼마 없지만, 반환받는 여러 데이터값의 활용에 따라 코드차이가 확연히 난다.

```js
import { gql, useApolloClient } from "@apollo/client"
import { useEffect, useState } from "react";

export default function Movies() {
  const [{data, loading, error}=result, setResult] = useState({data: null, loading: true, error: false });
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
    }).then(result=>{
      setResult(result)
    }).catch(error=>{
      console.log(error)
      setResult(result=>({...result, error:true}))
    })
  }, [client])

  const {data, loading, error} = result
  if(!error && (loading)) {
    return <h1>Loading....</h1>
  }
  if(error) {
    return <h1>Could not fetch :(</h1>
  }
    return (<div>
    <ul>
      {data.allMovies.map(movie=> (<li key={movie.id}>{movie.title}</li>))} 
      </ul>
  </div>)
} 
```
반환받는 데이터에는 data, loading이 함께 딸려오는데 여러 데이터들을 토대로 다른 출력 결과물을 반환하는 코드를 작성한다면, 위의 명령형코드 보다 선언형 코드 방식이 훨씬 간결해진다.

```js
import {gql, useQuery } from "@apollo/client"

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
    {data.allMovies.map(movie=> (<li key={movie.id}>{movie.title}</li>))} 
      </ul>
  </div>
}
```

## useQuery와 variables
useQuery의 두번째 인자에 넣어준다.
이때 gql에 선언한 SDL query의 별칭은 필수이다.

```js
const GET_MOVIE = gql`
  query getMovie($movieId: String!) { # 별칭과 arg타입을 지정하여 넘겨야 한다.
    movie(id:$movieId) {
      id
      title
    }
  }
`
```

```js
useQuery(GET_MOVIE, {variables: {
    movieId: params.id
  }})
```

