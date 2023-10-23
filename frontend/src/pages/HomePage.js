import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import jwt_decode from "jwt-decode";
// import axiosInstance from "../utils/axiosInstance";
import useAxios from "../utils/useAxios";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import Shimmer from "../components/ShimmerUI";

const HomePage = () => {
    const {authToken, logoutUser} = useContext(AuthContext)
    const [notes, setNotes] = useState([]);
    const [items, setItems] = useState([]);
    const notesApi = useAxios();
    const itemsApi = useAxios();

    console.log(items);
    console.log("access HomePage",jwt_decode(authToken.access));

    const getNotes = async() => {
        console.log("get Notes");
        const response = await notesApi.get('/api/notes/');
        console.log("response : ",response);
        if(response.status === 200){
            setNotes(response.data)
        }else{
            logoutUser();
        }
    }

    const getItems = async () => {
        try {
            const response = await itemsApi.get('/items/');
            console.log("item response: ", response);
            setItems(response.data)
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle 401 error, e.g., refresh the access token or redirect to login
                console.log("Authentication error. Refresh token or redirect to login.");
            } else {
                // Handle other errors
                console.error("Error:", error);
                logoutUser();
            }
            
        }
    }

    useEffect(() => {
        console.log("useEffect");
        // getNotes()
        getItems()
    },[]);



    return items.length ? (
        <div className='container mx-auto p-4 flex flex-wrap justify-around m-2' key={1}>
        {
            items.map((item) => {
                return (<Link to={"/item/"+item?.id}><ItemCard {...item} key={item?.id}/></Link>)
            })
        }
        </div>
    ) : (
        <Shimmer/>
    )
}

export default HomePage