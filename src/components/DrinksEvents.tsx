import React, { useState } from "react"
import styled, { css } from "styled-components"

import { Event, EventComment, User } from "../interfaces/EventsInterfaces"

import beerIcon from "../images/beer-icon.png"
import cocktailIcon from "../images/cocktail-icon.png"
import coffeeIcon from "../images/coffee-icon.png"
import milkshakeIcon from "../images/milkshake-icon.png"

const GridDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px;
`
const EventCardDiv = styled.div`
  min-width: 320px;
  min-height: 250px;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  ${({ theme }) => css`
    border: 5px solid ${theme.border};
    color: ${theme.darkText};
    background: ${theme.darkBackground};
  `}
`

const EventCardH3 = styled.h3`
  font-size: 18px;
  margin: 0 0 10px;
`
const EventCardMetaDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CreatorWrappingDiv = styled.div`
  margin: 10px 0;
`

export const DrinksEvents: React.FC<{ events: Event[] }> = ({ events }) => {
  return (
    <GridDiv>
      {events.map((event) => {
        const eventDate = new Date(event.time)
        return (
          <EventCardDiv key={event.id}>
            <EventCardH3>{event.title}</EventCardH3>
            <EventCardMetaDiv>
              <EventType eventType={event.type} />
              <p>
                {`${eventDate.toDateString()} at ${eventDate.toLocaleTimeString()}`}
              </p>
            </EventCardMetaDiv>
            <CreatorWrappingDiv>
              <p>Event Owner</p>
              <Avatar name={event.creator.name} url={event.creator.avatarUrl} />
            </CreatorWrappingDiv>
            <GuestsAndComments
              eventGuests={event.guests}
              eventComments={event.comments}
            />
          </EventCardDiv>
        )
      })}
    </GridDiv>
  )
}

const AvatarDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const AvatarImg = styled.img`
  width: 75px;
  height: 75px;
  margin: 10px 0;
  border-radius: 5px;
  ${({ theme }) => css`
    border: 3px solid ${theme.border};
  `}
`

const Avatar: React.FC<{ url: string; name: string }> = ({ url, name }) => {
  return (
    <AvatarDiv>
      <AvatarImg src={url} alt="" /> <span>{name}</span>
    </AvatarDiv>
  )
}

const EventTypeWrappingDiv = styled.div`
  display: flex;
  align-items: center;
`

const EventTypeIconImg = styled.img`
  width: 25px;
  padding: 0 10px 0 0;
`

const EventType: React.FC<{
  eventType: "BEERS" | "COCKTAILS" | "COFFEES" | "MILKSHAKES"
}> = ({ eventType }) => {
  switch (eventType) {
    case "BEERS":
      return (
        <EventTypeWrappingDiv>
          <EventTypeIconImg src={beerIcon} alt="" /> Beers
        </EventTypeWrappingDiv>
      )
    case "COCKTAILS":
      return (
        <EventTypeWrappingDiv>
          <EventTypeIconImg src={cocktailIcon} alt="" /> Cocktails
        </EventTypeWrappingDiv>
      )
    case "COFFEES":
      return (
        <EventTypeWrappingDiv>
          <EventTypeIconImg src={coffeeIcon} alt="" /> Coffees
        </EventTypeWrappingDiv>
      )
    case "MILKSHAKES":
      return (
        <EventTypeWrappingDiv>
          <EventTypeIconImg src={milkshakeIcon} alt="" /> Milkshakes
        </EventTypeWrappingDiv>
      )
  }
}

const GuestsAndCommentsWrappingDiv = styled.div`
  display: flex;
  justify-content: space-around;
`

const GuestsAndCommentsButton = styled.button`
  font-size: 15px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  ${({ theme }) => css`
    background: ${theme.background};
    border: solid 3px ${theme.border};
    colour: ${theme.text};
  `}
`

const GuestWrappingDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
`

const GuestsAndComments: React.FC<{
  eventComments: EventComment[]
  eventGuests: User[]
}> = ({ eventComments, eventGuests }) => {
  const [showExtraContent, setShowExtraContent] = useState<
    "HIDE" | "GUESTS" | "COMMENTS"
  >("HIDE")

  const GuestMouseEventHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (showExtraContent !== "GUESTS") {
      setShowExtraContent("GUESTS")
    } else {
      setShowExtraContent("HIDE")
    }
  }
  const CommentMouseEventHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (showExtraContent !== "COMMENTS") {
      setShowExtraContent("COMMENTS")
    } else {
      setShowExtraContent("HIDE")
    }
  }

  return (
    <>
      <GuestsAndCommentsWrappingDiv>
        <GuestsAndCommentsButton onClick={GuestMouseEventHandler}>
          {showExtraContent !== "GUESTS" ? "Show" : "Hide"} Guests
        </GuestsAndCommentsButton>
        <GuestsAndCommentsButton onClick={CommentMouseEventHandler}>
          {showExtraContent !== "COMMENTS" ? "Show" : "Hide"} Comments
        </GuestsAndCommentsButton>
      </GuestsAndCommentsWrappingDiv>
      {showExtraContent !== "HIDE" && (
        <>
          {showExtraContent === "GUESTS" && (
            <GuestWrappingDiv>
              {eventGuests.map(({ name, avatarUrl }) => (
                <Avatar name={name} url={avatarUrl} key={name} />
              ))}
            </GuestWrappingDiv>
          )}
          {showExtraContent === "COMMENTS" && (
            <div>
              {eventComments.map(
                ({ user: { name, avatarUrl }, timestamp, message }) => {
                  const eventDate = new Date(timestamp)
                  return (
                    <React.Fragment key={timestamp}>
                      <Avatar name={name} url={avatarUrl} key={name} />
                      <p>{`${eventDate.toDateString()} at ${eventDate.toLocaleTimeString()}`}</p>
                      <p>{message}</p>
                    </React.Fragment>
                  )
                }
              )}
            </div>
          )}
        </>
      )}
    </>
  )
}
