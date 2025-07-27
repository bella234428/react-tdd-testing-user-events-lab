import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("form inputs are initially empty", () => {
  render(<App />);
  expect(screen.getByLabelText(/name/i)).toHaveValue("");
  expect(screen.getByLabelText(/email/i)).toHaveValue("");
});

test("checkboxes are initially unchecked", () => {
  render(<App />);
  const checkboxes = screen.getAllByRole("checkbox");
  checkboxes.forEach((box) => expect(box).not.toBeChecked());
});

test("user can type in name and email", () => {
  render(<App />);
  userEvent.type(screen.getByLabelText(/name/i), "Alice");
  userEvent.type(screen.getByLabelText(/email/i), "alice@email.com");
  expect(screen.getByLabelText(/name/i)).toHaveValue("Alice");
  expect(screen.getByLabelText(/email/i)).toHaveValue("alice@email.com");
});

test("user can select interests", () => {
  render(<App />);
  const reactBox = screen.getByLabelText(/react/i);
  userEvent.click(reactBox);
  expect(reactBox).toBeChecked();
});

test("submitting shows success message with name and email", () => {
  render(<App />);

  userEvent.type(screen.getByLabelText(/name/i), "Bob");
  userEvent.type(screen.getByLabelText(/email/i), "bob@email.com");
  userEvent.click(screen.getByLabelText(/react/i));
  userEvent.click(screen.getByRole("button", { name: /sign up/i }));

  expect(
    screen.getByText(/thank you bob! you signed up with bob@email.com/i)
  ).toBeInTheDocument();

  expect(screen.getByText(/your interests: react/i)).toBeInTheDocument();
});
