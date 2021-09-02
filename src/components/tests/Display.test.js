import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Display from "../Display";

import fetchShow from "../../api/fetchShow";
jest.mock("../../api/fetchShow");

const testShow = {
  //add in approprate test data structure here.
  name: "Fake Show",
  summary: "Fake show summary",
  seasons: [
    { id: 1, name: "Fake Season 1", episodes: [] },
    { id: 2, name: "Fake Season 2", episodes: [] },
    { id: 3, name: "Fake Season 3", episodes: [] },
  ],
};

test("Display component renders without errors or passed in props", () => {
  render(<Display />);
});

test("when the fetch button is pressed the show component displays with number of select options equal to number of seasons in testShow data", async () => {
  //mocks:
  fetchShow.mockResolvedValueOnce(testShow);
  const fakeDisplayFunc = jest.fn();

  render(<Display displayFunc={fakeDisplayFunc} />);

  const button = screen.getByRole("button");
  userEvent.click(button);

  await waitFor(() => {
    expect(screen.getByTestId("show-container"));
    expect(screen.getAllByTestId("season-option")).toHaveLength(3);
    expect(fakeDisplayFunc).toHaveBeenCalled();
  });
});

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
