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
            setBlogs(response.data);
            setLoading(false);
        })
    }, []);

    return {loading, blogs};
}

export function useBlog(id : string){
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    console.log(id);

    useEffect(() => {
        console.log(`${BACKEND_URL}/api/v1/blog/${id}`);
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response)=>{
            console.log(response);
            setBlog(response.data);
            setLoading(false);
        })
    }, [id]);

    return {loading, blog}
}