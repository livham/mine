addEventListener("DOMContentLoaded", function(){
    const box=document.querySelector(".box");
    const screen=document.querySelector(".screen");
    let width=10;  //variabler
    let bombAmount=10;
    let isGameOver=false;
    let tiles=[];
    let flags=0;

    function createBoard(){
        let bombsArray=Array(bombAmount).fill('bomb');
        let emptyArray=Array(width*width-bombAmount).fill('clear');
        let gameArray=emptyArray.concat(bombsArray); //concat = slå ihop
        console.log(gameArray);
        let shuffledArray=gameArray.sort(() => Math.random()-0.5);
        console.log(shuffledArray);
        for(let i=0;1<width*width;i++){
            const tile=document.createElement("div");
            tile.setAttribute("id", i);
            tile.classList.add("cen");
            tile.classList.add("tile");
            tile.innerHTML=i;
            tile.classList.add(shuffledArray[i]);
            box.appendChild(tile);
            tiles.push(tile);

            //vanligt klick
            tile.addEventListener("click", function(e){
                click(tile);
            })

            //höger klick
            tile.oncontextmenu=function(e){
                e.preventDefault();
                addFlag(tile);
            }
            


        }
        for(let i=0;i<tiles.length;i++){
            let total=0;
            const isLeftEdge=(i%width===0);
            const isRightEdge=(i%width===width-1);
            if(tiles[i].classList.contains('clear')){
                if(i>0 && !isLeftEdge && tiles[i-1].classList.contains('bomb')) total++;
                if(i>9 && !isRightEdge && tiles[i+1-width].classList.contains('bomb'))total++;
                if(i>10 && tiles[i-width].classList.contains('bomb'))total++;
                if(i>11 && !isLeftEdge && tiles[i-1-width].classList.contains('bomb'))total++;
                if(i<99 && !isRightEdge && tiles[i+1].classList.contains('bomb'))total++;
                if(i<90 && !isLeftEdge && tiles[i-1+width].classList.contains('bomb'))total++;
                if(i<88 && !isRightEdge && tiles[i+1+width].classList.contains('bomb'))total++;
                if(i<89 && tiles[i+width].classList.contains('bomb'))total++;
                tiles[i].setAttribute('data',total);

            }
        }

    }
    createBoard();

    function click(tile){


    }
    function addFlag(tile){
        if(isGameOver) return;
        if(!tile.classList.contains('checked') && (flags<bombAmount)){
            if(!tile.classList.contains('flag')){
                tile.classList.add('flag');
                tile.innerHTML="🚩";
                flags++;
            }else{
                tile.classList.remove('flag');
                tile.innerHTML="🚩";
                flags--;
            }
            screen.innerHTML=flags+"flaggor av"+bombAmount;
        }
    }

    function gameOver(tile){
        //visa alla bomber
        tiles.forEach(tile =>{
            if(tile.classList.contains('bomb')){
                tile.innerHTML="💣";
            }
        })
        tile.innerHTML="💥";
        screen.innerHTML="Game over! Game over, man!";
        isGameOver=true;
    }

})