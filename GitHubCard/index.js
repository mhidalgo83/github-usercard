/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

//Gets class for div that we need to append cards to
const cards = document.querySelector(".cards");

//Axios call that gets user profile
axios
  .get("https://api.github.com/users/mhidalgo83")
  .then(res => {
    //Captures data in variable
    const userData = res.data;
    
    //Creates card with user data
    const newGitHubCard = gitHubCard(userData);
    cards.appendChild(newGitHubCard);
  })
  .catch(err => {
    console.log(err);
  });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

//Axios call that pulls follower information
axios
  .get("https://api.github.com/users/mhidalgo83/followers")
  .then(res => {
    const followerData = res.data;
    console.log(followerData);

    //Iterates through each follower
    followerData.forEach(data => {

      //Uses login from each follower to get their profile info
      axios
        .get(`https://api.github.com/users/${data.login}`)
        .then(res => {
        
          //Gets profile data from followers and renders card with data
          const profData = res.data;
          const newGitHubCard = gitHubCard(profData);
          cards.appendChild(newGitHubCard);
        })
        .catch(err => {
          console.log(err);
        });
    });
  })
  .catch(err => {
    console.log(err);
  });

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:


<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

//Card component
let gitHubCard = data => {
  const newCard = document.createElement("div");
  const profImg = document.createElement("img");
  const cardInfo = document.createElement("div");
  const name = document.createElement("h3");
  const userName = document.createElement("p");
  const location = document.createElement("p");
  const profile = document.createElement("p");
  const profileLink = document.createElement("a");
  const followers = document.createElement("p");
  const following = document.createElement("p");
  const bio = document.createElement("p");

  newCard.appendChild(profImg);
  newCard.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  profile.appendChild(profileLink);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(bio);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

  console.log(profile);

  newCard.classList.add("card");
  profImg.src = data.avatar_url;
  cardInfo.classList.add("card-info");
  profileLink.href = data.html_url;
  profileLink.textContent = data.html_url;
  name.classList.add("name");
  userName.classList.add("username");

  name.textContent = data.name;
  userName.textContent = data.login;
  location.textContent = `Location: ${data.location}`;
  profile.innerHTML = `Profile: <a href="${data.html_url}"> ${data.html_url}`;
  followers.textContent = `Followers: ${data.followers}`;
  following.textContent = `Following: ${data.following}`;
  bio.textContent = `Bio: ${data.bio}`;

  return newCard;
};
