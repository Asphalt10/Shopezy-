let  data , selectedValue = "MON" ,profitValueLabel
window.addEventListener("DOMContentLoaded", ()=> {
    
    profitValueLabel = document.getElementById("profitValue")
    data = { 
        "MON": [2848 , 7654],"TUES": [2756 , 8435],"WED": [1912 , 7564],"THUR": [1564 , 7986],"FRI": [1856 , 8112],
        "SAT": [2000 , 8756],"SUN": [2341 , 7848]
    }

  
})
// use p5js to draw scatter plot graph

function setup(){
    createCanvas(240 , 120)
    
}
function draw(){
    background("#EEEEEE")
    fill(0)
    stroke(0)
    calcScales()
    profitValueLabel.innerHTML = "₹" + data[selectedValue][0]
    //make line dashed dashed
    setLineDash([1, 2]);
    strokeWeight(1)
    stroke(100 , 100 , 100 , 180)
    line(mouseX , 0 , mouseX , height)
    // line(0 , mouseY , width , mouseY)
    setLineDash([0, 0]);
    fill(0)
    triangle(mouseX , 0 , mouseX+2 , 2 , mouseX-2 , 2)
    triangle(mouseX , height , mouseX+2 , height-2 , mouseX-2 , height-2)
    
}
function calcScales(){
    i = 0 
    lastLastRect = 10
    lastRectHeight = 10
    rectHeight = 0
    noOfKeys = Object.keys(data).length
    Object.keys(data).forEach(key => {
        lastLastRect = lastRectHeight
        lastRectHeight = rectHeight
        rectHeight , rect2Height = calcRectHeight(data[key][0] , data[key][1])
        strokeWeight(0)
        fill(64,135,243 , 200)
        
        rect(i , height , 15 , rectHeight)
        
        fill(0, 0 , 0)
        textSize(8)
        text(key , i , height)
        noFill()
        strokeWeight(1)
        stroke("#0175ff")
        translate(15,0)
        if(i%60 == 0){
        bezier(i-65 , height+lastLastRect , i-35 , height+lastRectHeight, i-35 , height+lastRectHeight , i-5 , height+rectHeight)
        }
        if(i == 180){
            line(i-5 , height+rectHeight, width , height+rectHeight)
        }
        translate(-15,0)
        i+=30
        stroke(0)
        if(mouseX < i-15 && mouseX > i-30 && mouseY < 200 && mouseY > 0){
            selectedValue = key
            fill(0 , 0 , 200, random(100,255))
        }
    })
}

function calcRectHeight(value , value2){
    profit = []
    sell = []
    Object.keys(data).forEach(key => {
        profit.push(data[key][0])
        sell.push(data[key][1])
    })
    maxProfit = Math.max(...profit)
    minProfit = Math.min(...profit)
    rectHeight = -map(value , minProfit , maxProfit ,20, height-20)
    rect2Height = -map(value2 , minProfit , maxProfit ,20, height-20)
    return rectHeight , rect2Height
}
function setLineDash(list) {
    drawingContext.setLineDash(list);
}