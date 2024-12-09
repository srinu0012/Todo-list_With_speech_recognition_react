import { useState } from "react";
import "./App.css"

function App(){
  
      let [newtodo,setnewtodo]=useState([{
        id:1,
        task:"lerning react"
      },{
        id:2,
        task:"lerning node"
      }])


let ids=2
function addtodos(task){
  if(document.getElementById("input").value === ""){
    alert("enter a task")
  }
  else{
    let newtodos=[...newtodo,{
      id:++ids,
      task:task
    }]
    setnewtodo(newtodos)
    let inputval=document.getElementById("input").value 
    let text =inputval+"Added"
    let speaking = new SpeechSynthesisUtterance(text)
    speechSynthesis.speak(speaking)
    
  }
}

function deletingtodo(ind){
  let text =newtodo[`${ind}`].task+ " "+"Deleted"
  let speaking = new SpeechSynthesisUtterance(text)
  speechSynthesis.speak(speaking)

  
let newtodos=newtodo.filter((val,index)=>{
      return index !=ind
})
    
  setnewtodo( newtodos)
}

window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

if ('SpeechRecognition' in window) {
    console.log('Speech recognition supported');
} else {
    console.error('Speech recognition not supported');
}

const recognition = new window.SpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log('Transcript: ', transcript);

    
    document.getElementById("input").value=transcript;
    console.log(document.getElementById("input").value)
    recognition.stop();
};


recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
};



   

    
  




  return (<>
        <div className="container mt-5 w-50">
            <div className="input-group">
             <input type="text" className="form-control " 
             id="input"  />
             <i class="fa-solid fa-microphone" id="mic" onClick={()=>{
                    recognition.start();
             }
              
             }></i>
             <button className="btn btn-primary " onClick={()=>{
                      addtodos(document.getElementById("input").value)
                      {document.getElementById("input").value=""}
                      
             }}>Add</button>
            </div>
            <ul className="list-group mt-5" >
               {
                newtodo.map((val,ind)=>{
                  return (
                    <>
                    <li className="list-group-item">
                      <p>{val.task}</p>
                      <button className="btn" onClick={()=>{
                        deletingtodo(ind)
                      }}>❌</button>
                    </li>
                    </>
                  )
                })
               }
            </ul>
        </div>
  </>)

}

export default App;