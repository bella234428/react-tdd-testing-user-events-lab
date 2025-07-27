import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setInterests((prev) =>
      checked ? [...prev, value] : prev.filter((i) => i !== value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <h1>Newsletter Signup</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <fieldset>
          <legend>Select your interests</legend>
          <label>
            <input
              type="checkbox"
              value="React"
              onChange={handleCheckbox}
              checked={interests.includes("React")}
            />
            React
          </label>
          <label>
            <input
              type="checkbox"
              value="JavaScript"
              onChange={handleCheckbox}
              checked={interests.includes("JavaScript")}
            />
            JavaScript
          </label>
          <label>
            <input
              type="checkbox"
              value="CSS"
              onChange={handleCheckbox}
              checked={interests.includes("CSS")}
            />
            CSS
          </label>
        </fieldset>

        <button type="submit">Sign Up</button>
      </form>

      {submitted && (
        <div>
          <h2>
            Thank you {name}! You signed up with {email}.
          </h2>
          <p>Your interests: {interests.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export default App;
