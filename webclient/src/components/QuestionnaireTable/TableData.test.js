import TableData from "./TableData2";
import { render, fireEvent, screen } from "@testing-library/react";

describe("TableData", () => {
  it("should render", () => {
    const { asFragment } = render(<TableData name="Never" ans={1} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
