import { useEffect, useState } from "react";
import axios from 'axios';
import { BACKEND_URL } from "../config";

interface Blog {
    content: string;
    title: string;
    id : number;
    author: {
        name: string
    }
}

export function useBlogs(){
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response)=>{
            console.log(response.data);
            setBlogs(response.data);
            setLoading(false);
        })
    }, []);

    return {loading, blogs};
}