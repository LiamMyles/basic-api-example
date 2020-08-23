import React from "react"
import styled, { css } from "styled-components"

import { DrinksExplorer } from "./components/DrinksExplorer"

import drinksLogo from "./images/beer-icon-large.png"

const Main = styled.main`
  ${({ theme }) => css`
    background: ${theme.background};
  `}
`

const HeadingH1 = styled.h1`
  ${({ theme }) => css`
    color: ${theme.text};
    font-weight: bold;
    font-size: 30px;
    text-align: center;
    margin: 10px;
  `}
`

const LogoImg = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 50px;
`
const ExploreH2 = styled.h2`
  ${({ theme }) => css`
    color: ${theme.text};
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    margin: 10px;
  `}
`

function App() {
  return (
    <Main>
      <HeadingH1>Welcome to the World of Drinks</HeadingH1>
      <LogoImg src={drinksLogo} alt="drinks logo" />
      <ExploreH2>
        Why not explore all of the wonderful drink related events!
      </ExploreH2>

      <DrinksExplorer />
    </Main>
  )
}

export default App
