const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const historyBox = document.getElementById('history');
let expression = '';

function degToRad(deg){ return deg * Math.PI / 180; }
function factorial(n){ 
    if(n > 170) return Infinity; 
    return n <= 1 ? 1 : n * factorial(n - 1); 
}

function evaluate(expr){
    try {
        expr = expr.replace(/\^/g,'**');
        expr = expr.replace(/π2/g,'Math.PI**2');
        expr = expr.replace(/π/g, Math.PI);
        expr = expr.replace(/e/g, Math.E);
        expr = expr.replace(/sin\(/g,'Math.sin(degToRad(');
        expr = expr.replace(/cos\(/g,'Math.cos(degToRad(');
        expr = expr.replace(/tan\(/g,'Math.tan(degToRad(');
        expr = expr.replace(/sqrt\(/g,'Math.sqrt(');
        expr = expr.replace(/ln\(/g,'Math.log(');
        expr = expr.replace(/log\(/g,'Math.log10(');
        expr = expr.replace(/exp\(/g,'Math.exp(');
        expr = expr.replace(/abs\(/g,'Math.abs(');
        expr = expr.replace(/mod/g,'%');
        expr = expr.replace(/rand/g,'Math.random()');

        const func = new Function('degToRad','factorial','Math','return ('+expr+')');
        let res = func(degToRad, factorial, Math);
        if(!isFinite(res)) throw new Error('Math error');
        return Math.round((res+Number.EPSILON)*1e12)/1e12;
    } catch(e){
        return 'Error';
    }
}

function addHistory(expr,res){
    const entry = document.createElement('div');
    entry.textContent = `${expr} = ${res}`;
    entry.onclick = () => {
        expression = res.toString();
        display.value = expression;
    };
    historyBox.prepend(entry);
}

buttons.forEach(button=>{
    button.addEventListener('click',()=>{
        const action = button.getAttribute('data-action');

        if(!isNaN(action) || action==='.') expression += action;
        else if(['+', '-', '*', '/', '^','(',')','%'].includes(action)) expression += action;
        else if(action==='='){
            const res = evaluate(expression);
            addHistory(expression,res);
            expression = res.toString();
        } else if(action==='C'){
            expression = '';
        } else if(action==='back'){
            expression = expression.slice(0,-1);
        } else if(['sin','cos','tan','sqrt','ln','log','exp','abs','pi','e','mod','rand','pi2'].includes(action)){
            expression += action + '(';
        }

        display.value = expression;
    });
});
