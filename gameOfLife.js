
var margin = 8;
var cellSize = 10;
var nbRows = 50;//40;
var nbCols = 70;//100;
var constWidth = cellSize * nbCols;
var constHeight = cellSize * nbRows;


var cadre = document.getElementById("idDraw");
cadre.style.width = constWidth+"px";
cadre.style.height = constHeight+"px";

function rand()
{
	if (Math.random()>0.6)
		return true;
	else
		return false;
}


var tab1 = [];

function newTab()
{
	tab1 = [];
	clearAll();	
	for(var i = 0; i< nbRows; i++)
	{
		var line = [];
		for(var j = 0; j < nbCols; j++)
		{
			line.push(rand());
		}
		//console.log(line);
		tab1.push(line);
	}
	affiche();
}

//console.log(tab1);

function affiche()
{
	for(var i = 0; i< nbRows; i++)
	{
		for(var j = 0; j < nbCols; j++)
		{
			if(tab1[i][j])
			{
				var smallBox = document.createElement('div');
				smallBox.style.position = "absolute";
				smallBox.style.left = (j*cellSize+margin)+"px";
				smallBox.style.top = (i*cellSize+margin)+"px";
				smallBox.style.backgroundColor = "black";
				smallBox.style.width = cellSize+"px";
				smallBox.style.height=  cellSize+"px";
				cadre.appendChild(smallBox);
				//console.log(i+" "+j);
			}
		}
	}
}



function nextGeneration()
{
	clearAll();
	updateTab();
	affiche();
}


function updateTab()
{
	var tab2 = [];
	for(var i = 0; i< nbRows; i++)
	{
		var line = [];
		for(var j = 0; j < nbCols; j++)
		{
			var cpt=0;			
			for(var a = Math.max(0,i-1); a<=Math.min(i+1,nbRows-1); a++)
				for(var b=Math.max(0,j-1); b<=Math.min(j+1,nbCols-1); b++)
				{
					if(a != i || b!= j)
						if(tab1[a][b])
							cpt++;
				}
			switch(cpt) 
			{
    		case 0: case 1: case 4: case 5: case 6: case 7: case 8:
        		line.push(false);
        		break;
    		case 2:
        		line.push(tab1[i][j]);
        		break;
			case 3:
				line.push(true);
    		default:
			} 
		}
		//console.log(line);
		tab2.push(line);	
	}
	tab1 = tab2;
}

var intervalId;

function play()
{

	intervalId = setInterval(nextGeneration, 200);
}

function pause()
{
	clearInterval(intervalId);
}

function clearAll()
{
	var children = cadre.childNodes;
	var nbChildren = children.length;
	for(var i= nbChildren-1; i>=0; i--)
	{
		cadre.removeChild(children[i]);
	}

}



 
