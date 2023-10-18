const BottemNavBar=()=>{
    return(
        <>
        <div className="flex justify-around fixed bottom-0 left-0 z-50 w-full h-12 bg-white border-t border-gray-200">
            <div>
            <h1>
            <span class="material-symbols-outlined w-48 h-48">
home
</span>
            </h1>
            </div>
            <div>
            <span class="material-symbols-outlined">
search
</span>
            </div>
            <div>
            <span class="material-symbols-outlined">
shopping_cart
</span>
            </div>
            <div>
            <span class="material-symbols-outlined">
person
</span>
            </div>
        </div>
        </>
    )
}
export default BottemNavBar;