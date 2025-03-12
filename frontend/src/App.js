import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

const URL = "http://localhost:3000";

function App() {
  const [data, setData] = useState([]); // Initialize data state to store user list
  const [inputValue, setInputValue] = useState(""); // Initialize input value state

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  // Function to fetch data from the server
  const fetchData = async () => {
    try {
      const response = await axios.get(URL + "/user");
      console.log(response.data);
      setData(response.data); // Update state with fetched data
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle input change and update the inputValue state
  const handleChange = (e) => {
    setInputValue(e.target.value); // Update input value in state
  };

  // Function to post data to the server
  const postData = async () => {
    try {
      const response = await axios.post(URL + "/user", { name: inputValue }); // Post with user input
      console.log(response.data);
      fetchData(); // Fetch data again after posting to update the list
    } catch (error) {
      console.error(error);
    }
  };

  const dbinit = async () => {
    try {
      const response = await axios.post(URL + "/dbinit");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const tbinit = async () => {
    try {
      const response = await axios.post(URL + "/tbinit");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>User Please Submit Form</h1>
      <input name="input-parameter" onChange={handleChange} /> {/* Input field with change handler */}
      <br />
      <br />
      <button onClick={postData}>Submit</button> {/* Button to post input value */}
      <br />
      <br />
      <button style={{ backgroundColor: "red" }} onClick={dbinit}>DB Init</button> {/* Button to initialize database */}
      <br />
      <br />
      <button style={{ backgroundColor: "orange" }} onClick={tbinit}>Table Init</button> {/* Button to initialize table */}
      <br />
      <hr />
      <h2>Users List</h2>
      <center>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </div>
  );
}

export default App;
