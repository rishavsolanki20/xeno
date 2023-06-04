import { BrowserRouter as Router,Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ContactList from './Components/ContactList';
import Navbar from './Components/NavBar';
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			setUser(data.user._json);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

  return (
    <div className="App">
      <Navbar />
      <ContactList />
    </div>
  );
}

export default App;