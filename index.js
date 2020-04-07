const textArea = document.createElement("textarea")
const keyboard = document.createElement("div") 
const container = document.createElement("div")

textArea.className="textarea"
keyboard.className="keyboard"
container.className="container"

document.getElementsByTagName("body")[0].appendChild(container)
document.getElementsByClassName("container")[0].appendChild(textArea)
document.getElementsByClassName("container")[0].appendChild(keyboard)

for (let i = 0; i<5; i++) {
    const row = document.createElement("div")
    row.className=`keyboard__row`
    row.classList.add(`${i}`)
    keyboard.appendChild(row)
}


const keys = [{
"+192": ["`","~","ё","Ё"],
"+49":	["1","!","1","!"],
"+50":	["2","@","2",'"'],
"+51":	["3","#","3","№"],
"+52":	["4","$","4",";"],
"+53":	["5","%","5","%"],
"+54":	["6","^","6",":"],
"+55":	["7","&","7","?"],
"+56":	["8","*","8","*"],
"+57":	["9","(","9","("],
"+48":	["0",")","0",")"],
"+189": ["-","_","-","_"],
"+187": ["=","+","=","+"],
"+8": "Backspace"},
{
"+9": "Tab",
"+81":	["q","Q","й","Й"],
"+87":	["w","W","e","E"],
"+69":	["e","E","у","У"],
"+82":	["r","R","к","К"],
"+84":	["t","T","е","Е"],
"+89":	["y","Y","н","Н"],
"+85": ["u","U","г","Г"],
"+73": ["i","I","ш","Ш"],
"+79": ["o","O","з","З"],
"+80": ["p","P","з","З"],
"+219":["[","{","х","Х"],
"+221":["]","}","ъ","Ъ"],
"+46": "Delete"},
{
"+20": "Caps lock",
"+65": ["a","A","ф","Ф"],
"+83": ["s","S","ы","Ы"],
"+68": ["d","D","в","В"],
"+70": ["f","F","а","А"],
"+71": ["g","G","п","П"],
"+72": ["h","H","р","Р"],
"+74": ["j","J","о","О"],
"+75": ["k","K","л","Л"],
"+76": ["l","L","д","Д"],
"+186": [";",":","ж","Ж"],
"+222": ["'",'"',"э","Э"],
"+220": ["\\","|","\\","/"],
"+13": "Enter"
},
{
"+16": "Shift",
"+90": ["z","Z","я","Я"],
"+88": ["x","X","ч","Ч"],
"+67": ["c","C","с","С"],
"+86": ["v","V","м","М"],
"+66": ["b","B","и","И"],
"+78": ["n","N","т","Т"],
"+77": ["m","M","ь","Ь"],
"+188": [",","<","б","Б"],
"+190": [".",">","ю","Ю"],
"+191": ["/","?",".",","],
"+38": "▲",
"-16": "Shift"
},
{
"+17": "Ctrl",
"+91": "Win",
"+18": "Alt",
"+32": " ",
"-18": "Alt",
"+37": "◄",
"+40": "▼",
"+39": "►",
"-17": "Ctrl"
}
]

let j

if (!localStorage.getItem("languageIterator"))
j= 0
else
j = localStorage.getItem("languageIterator")
let symbol = ""
let capsed = false

keys.forEach((element,index) => {for (const key in element) {
    if (element.hasOwnProperty(key)) {
        if (typeof(element[key])=="string"){
        let button = document.createElement("div")
        button.className = "btn__command"
        let keyNumber = + key
        button.classList.add("btn" + keyNumber)
        button.innerHTML = element[key]
        button.id = keyNumber
        button.addEventListener("click",pressCommand)
        document.getElementsByClassName(index)[0].appendChild(button)
        }
        if (typeof(element[key])=="object"){
            let button = document.createElement("div")
            button.className = "btn__default"
            let keyNumber = + key
            button.classList.add("btn" + keyNumber)
            button.dataset.row = index
            button.innerHTML = element[key][j]
            button.id =  keyNumber
            button.addEventListener("click",pressBtn)
            document.getElementsByClassName(index)[0].appendChild(button)
        }
    }
}})


let arrComm = [...document.getElementsByClassName("btn__command")]
arrComm.forEach(element => 
    {element.addEventListener("click", ()=>{
    setTimeout(() => {element.classList.remove("pressed")}  , 100)
    element.classList.add("pressed")
     })})


