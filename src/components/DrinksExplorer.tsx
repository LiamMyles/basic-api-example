import React, { useState } from "react"
import styled, { css } from "styled-components"

import { DrinksEvents } from "../components/DrinksEvents"

import { Event } from "../interfaces/EventsInterfaces"

const ExploreButton = styled.button`
  ${({ theme }) => css`
    color: ${theme.darkText};
    border: 3px solid ${theme.border};
    background: ${theme.darkBackground};
    border-radius: 10px;
    font-weight: bold;
    font-size: 15px;
    margin: 0 auto;
    padding: 5px 10px;
    display: block;
  `}
`

const SpinnerDiv = styled.div`
  text-align: center;
`

export const DrinksExplorer = () => {
  const [eventsData, setEventsData] = useState<null | [Event]>(null)
  const [eventsLoaded, setEventsLoaded] = useState<
    "NOT_STARTED" | "LOADING" | "LOADED"
  >("NOT_STARTED")

  const fetchData = async () => {
    const response = await fetch(
      "https://mock-api.drinks.test.siliconrhino.io/events"
    )
    const json = await response.json()

    setEventsData(json)
    setEventsLoaded("LOADED")
  }

  const exploreClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setEventsLoaded("LOADING")
    fetchData()
  }

  switch (eventsLoaded) {
    case "NOT_STARTED":
      return (
        <ExploreButton type="button" onClick={exploreClick}>
          EXPLORE
        </ExploreButton>
      )
    case "LOADING":
      return <SpinnerDiv>Spinner</SpinnerDiv>
    case "LOADED":
      return (
        <>
          {eventsData !== null ? (
            <DrinksEvents events={eventsData}></DrinksEvents>
          ) : (
            <p>Error Message</p>
          )}
        </>
      )
  }
}
