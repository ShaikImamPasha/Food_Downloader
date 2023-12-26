import Shimmer from "./Shimmer";
import MenuRestarent from "./MenuRestarent";
import { useParams } from "react-router-dom";
import useResturent from "../Utils/Custom_Hooks/useResturent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCommentesData } from "../Utils/Redux/Commentes";
const Restaurent=()=>{
  const dispatch=useDispatch();
  const [commentStateMesage,setCommentStateMesage]=useState("");
    const {resid}=useParams();
    const resInfo=useResturent(resid);
    const [arrowIndex,setArrayIndex]=useState(null);
    const Commentes=useSelector((state)=>state.Commente.commentesData)
    console.log(Commentes);

  useEffect(()=>{
  
  },[])
    function setArrayfunction(index){
    setArrayIndex(index);
    }
    if(resInfo!==null){
        var {name,avgRating,areaName,locality}=resInfo?.data?.cards[0]?.card?.card?.info;
        var menuitemes=resInfo?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR.cards || resInfo?.data?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR.cards;
        //console.log(menuitemes);
    }
    
function sendCommentData(){
  
  var c=0;
   const filterCmtData=Commentes.map((data)=>{
      if(data.id===resid){
          c++;
      return data;

      }
  })
  console.log(filterCmtData);
  if(c===0){
    var cmtData={name:"pasha",message:"hii",replayes:[]}
    dispatch(addCommentesData({id:resid,message:cmtData}))
  }
}


    return(
       resInfo===null?<Shimmer />:<>
        <div className=""> 
            <div className="flex items-center flex-col">
              <div>
                <h4 className="font-bold">{name}</h4> 
                   {areaName},{locality}
               </div>  
               <p>&#9733;{avgRating}</p>
               <hr style={{width: "320px",borderBottom: "1px dashed #d3d3d3"}}/> 
            </div>
           <div>
              <div>
                     <input onChange={(e)=>setCommentStateMesage(e.target.value)} className="border-solid border-2" placeholder="Add your message on this resturent" value={commentStateMesage} type="text"></input>
                     <button onClick={()=>sendCommentData()}>comment</button>
              </div>
              <div className="border-solid border-2 w-56 h-56">
              <div className="flex flex-col">
                {/* {
                  Commentes.map((data)=><>
                     <img className="w-9 h-10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkN9BY5gyMxjAxe5I3SbK0L_EJf8t-TtE4fJwH_JpMKQ&s"></img>
                  <div className="ml-3 flex flex-row">
                    <p>{data.name}</p>
                    <p>{data.message}</p>
                  </div>
                  </>)
                } */}
              </div>
          </div>
           </div>
          <div className="">
            <div className="">
            {menuitemes.map((data,index)=>{
                return (
                <>
         <div key={index}>
         {<MenuRestarent className="" key={index} arrow={index===arrowIndex?true:false} 
         setArryFunctions={()=>setArrayfunction(index)} setArrayClose={()=>setArrayfunction(null)}
         title={data.card.card.title} data={data}/>}
         </div>
                 
                </>
                )
            })}
            </div>
          </div>
          </div>
        </>
    )
}
export default Restaurent;