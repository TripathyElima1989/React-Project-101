import logo from './logo.svg'; // Importing logo (not used here but usually for display in the app)
import './App.css'; // Importing CSS for styling
import React from 'react'; // Importing React to create components

// FileItemRow component displays each URL in a list item (<li>)
class AffiliationsIterRow extends React.Component {
  render(){
    return(
      <li>{this.props.url}</li>
    )
  }
}

// StarWars component fetches and displays data about a random Star Wars character
class StarWars extends React.Component {
  constructor() {
    super() // Calls the constructor of React.Component
    // Initializing the state to manage character data
    this.state = {
      loadedCharacter: false, // Boolean flag to track if a character is loaded
      name: null, // Will store the name of the character
      height: null, // Will store the height of the character
      homeworld: null, // Will store the homeworld URL of the character
      image: null,
      wiki: null,
      affiliations: [], // Will store an array of films the character appeared in
    }
  }

  // Function to fetch a random character's data from the Star Wars API
  getNewCharacter(){
    // Generates a random number between 1 and 82 (the total number of characters in the API)
    const randomNumber = Math.round(Math.random() * 88)
    // URL to fetch data about the character with the generated number
    const url = `https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/id/${randomNumber}.json`
    
    // Fetch request to get character data from the API
    fetch(url)
         .then(Response => Response.json()) // Converts the response into JSON
         .then(data => {
          console.log(data) // Log the fetched data for debugging purposes
          
          // Updates the state with the fetched character data
          this.setState({
            name: data.name, // Set the name of the character
            height: data.height, // Set the height of the character
            homeworld: data.homeworld, // Set the URL of the character's homeworld
            image: data.image,
            wiki: data.wiki,
            affiliations: data.affiliations, // Set the films the character appeared in (URLs)
            loadedCharacter: true, // Set flag to indicate character data is loaded
          })
         })
  }

  render(){
    // Mapping through the films array and creating a FileItemRow component for each film URL
    const affiliations = this.state.affiliations.map((url, i) => {
      return <AffiliationsIterRow key={i} url={url}/> // Each FileItemRow component gets a unique key and URL
    })
    
    return(
      <div>
        {
          // Conditional rendering: only display character details if 'loadedCharacter' is true
          this.state.loadedCharacter &&
          <div>
          <img src={this.state.image} height={200} alt={this.state.name}/>
          <h1><a href={this.state.wiki}>{this.state.name}</a></h1>
          <p>Height:<br></br>{this.state.height} m</p>
          <p>Homeworld:<br></br>{this.state.homeworld}</p>
          <ul>
          Affiliations:{affiliations}
          </ul>
        </div>
        }
       
        {/* Button that triggers the 'getNewCharacter' function to fetch a new random character */}
        <button type="button" 
        onClick={() => this.getNewCharacter()} className='btn'>
          Randomize Character
        </button>
      </div>
    )
  }
}

// App component is the root of the application and renders the StarWars component
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Rendering the StarWars component */}
        <StarWars/>
      </header>
    </div>
  );
}

// Export the App component as the default export for use in other parts of the app
export default App;