let arrDef = [...document.getElementsByClassName("btn__default")]
arrDef.forEach(element => 
    {element.addEventListener("click", ()=>{
    setTimeout(() => {element.classList.remove("pressed")}  , 100)
    element.classList.add("pressed")})})
    

    document.onkeydown = function(event){
        let code = "+" + event.keyCode
        for (let i = 0; i < keys.length; i++) {
        if (keys[i].hasOwnProperty(code)){
        if (code=="+17" || code=="-17" ||code=="+18" ||code=="+91" ||code=="-18" ||code=="+46"){
            document.getElementById(event.keyCode).classList.add("pressed")
            break
        }
        if (code=="+13"){
            document.getElementById(event.keyCode).classList.add("pressed")
            event.preventDefault()
            textArea.innerHTML += "\n"
            break
        }
        if (code=="+9"){
            event.preventDefault()
            document.getElementById(event.keyCode).classList.add("pressed")
            let tab = document.createTextNode("  ")
            textArea.appendChild(tab)
            break
        }
        if (code=="+8"){
        document.getElementById(event.keyCode).classList.add("pressed")
        let stringArr = textArea.innerHTML.split("")
        stringArr.pop()
        textArea.innerHTML = stringArr.join("")
        break}
        if (code=="+37" ||code=="+38" ||code=="+39" || code=="+40"){
            event.preventDefault()
            document.getElementById(event.keyCode).classList.add("pressed")
            let arrow = document.createTextNode( document.getElementById(event.keyCode).innerHTML)
            textArea.appendChild(arrow)
            break
        }
        if (code == "+20"){
        if (!capsed){
        document.querySelectorAll(".btn__default").forEach(element=>{element.innerHTML = element.innerHTML.toUpperCase()})
        capsed = !capsed
        document.getElementById(event.keyCode).classList.add("pressed")
        }
        else{
        document.querySelectorAll(".btn__default").forEach(element=>{element.innerHTML = element.innerHTML.toLowerCase()})
        capsed = !capsed
        document.getElementById(event.keyCode).classList.remove("pressed")
        }
    break }
        if (code == "+16"){
            if (j==0)
            j=1
            if (j==2)
            j=3
            document.querySelectorAll(".btn__default").forEach(element=>{element.innerHTML = keys[element.dataset.row]["+" + element.id][j]})
            document.getElementById(event.keyCode).classList.add("pressed")
            break}
            if(!capsed){
        if (Array.isArray(keys[i][code])){
        symbol = keys[i][code][j]}
        else
        symbol = keys[i][code]
        let text = document.createTextNode(symbol)
        textArea.appendChild(text)
        document.getElementById(event.keyCode).classList.add("pressed")
        }
    else
    if (Array.isArray(keys[i][code]))
        symbol = keys[i][code][j].toUpperCase()
        else
        symbol = keys[i][code].toUpperCase()
        let text = document.createTextNode(symbol)
        textArea.appendChild(text)
        document.getElementById(event.keyCode).classList.add("pressed")}
    }}

        document.onkeyup = function(event){
            if (event.keyCode !== 20){
            if (event.keyCode == 16){
            j--
            document.querySelectorAll(".btn__default").forEach(element=>{element.innerHTML = keys[element.dataset.row]["+" + element.id][j]})
        }
            if(document.getElementById(event.keyCode))
            document.getElementById(event.keyCode).classList.remove("pressed")}
        }

        function pressBtn(event)
        {   let symbol = event.target.innerHTML
            let text = document.createTextNode(symbol)
            textArea.appendChild(text)}

        function pressCommand(event){
            if (event.target.id==37 || event.target.id==38 ||event.target.id==39 ||event.target.id==40){
                event.target.classList.add("pressed")
                textArea.innerHTML += event.target.innerHTML
            }
            if (event.target.id==32){
                event.target.classList.add("pressed")
                textArea.innerHTML += " "
            }
            if (event.target.id==17 || event.target.id==-17 ||event.target.id==18 ||event.target.id==91 ||event.target.id==-18 ||event.target.id==16 ){
                event.preventDefault()
                event.target.classList.add("pressed")
            }
            if (event.target.id==13){
                event.target.classList.add("pressed")
                textArea.innerHTML += "\n"
            }
            if (event.target.id==9){
                event.target.classList.add("pressed")
                let tab = document.createTextNode("  ")
                textArea.appendChild(tab)
            }
            if (event.target.id==8){
            event.target.classList.add("pressed")
            let stringArr = textArea.innerHTML.split("")
            stringArr.pop()
            textArea.innerHTML = stringArr.join("")}
            if (event.target.id == 20){
            if (!capsed){
            document.querySelectorAll(".btn__default").forEach(element=>{element.innerHTML = element.innerHTML.toUpperCase()})
            capsed = !capsed
            event.target.classList.add("pressed")
            }
            else{
            document.querySelectorAll(".btn__default").forEach(element=>{element.innerHTML = element.innerHTML.toLowerCase()})
            capsed = !capsed
            event.target.classList.remove("pressed")
            } }
        }

        function langSwitch(func, ...codes) {
            let pressed = new Set();
      
            document.addEventListener('keydown', function(event) {
              pressed.add(event.code);
      
              for (let code of codes) { 
                if (!pressed.has(code)) {
                  return;
                }
              }
              pressed.clear();
      
              func();
            });
      
            document.addEventListener('keyup', function(event) {
              pressed.delete(event.code);
            });
      
          }
      
          langSwitch(
            () => {if(j==0 || j==1){
                j=j+2
                document.querySelectorAll(".btn__default").forEach(element=>{element.innerHTML = keys[element.dataset.row]["+" + element.id][j]})
                localStorage.setItem("languageIterator", j.toString())}
            else if (j==2 || j==3) {
                j=j-2
                document.querySelectorAll(".btn__default").forEach(element=>{element.innerHTML = keys[element.dataset.row]["+" + element.id][j]})
                localStorage.setItem("languageIterator", j.toString())
            }
            },
            "ControlLeft",
            "AltLeft"
          );

          let paragraph = document.createElement("p")
          paragraph.innerHTML = "Переключение языков - Alt + Ctrl"
            document.getElementsByTagName("body")[0].appendChild(paragraph)


            