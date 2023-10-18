const BottemNavBar=()=>{
    return(
        <>
        <div className="flex justify-around fixed bottom-0 left-0 z-50 w-full h-12 bg-white border-t border-gray-200">
            <div>
    <span class="material-symbols-outlined mt-3 cursor-pointer">
home
</span>
            </div>
            <div>
            <span class="material-symbols-outlined mt-3 cursor-pointer">
search
</span>
            </div>
            <div>
            <span class="material-symbols-outlined mt-3 cursor-pointer">
shopping_cart
</span>
            </div>
            <div>
            <span class="material-symbols-outlined mt-3 cursor-pointer">
person
</span>
            </div>
        </div>
        </>
    )
}
export default BottemNavBar;