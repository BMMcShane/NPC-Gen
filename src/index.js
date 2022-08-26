let strScr;
let dexScr;
let conScr;
let intScr;
let wisScr;
let chaScr;
let currentCharacter;
let currentCharacterRace;
let currentCharacterAge;
let currentCharacterGender;
let currentCharacterName;
let currentCharacterTrait;
let currentCharacterDesire;
let currentCharacterRolls;
let currentCharacterPortraitURL;
let currentCharacterPortrait;
let genButton;
let newFavorite;
let favArray = [];
let chaNo;



fetch('http://localhost:3000/characters')
  .then((data) => data.json())
  .then((data) => {
	characterInfo = data;
	generateCharacter();
  });

// Character Gen Event Listener
function genBtn() {
	let genButton = document.querySelector('#generate-btn');
	genButton.addEventListener('click', (e) => {
		e.preventDefault();
		genButton.onclick = generateCharacter(e);
	})
}


// Character Gen Function
function generateCharacter() {
	raceGenerator();
	genderGenerator();
	nameGenerator();
	raceAgeGenerator();
	traitGenerator();
	desireGenerator();
	rollStats();
	assignPortrait();
	// console.log(currentCharacterRace);	
	// console.log(currentCharacterGender);
	// console.log(currentCharacterName);
	// console.log(currentCharacterAge);
	// console.log(currentCharacterTrait);
	// console.log(currentCharacterDesire);
	showCharacters();

}

// Favorite Button Event Listener
function favBtn() {
    let favButton = document.querySelector('#fav-btn');
    favButton.addEventListener('click', (e) => {
        e.preventDefault();
        favButton.onclick = favCharacter();
    })};

//Fav character object builder
function favCharacter() {
	chaNo = favArray.length;
	newFavorite = {
		race: currentCharacterRace,
		gender: currentCharacterGender,
		name: currentCharacterName,
		age: currentCharacterAge,
		trait: currentCharacterTrait,
		desire: currentCharacterDesire,
		url: currentCharacterPortraitURL,
		rolls: currentCharacterRolls,
		id: chaNo
	}
	updateFavs(newFavorite);
  }

//Append fav character to Json
function updateFavs(newFavorite){
	favArray.push(newFavorite);
	renderFav(newFavorite);
  
}

// Fav render function
function renderFav(object) {
	let newFavoriteDiv = document.createElement('div');
	newFavoriteDiv.setAttribute("id", "new-fav");
	let newFavoriteDivUrl = document.createElement('img');
	newFavoriteDivUrl.setAttribute("id", "new-fav-img");
	let newFavoriteDivName = document.createElement('p');
	newFavoriteDivName.setAttribute("id", "new-fav-txt");
	let newFavoriteDivId = document.createElement('p');
	newFavoriteDivId.setAttribute('style', 'Display:none;');
	newFavoriteDivUrl.src = object.url;
	newFavoriteDivName.innerText = object.name;
	newFavoriteDivId.innerText = object.id;
	newFavoriteDiv.append(newFavoriteDivUrl);
	newFavoriteDiv.append(newFavoriteDivName);
	newFavoriteDiv.append(newFavoriteDivId);
	let favoritesBar = document.querySelector('#fav-characters');
	favoritesBar.append(newFavoriteDiv);
	newFavoriteDiv.addEventListener('click', (e) => {
		e.preventDefault();
		chaNo = newFavoriteDivId.innerText;
		showFav(favArray[chaNo]);
	})
}

