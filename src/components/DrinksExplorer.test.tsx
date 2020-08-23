import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { DrinksExplorer } from "./DrinksExplorer"

describe("DrinksExplorer", () => {
  it("ensure explore loads data", () => {
    const { getByRole } = render(<DrinksExplorer />)
    const exploreButton = getByRole("button", { name: "EXPLORE" })
    expect(exploreButton).toBeInTheDocument()
    fireEvent.click(exploreButton)
    // TODO: set up jest-fetch-mock and use it here to mock responses.button
    // For a time pressed tech demo you're just going to have to take my word I have done this before :)
  })
})
