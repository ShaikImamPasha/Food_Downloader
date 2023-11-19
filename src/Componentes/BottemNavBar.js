import { Link } from "react-router-dom";

const BottemNavBar=()=>{
    return(
        <>
        <div className="flex justify-around fixed bottom-0 left-0 z-50 w-full h-12 bg-white border-t border-gray-200">
           <Link to="/">
           <div>
    <span class="material-symbols-outlined mt-3 cursor-pointer">
home
</span>
            </div>
           </Link>
            <Link to="/search/">
            <div >
            <span class="material-symbols-outlined mt-3 cursor-pointer">
search
</span>
            </div>
            
            </Link>
            <Link to={"/FavourateCard/"}>
            <div>
            <span class="material-symbols-outlined mt-3 cursor-pointer">
shopping_cart
</span>
            </div>
            </Link>
           
            <div>
            <span class="material-symbols-outlined mt-3 cursor-pointer">
person
</span>
            </div>
            <div>
            <Link to="/map/">
            <img className="w-8 h-8 mt-1 cursor-pointer" src="https://cdn-icons-png.flaticon.com/128/731/731549.png"></img>
            </Link> 
              </div>  
        </div>
        </>
    )
}
export default BottemNavBar;