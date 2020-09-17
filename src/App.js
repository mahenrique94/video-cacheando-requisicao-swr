import React from 'react'
import axios from 'axios'
import useSWR from 'swr'

const fetcher = (...params) => axios
  .get(...params)
  .then(resp => resp.data)

const useProjectInfo = () => {
  const { data, error } = useSWR(
    'https://api.github.com/repos/mahenrique94/jlib',
    fetcher
  )

  return {
    isLoading: !data && !error,
    data,
    error,
  }
}

const Name = () => {
  const { data } = useProjectInfo()
  return <h1>Projeto: {data.name}</h1>
}

const Stars = () => {
  const { data } = useProjectInfo()
  return <h3>Estrelas: {data.stargazers_count}</h3>
}

const App = () => {
  const {isLoading, error} = useProjectInfo()

  if (isLoading) {
    return <h1>Buscando dados do projeto...</h1>
  }

  if (error) {
    return <h1>Deu erro: {error.message}</h1>
  }
  
  return (
    <>
      <Name />
      <Stars />
    </>
  )
}

export default App
