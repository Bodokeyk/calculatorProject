/* Start with basic functions */
const numbers = document.querySelector(".buttons-list");
const screen = document.querySelector(".screenToText");
const operators = document.querySelector(".result");

function NumberVariable(typeOf="number", value="") {
  this.Type = typeOf;
  this.Value = value;
  this.NormalWork = function(){/* function to control get 0 of . before usefull numbers */
  return  this.Value == ""? false:true;
  };
  this.HasDot = function (){
return this.Value.toString().indexOf(".") >= 0? true:false
};
 this.DeleteLast = function (){
   const valueToString = this.Value.toString();
const erased = valueToString.substring(0,(valueToString.length -1))
  this.Value = erased
  this.NormalWork()
  this.HasDot()
 };
}
function OperatorVariable(typeOf="operator", value="") {
  this.Type = typeOf;
  this.Value = value;
  this.DeleteLast = function (){
    const valueToString = this.Value.toString();
 const erased = valueToString.substring(0,(valueToString.length -1))
   this.Value = erased
  };
}

function sum(firstValue, SecondValue){
return parseFloat(firstValue) + parseFloat(SecondValue)
}
function subs(firstValue, SecondValue){
return parseFloat(firstValue) - parseFloat(SecondValue)
    }
function mult(firstValue, SecondValue){
return parseFloat(firstValue) * parseFloat(SecondValue)
}
function div(firstValue, SecondValue){
if(parseFloat(firstValue) == 0 && parseFloat(SecondValue) == 0 ){
  return "Dont Do that >:C"
}
return parseFloat(firstValue) / parseFloat(SecondValue)
}
/* Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers. */
function operate(oneTOperate, operator, twoTOperate){
 switch(operator.Value){
    case "+": return sum(oneTOperate.Value, twoTOperate.Value);
    case "-": return subs(oneTOperate.Value, twoTOperate.Value);
    case "*": return mult(oneTOperate.Value, twoTOperate.Value);
    case "/": return div(oneTOperate.Value, twoTOperate.Value);
    default:
        break;
}
}
const arrayOnScreen = []
addItemToArray(arrayOnScreen,"number")


/* function for the screen displayed------------------------------------------------*/
function removeFromArray (){

}
function addItemToArray(arrayToAdd, typeOf){
  switch(typeOf){
    case "number":
      arrayToAdd.push(new NumberVariable())
    break;
    case "operator":
      arrayToAdd.push(new OperatorVariable)
    break;
  }
  
  
}
function updateScreenByArray(arrayToWork){
  screen.textContent = arrayToWork.reduce((accumulator,x)=>{
  return accumulator += x.Value
  },"")
}

numbers.addEventListener("click", (event)=>{
  const variableToValue = event.target.classList[1];
    switch(variableToValue){
    case "number":
      if(arrayOnScreen[arrayOnScreen.length-1].Type == "operator"){
        addItemToArray(arrayOnScreen,"number")
        addToValueObject(arrayOnScreen[arrayOnScreen.length-1], event.target.textContent)
      }else{
        addToValueObject(arrayOnScreen[arrayOnScreen.length-1], event.target.textContent)
      }
      break;
    case "operator":
      if(arrayOnScreen.find((x) =>{
        return x.Type === "operator"
      })){
        break;
      }
      if(arrayOnScreen[arrayOnScreen.length-1].Type == "number"){

        if(arrayOnScreen[arrayOnScreen.length-1].Value.substring(
          arrayOnScreen[arrayOnScreen.length-1].Value.length - 1) == "."){
            
            addToValueObject(arrayOnScreen[arrayOnScreen.length-1], "0")
          }
          if(arrayOnScreen[arrayOnScreen.length-1].NormalWork() == false
        ){
          
            addToValueObject(arrayOnScreen[arrayOnScreen.length-1],"0")
            arrayOnScreen[arrayOnScreen.length-1].NormalWork()
        }
        addItemToArray(arrayOnScreen,"operator")
        addToValueObject(arrayOnScreen[arrayOnScreen.length-1], event.target.textContent)
      }
      break;
    case "dot" :
      if(arrayOnScreen[arrayOnScreen.length-1].Type == "operator"){
        addItemToArray(arrayOnScreen,"number") 
      }
      if(arrayOnScreen[arrayOnScreen.length-1].HasDot() == false && 
        arrayOnScreen[arrayOnScreen.length-1].Type != "operator"
      ){

        if(arrayOnScreen[arrayOnScreen.length-1].NormalWork() == false
      ){
          addToValueObject(arrayOnScreen[arrayOnScreen.length-1],"0.")
          arrayOnScreen[arrayOnScreen.length-1].NormalWork()
        }else{
          addToValueObject(arrayOnScreen[arrayOnScreen.length-1], event.target.textContent)
        }
      }
      break;

    case "delete":
      arrayOnScreen[arrayOnScreen.length-1].DeleteLast()
      if(arrayOnScreen[arrayOnScreen.length-1].Value == "" &&
        arrayOnScreen.length - 1 != 0 ||
        arrayOnScreen[arrayOnScreen.length-1].Type == "operator"){
       arrayOnScreen.pop()
     }     
      break;

    case "reset":
     while(arrayOnScreen.length != 1){
      arrayOnScreen.pop()
     }
     arrayOnScreen[arrayOnScreen.length-1].Value =""
     arrayOnScreen[0].DeleteLast()
      break;

    case "result":
    const resultToScreen = operate(arrayOnScreen[0], arrayOnScreen[1],arrayOnScreen[2]).toString()
      while(arrayOnScreen.length != 1){
        arrayOnScreen.pop()
       }
       arrayOnScreen[arrayOnScreen.length-1].Value = resultToScreen
       arrayOnScreen[0].NormalWork()
       arrayOnScreen[0].HasDot()
       if(resultToScreen == "Dont Do that >:C" ){

       }
  
      /* "Dont Do that >:C" */

     
    break;
  }
  updateScreenByArray(arrayOnScreen)
})

function addToValueObject(objectToAdd,addThis){
  objectToAdd.Value += addThis

}