//Show fav character function
function showFav(character) {
	const name = document.querySelector('#npc-name');
    const race = document.querySelector('#npc-race');
    const gender = document.querySelector('#npc-gender');
    const trait = document.querySelector('#npc-trait');
    const desire = document.querySelector('#npc-desire');
    const age = document.querySelector('#npc-age');

	name.textContent = character.name;
	age.textContent = character.age;
	trait.textContent = character.trait;
	desire.textContent = character.desire;
	if (character.gender === 'male') {
		gender.textContent = 'Male';
	} else if (character.gender === 'female') {
		gender.textContent = 'Female';
	} else {
		console.log('You Fool!');
	};
	if (character.race === 'halfElf') {
		race.textContent = 'Half-Elf';
	} else if (character.race === 'halfOrc') {
		race.textContent = 'Half-Orc';
	} else {
		race.textContent = capitalizeFirstLetter(character.race);
	};

	let portrait = document.querySelector('#npc-portrait');
	portrait.src = character.url;

	let strScr = document.querySelector('#Str-Scr');
	let dexScr = document.querySelector('#Dex-Scr');
	let conScr = document.querySelector('#Con-Scr');
	let intScr = document.querySelector('#Int-Scr');
	let winScr = document.querySelector('#Wis-Scr');
	let chaScr = document.querySelector('#Cha-Scr');

	strScr.textContent = character.rolls[0];
	dexScr.textContent = character.rolls[1];
	conScr.textContent = character.rolls[2];
	intScr.textContent = character.rolls[3];
	winScr.textContent = character.rolls[4];
	chaScr.textContent = character.rolls[5];	

}

// Show Character Function
function showCharacters() {
    const name = document.querySelector('#npc-name');
    const race = document.querySelector('#npc-race');
    const gender = document.querySelector('#npc-gender');
    const trait = document.querySelector('#npc-trait');
    const desire = document.querySelector('#npc-desire');
    const age = document.querySelector('#npc-age');

    name.textContent = currentCharacterName;
    // race.textContent = currentCharacterRace;
    trait.textContent = currentCharacterTrait;
    desire.textContent = currentCharacterDesire;
    age.textContent = currentCharacterAge;
	if (currentCharacterGender === 'male') {
		gender.textContent = 'Male';
	} else if (currentCharacterGender === 'female') {
		gender.textContent = 'Female';
	} else {
		console.log('You Fool!');
	};
	if (currentCharacterRace === 'halfElf') {
		race.textContent = 'Half-Elf';
	} else if (currentCharacterRace === 'halfOrc') {
		race.textContent = 'Half-Orc';
	} else {
		race.textContent = capitalizeFirstLetter(currentCharacterRace);
	};
}

// Capitalize First Letter Function
function capitalizeFirstLetter(str) {
	const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
}

// Portrait assignment function
function assignPortrait() {
	randomPortraitNo = randomNumberGen(1, 6);
	currentCharacterPortraitURL = `./assets/portraits/${currentCharacterRace}/${currentCharacterGender}/0${randomPortraitNo}.jpg`
	let currentCharacterPortrait = document.querySelector('#npc-portrait');
	currentCharacterPortrait.src = currentCharacterPortraitURL;

}



// Dice Rolling Function

function rollStats() {
	// const options = {
	// 	method: 'GET',
	// 	headers: {
	// 		'X-RapidAPI-Key': '7c36118751msh411ebf7605a21d9p15665djsne9a3ef934253',
	// 		'X-RapidAPI-Host': 'dice-roll.p.rapidapi.com'
	// 	}
	// }
	// fetch('https://dice-roll.p.rapidapi.com/roll/6/d/10', options)
	// 	.then(response => response.json())
	// 	.then(response => {
	let strScr = document.querySelector('#Str-Scr');
	let dexScr = document.querySelector('#Dex-Scr');
	let conScr = document.querySelector('#Con-Scr');
	let intScr = document.querySelector('#Int-Scr');
	let winScr = document.querySelector('#Wis-Scr');
	let chaScr = document.querySelector('#Cha-Scr');

	currentCharacterRolls = [randomNumberGen(8,18), randomNumberGen(8,18), randomNumberGen(8,18), randomNumberGen(8,18), randomNumberGen(8,18), randomNumberGen(8,18)]

			// currentCharacterRolls = [response.rolls[0] + 8, response.rolls[1] + 8, response.rolls[2] + 8, response.rolls[3] + 8, response.rolls[4] + 8, response.rolls[5] + 8]

	strScr.textContent = currentCharacterRolls[0];
	dexScr.textContent = currentCharacterRolls[1];
	conScr.textContent = currentCharacterRolls[2];
	intScr.textContent = currentCharacterRolls[3];
	winScr.textContent = currentCharacterRolls[4];
	chaScr.textContent = currentCharacterRolls[5];

			// console.log(currentCharacterRolls);			
}
// )
		// .catch(err => console.error(err));
