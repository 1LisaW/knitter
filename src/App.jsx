import React,{ useState } from 'react';
// import logo from './logo.svg';
import './App.css';

function HeightSchema(
  {value, onChange}
) {
    return (
    <div>
      <p> 
        Введите высоту схемы 
      </p>
      <input type="number" value={value} onChange={(event)=> onChange(event.target.value)}/>
    </div>
   );
}
function WeightSchema(props) {
  return (
  <div style={{marginLeft:5 +"em"}}>
    <p> 
      Введите ширину схемы 
    </p>
    <input type="number" value={props.value} onChange={(event)=>props.onChange(event.target.value)}/>
  </div>
 );
}
function ElementBoard({value, onClick}){
  return(
  <td 
  style={{height:25+"px", width:25+"px", border:"black solid"}}
  onClick={onClick}
  >{value}</td>
  )
}

function Board({ array, onClick }){
  return(
   <table>
     <tbody>
     {
       array.map(function(item,i){
         return ( <tr>{item.map(function(elem,j){
           return ( <ElementBoard value={elem} key={j} onClick={(event) => onClick(event.target)}/>)
         })
        }</tr>)})
     }
    </tbody>
   </table> 
  );
}

function changeArray(array,height,width){
  const diffWidth = width - array[0].length;
  const diffHeight = height - array.length;
  const newArr= [];

  if (diffWidth){
    for(let i=0; i <array.length;i++){
      if (diffWidth>0){
        newArr.length = diffWidth;
        newArr.fill("*");
      }
      array[i] = ( diffWidth>0 ? array[i].concat(newArr) : array[i].slice(0, width));
    }
  }

  // console.log("diffWidth: "+diffWidth+"; width: "+ width+"; arr[0].length: "+ array[0].length);

  
  if (diffHeight >0){
    newArr.length = diffHeight;
    newArr.fill([...array[0]].fill("*"));
    array = array.concat(newArr);
  }
  else if(diffHeight<0){
    array= array.slice(0,height);
  }
  console.log(array);
  return array;
}

function App() {
  const boardArray= [
    ["*","*","*"],
    ["*","*","*"],
    ["*","*","*"]
  ];
  const [[currentHeight,currentWidth],setParameters] = useState([3,3]);
  const [currentArray,setBoard]=useState(boardArray);
  
  console.log('!', currentArray);

  return (
    
    <div className="App">
    <div style={{display:"inline-flex"}}>
      <HeightSchema value={currentHeight} onChange={(value)=>{
          setParameters([value,currentWidth]);
          const newArray = changeArray(currentArray,value,currentWidth);
          
          // console.log("!",newArray);
          setBoard(newArray);
         
        }
      }/>  
      <WeightSchema value={currentWidth} onChange={(value)=>{
          setParameters([currentHeight,value]);
          changeArray(currentArray,currentHeight,value);
          setBoard(currentArray);
          

        }
      }/>
    </div>
    <Board array={currentArray} onClick={(target) => {
        // target.innerHTML ="X";
        const newArray =[...currentArray];
        newArray[target.parentNode.rowIndex][target.cellIndex]="X";
        setBoard(newArray);
        console.log(currentArray);
        // console.log(target.cellIndex);
        // console.log(target.parentNode.rowIndex);
    }}/>
   
    </div>
  );
}

export default App;