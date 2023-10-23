const RestaurantCard = () => {
    return (
        <div className='p-4 m-2 w-64 shadow-lg rounded-md h-[90%] bg-slate-200' >
            {/* <img src="" alt="image"/> */}
            <h5 className="bg-gray-400">{}</h5>
            <h2 className="bg-gray-400">{}</h2>
            <h6 className="bg-gray-400">{}</h6>
        </div>
    )
}

const Shimmer = () => {
    return (
        <div className="max-h-screen">
            <div className="bg-orange-700 p-4 text-gray-50 border-b-2 border-blue-800 flex justify-center items-center">
                <input 
                className='p-2 mx-4 rounded-lg' 
                type="text" 
                placeholder='Search' 
                defaultValue=''
                />
                <a className="mx-4 hover:text-yellow-300" href="#"><span className="material-symbols-outlined">search</span> </a>
                <button className="mx-4 hover:text-yellow-300" onClick={() => {
                }}>Clear Search</button>
            </div>
            <div className="container h-72 mx-auto p-4 flex flex-wrap justify-around m-2">
                {
                    Array.from({length : 20}).map((_,index) => (
                        <RestaurantCard key={ index }/>
                    ))
                }
            </div>
        </div>
    )
}

export default Shimmer