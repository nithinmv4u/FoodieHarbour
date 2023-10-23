import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { LOGO } from "../constants";
// import logo from 'public/public_assets/food_template.jpg'; 

const Header = () => {
    const { user, logoutUser } = useContext(AuthContext)
    return (
        <>
        <div className='flex justify-between items-center p-2 bg-orange-600 drop-shadow-xl'>
            <div className="flex justify-around items-center w-2/6 font-bold text-white ">
                <img className="h-7" src={ LOGO } alt="Foodie Harbour Logo" />
                <Link to="/about"><h4 className="hover:text-yellow-200" key={0}>About</h4></Link>
                <Link to="/"><h4 className="hover:text-yellow-200" key={1}>Home</h4></Link>
                <Link to="/contact"><h4 className="hover:text-yellow-200" key={2}>Contact</h4></Link>                
                <Link to='/instamart' ><h4 className="hover:text-yellow-200" key={4}>Instamart</h4></Link>
                {/* <Link to="/cart"><h4 className="hover:text-yellow-200" key={3}>Cart -{cartNos} items</h4></Link> */}
            </div>
            <div className="flex items-center w-2/12 justify-around font-bold text-white">
                
                <div>
                    {user && <h4>Hello, {user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h4>}
                    {/* <h4 className={`bg-[${status[1]}] px-2 border-white border rounded-lg`}>status : {status[0]}</h4> */}
                </div>
                {
                    user ? <button className="hover:text-yellow-200 bg-orange-700 rounded-md p-2 mx-2"  onClick={() => {
                        logoutUser();
                    }}>Logout</button> : 
                    <Link to={'/login'}><button className="hover:text-yellow-200">Login</button></Link>
                }
            </div>
        </div>
        </>
    )
}

export default Header;