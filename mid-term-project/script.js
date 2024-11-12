const story = {
    start: {
      text: "You are a young demon slayer facing a choice in the dark forest. Do you go left towards the sound of a river or right where the forest thickens?",
      choices: [
        { text: "Go left", consequence: "river" },
        { text: "Go right", consequence: "forest" }
      ],
      image: "1.jpg"
    },
    river: {
      text: "You reach a river and see a powerful demon drinking from it. Do you attack or hide?",
      choices: [
        { text: "Attack", consequence: "fightDemon" },
        { text: "Hide", consequence: "hideFromDemon" }
      ],
      image: "2.jpg"
    },
    forest: {
      text: "You enter the thick forest and encounter a fellow demon slayer. Do you team up or go solo?",
      choices: [
        { text: "Team up", consequence: "teamUp" },
        { text: "Go solo", consequence: "goSolo" }
      ],
      image: "3.jpg"
    },
    fightDemon: {
      text: "You bravely attack the demon but get severely wounded. This ends your journey as a hero who faced their fears.",
      choices: [],
      image: "4.jpg",
      ending: true
    },
    hideFromDemon: {
      text: "You successfully hide from the demon and find a hidden path leading to safety. You live to fight another day!",
      choices: [
        { text: "move", consequence: "secretPath" },
      ],
      image: "5.jpg",
      ending: true
    },
    teamUp: {
      text: "Together with your ally, you face a horde of demons and prevail. You gain fame among demon slayers.",
      choices: [],
      image: "6.jpg",
      ending: true
    },
    goSolo: {
      text: "Going solo, you encounter an incredibly powerful demon alone. Despite your skills, you are overwhelmed. This is the end of your journey.",
      choices: [],
      image: "7.jpg",
      ending: true
    },
    // Additional endings
    secretPath: {
      text: "You discover a hidden passage leading to an ancient temple. Do you explore or turn back?",
      choices: [
        { text: "Explore", consequence: "exploreTemple" },
        { text: "Turn back", consequence: "turnBack" }
      ],
      image: "8.jpg"
    },
    exploreTemple: {
      text: "Inside the temple, you unlock hidden powers and become a legendary demon slayer!",
      choices: [],
      image: "9.jpg",
      ending: true
    },
    turnBack: {
      text: "You decide to turn back, avoiding the unknown. You survive, but the mystery haunts you forever.",
      choices: [],
      image: "10.jpg",
      ending: true
    }
  };
  
  // Starting function to begin or restart the game
  function startGame() {
    displayStoryPart("start");
  }
  
  // Function to update the story part and show choices
  function displayStoryPart(partKey) {
    const part = story[partKey];
    document.getElementById("story").innerText = part.text;
    document.getElementById("story-image").src = part.image;
  
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";
  
    if (part.ending) {
      const restartButton = document.createElement("button");
      restartButton.innerText = "Restart Game";
      restartButton.onclick = startGame;
      choicesDiv.appendChild(restartButton);
    } else {
      part.choices.forEach(choice => {
        const button = document.createElement("button");
        button.innerText = choice.text;
        button.onclick = () => displayStoryPart(choice.consequence);
        choicesDiv.appendChild(button);
      });
    }
  }
  
  // Start the game when the page loads
  startGame();
  