// }



// age generating function

function raceAgeGenerator() {
	let ageCheck = currentCharacterRace
	if (ageCheck === 'dragonborn') {
		currentCharacterAge = randomNumberGen(15, 80);
		// console.log(currentCharacterAge);
	} else if (ageCheck === 'dwarf') {
		currentCharacterAge = randomNumberGen(50, 350);
		// console.log(currentCharacterAge);
	} else if (ageCheck === 'elf') {
		currentCharacterAge = randomNumberGen(100, 750);
		// console.log(currentCharacterAge);
	} else if (ageCheck === 'gnome') {
		currentCharacterAge = randomNumberGen(40, 500);
		// console.log(currentCharacterAge);
	} else if (ageCheck === 'halfElf') {
		currentCharacterAge = randomNumberGen(20, 180);
		// console.log(currentCharacterAge);
	} else if (ageCheck === 'halfOrc') {
		currentCharacterAge = randomNumberGen(14, 75);
		// console.log(currentCharacterAge);
	} else if (ageCheck === 'halfling') {
		currentCharacterAge = randomNumberGen(20, 200);
		// console.log(currentCharacterAge);
	} else if (ageCheck === 'human') {
		currentCharacterAge = randomNumberGen(18, 80)
		// console.log(currentCharacterAge);
	} else if (ageCheck === 'tiefling') {
		currentCharacterAge = randomNumberGen(18, 90);
		// console.log(currentCharacterAge);
	} else {
		console.log('You Fool!');
	}
}

// Random No. Gen

function randomNumberGen(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

// Name Gen

function nameGenerator() {
	if (currentCharacterGender === 'female') {
		randomName = randomNumberGen(0, 5);
		nameGenRace = currentCharacterRace; 
		currentCharacterName = characterInfo[0].races[`${currentCharacterRace}`].female[randomName];
		// console.log(currentCharacterName);
	} else if (currentCharacterGender === 'male') {
		randomName = randomNumberGen(0, 5);
		nameGenRace = currentCharacterRace; 
		currentCharacterName = characterInfo[0].races[`${currentCharacterRace}`].male[randomName];
		// console.log(currentCharacterName);
	} else {
		console.log('You Fool!');
	}
}

// Race Gen

function raceGenerator() {
	let randomRace = randomNumberGen(0, 8);
	if (randomRace === 0) {
		currentCharacterRace = 'dragonborn';
		// console.log(currentCharacterRace);
	} else if (randomRace === 1) {
		currentCharacterRace = 'dwarf';
		// console.log(currentCharacterRace);
	} else if (randomRace === 2) {
		currentCharacterRace = 'elf';
		// console.log(currentCharacterRace);
	} else if (randomRace === 3) {
		currentCharacterRace = 'gnome';
		// console.log(currentCharacterRace);
	} else if (randomRace === 4) {
		currentCharacterRace = 'halfElf';
		// console.log(currentCharacterRace);
	} else if (randomRace === 5) {
		currentCharacterRace = 'halfOrc';
		// console.log(currentCharacterRace);
	} else if (randomRace === 6) {
		currentCharacterRace = 'halfling';
		// console.log(currentCharacterRace);
	} else if (randomRace === 7) {
		currentCharacterRace = 'human';
		// console.log(currentCharacterRace);
	} else if (randomRace === 8) {
		currentCharacterRace = 'tiefling';
		// console.log(currentCharacterRace);
	}
}


// Gender Gen

function genderGenerator() {
	let randomGender = randomNumberGen(0, 1);
    if (randomGender === 0) {
		currentCharacterGender = 'male';
		// console.log(currentCharacterGender);
	} else {
		currentCharacterGender = 'female';
		// console.log(currentCharacterGender);
	}
}

// Trait Gen

function traitGenerator() {
	randomTrait = randomNumberGen(0, 12);
    currentCharacterTrait = characterInfo[1][randomTrait];
	// console.log(currentCharacterTraits);
}

// Desire Gen

function desireGenerator() {
	randomDesire = randomNumberGen(0, 19);
    currentCharacterDesire = characterInfo[2][randomDesire];
	// console.log(currentCharacterDesires);
}



