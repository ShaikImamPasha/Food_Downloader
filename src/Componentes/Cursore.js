const Cursore=(props)=>{
    const {data}=props;
    console.log(data.imageId)
    return(
        <>
        <div>
        <img  className='w-64 h-52' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/"+data.imageId}></img>    
         </div>    
    
        </>
    )
}
export default Cursore;