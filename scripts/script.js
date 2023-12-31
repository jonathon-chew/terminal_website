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


//Get the input, comapre from a list on inputs and output to the DOM
function runCommand(){
    let getInputText = document.querySelector('#input').value
    let commandText = ""

    getInputText = getInputText.trim()

        commands = {
        'home' : 'You are home',
        'whoami' : 'Guest',
        'test': ['this is a', ' test'],
        'projects':['Terminal Website', 'Internal Wikipedia', "Custom home page of internal apps"],
        }

    if(getInputText.includes(' ')){
        let pieces = getInputText.split(' ');
        getInputText = commands[pieces[0]]
    };

    if (getInputText == 'clear'){
        clear()
        return
    }

    //console.log(typeof(commands[getInputText]))

    if (commands[getInputText] != undefined){
        if (typeof(commands[getInputText]) === 'string') {
            commandText = commands[getInputText]
        }
        else if (typeof(commands[getInputText]) === 'object') {
            for (eachItem = 0; eachItem < commands[getInputText].length; eachItem ++){
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
    commandTextAndPrompt = commandPrompt + inputArea.value
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
