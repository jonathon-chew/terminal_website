window.onload = AddElements

//Set the date for the terminal
let currentDate = time();
function time() {
  const todaysDate = new Date();

  let day = todaysDate.getDate();
  let month = todaysDate.getMonth() + 1;
  let year = todaysDate.getFullYear();

  let currentDate = `${day}-${month}-${year}`;
  return currentDate;
}

function AddElements(){
  document.getElementById("Date").innerHTML = "Last login: " + currentDate + " on ttys001";
};

//Auto select the input box upon loading
var input = document.getElementById('input');
input.focus();

//Auto resize the input based on the length
input.addEventListener('input', resizeInput); // bind the "resizeInput" callback on "input" event
resizeInput.call(input); // immediately call the function

function resizeInput() {
  this.style.width = this.value.length + "ch";
}

input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addToDom()
  }
});

const commands = {
  'home' : 'You are home',
  'whoami' : 'Guest',
  'test': ['this is a', ' test'],
  'projects':['Internal Wikipedia', "Custom home page of internal apps"],
  'help':'',
  'profile':[]
}

const username = "jonathon-chew";

fetch(`https://api.github.com/users/${username}/repos`)
  .then(response => response.json())
  .then(repos => {
  repos.forEach(repo => {
    if (repo.name != 'jonathon-chew'){
      commands.projects.push(repo.name)
    }
  });
  })
  .catch(error => console.error("Error fetching repos:", error));


fetch(`https://api.github.com/users/${username}`)
  .then(response => response.json())
  .then(profile => {
  commands.profile.push("Profile Info:")
  commands.profile.push("Name:" + profile.name)
  commands.profile.push("Bio:" + profile.bio)
  commands.profile.push("Public Repos:" + profile.public_repos)
  commands.profile.push("URL:" + profile.html_url)
  });

//Get the input, comapre from a list on inputs and output to the DOM
function runCommand(){
  let getInputText = document.querySelector('#input').value
  let commandText = ""

  getInputText = getInputText.trim()

  if(getInputText.includes(' ')){
    let pieces = getInputText.split(' ');
    getInputText = commands[pieces[0]]
  };

  if (getInputText == 'clear'){
    clear()
    return
  }

  // console.log(typeof(commands[getInputText]))

  if (commands[getInputText] != undefined){
    if (typeof(commands[getInputText]) === 'string') {
      commandText = commands[getInputText]
    }
    else if (typeof(commands[getInputText]) === 'object') {
      for (var eachItem = 0; eachItem < commands[getInputText].length; eachItem ++){
        if (eachItem > 0){
          commandText += ", "
        }
        commandText += commands[getInputText][eachItem]
       }
    }
  }
  else{
    commandText = "I do not recognise the command. If you're unsure of the commands please type help"
  }

  return commandText
}

//Add the input to the DOM
function addToDom(){
  const outputArea = document.querySelector("#output")
  const breakerSection = document.createElement('br')
  const inputArea = document.querySelector('#input')
  const commandPrompt = "Guest@Jonathon's Profile Page % "

  //remember and write the command
  var commandTextAndPrompt = commandPrompt + inputArea.value
  outputArea.append(commandTextAndPrompt)
  outputArea.append(document.createElement('br'))
  
  //run commmand and get innerText
  const newText = runCommand()

  //result
  if(newText){
    outputArea.append(newText)

  //new line
  outputArea.append(breakerSection)
  }

  //reset the input
  inputArea.value = ''
}

function clear(){
   const outputArea = document.querySelector("#output")

   outputArea.innerHTML= ''
}

let helpKeys = Object.keys(commands).join(", ")
commands.help = "Avaliable commands: " + helpKeys 
