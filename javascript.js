/* Start with basic functions */
const valueOne = 2;
const ValueTwo = 3;
const operatorOn = '/'
function sum(firstValue, SecondValue){
return firstValue + SecondValue
}
function subs(firstValue, SecondValue){
return firstValue - SecondValue
    }
function mult(firstValue, SecondValue){
return firstValue * SecondValue
}
function div(firstValue, SecondValue){
return firstValue / SecondValue
}
/* Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers. */
function operate(oneTOperate, operator, twoTOperate){
 switch(operator){
    case "+": return sum(oneTOperate, twoTOperate);
    case "-": return subs(oneTOperate, twoTOperate);
    case "*": return mult(oneTOperate,twoTOperate);
    case "/": return div(oneTOperate,  twoTOperate);
    default:
        console.log("ERROR")
        break
}
}
console.log(operate(valueOne,operatorOn, ValueTwo))