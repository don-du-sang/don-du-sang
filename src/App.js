import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {Navbar, Nav, Dropdown, a} from 'react-bootstrap'; 
// get our fontawesome imports
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from 'react-bootstrap-icons';

function App() {
	return (
		<div className="App">
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="#home">Don du Sang</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="#home">Donner</Nav.Link>
					<Nav.Link href="#features">Informations utiles</Nav.Link>
					<Nav.Link href="#pricing">Nous contacter</Nav.Link>
				</Nav>
				<a className="mr-2" href="https://www.facebook.com/EtablissementFrancaisduSang"><Icon.Facebook/></a>
				<a className="mr-2" href="https://www.instagram.com/efs_officiel/"><Icon.Instagram/></a>
				<a className="mr-2" href="https://twitter.com/EFS_Sante"><Icon.Twitter/></a>
				<a className="mr-2" href="https://www.youtube.com/channel/UCSX_fuF6fwK2LOs8YV6xPWg"><Icon.Youtube/></a>
				<a className="mr-2" href="https://www.linkedin.com/company/efs/"><Icon.Linkedin/></a>
				<Dropdown>
				  <Dropdown.Toggle variant="success" id="dropdown-basic">
					<FontAwesomeIcon icon={faUser} />
				  </Dropdown.Toggle>

				  <Dropdown.Menu>
					<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
					<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
					<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
				  </Dropdown.Menu>
				</Dropdown>
			</Navbar>
		</div>
	);
}

export default App;
