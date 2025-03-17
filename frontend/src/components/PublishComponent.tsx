import axios from "axios";
import { useState } from "react"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

function PublishComponent() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function publishPost(){
        try {
            setLoading(true);
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content
            },{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setLoading(false);
            navigate(`/blog/${response.data.id}`)
        } catch (error) {
            console.log("Error while posting blog", error);
        }
    }

    if(loading){
        return <div>
            loading...
        </div>
    }

  return (
    <div className="flex flex-col items-center mx-[3rem]">
        <div className="w-full mt-[2.3rem] mb-[1.3rem]">
            <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none" placeholder="Write the title" onChange={(e) => setTitle(e.target.value)}/>
        </div>
        
        <div className="w-full h-[15rem] mb-[1.3rem]">
            <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none h-full" placeholder="Write your thoughts here..." onChange={(e) => setContent(e.target.value)}></textarea>
        </div>

        <button 
        type="button" 
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 self-start"
        onClick={publishPost}
        >
            Publish
        </button>
    </div>
  )
}

export default PublishComponent