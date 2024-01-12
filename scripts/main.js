import { delay } from "./helpers/delay.js";
///////////////////////////////////////////////////////////////////////////////////////////////////////
// This is a simple application to help better understand how a program is being run  /////////////////
// when asynchronous functions are involved ///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////
// First, we'll append each message, one at a time, to our HTML element "#container" //////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
const container = document.querySelector("#container");
container.innerHTML += `<div class="outsideFunction">Let's see how this asynchronous function runs...</div>`;

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Next, let's define our async/await function that we will use to make a fetch to the local API //////
///////////////////////////////////////////////////////////////////////////////////////////////////////
const fetchedMessage = async () => {
    container.innerHTML += `<div class="inFunction">This message is inside of the asynchronous function BEFORE the "await" fetch call</div>
                            <div class="inFunction">No other lines of code in this function will run until the promise is resolved.</div>`;
    
    const response = await fetch("http://localhost:8088/messages");
    const messages = await response.json();

    /*This helper function adds a 1/2 second delay to simulate a slower network*/
    await delay(500) 

    container.innerHTML += `<div class="inFunction">This message is inside of the asynchronous function AFTER the "await" fetch call</div>`;
    container.innerHTML += `<div class="inFunction">Now that the promise is resolved, let's print the message we just fetched from the API:</div>`;
    let fetchedMessage = `<div id="secretMessage">`;
    let divStringArray = messages.map(
        (message) => {
            return message.word;
        }
    );
    // Print the fetched message
    fetchedMessage += `${divStringArray.join("")}</div>`;
    container.innerHTML += fetchedMessage;
};

/////////////////////////////////////////////////////
// We'll invoke the function here ///////////////////
/////////////////////////////////////////////////////
container.innerHTML += `<div class="outsideFunction">Let's invoke the function</div>`;
fetchedMessage();

///////////////////////////////////////////////////////////////////////////////////////////////////
// Here are some messages that are outside of the async/await function to show that the program ///
// will keep running //////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
container.innerHTML += `<div class="outsideFunction">This message is completely outside of the asynchronous function</div>`;
container.innerHTML += `<div class="outsideFunction">The program will keep running even if the promise isn't resolved yet!</div>`;


