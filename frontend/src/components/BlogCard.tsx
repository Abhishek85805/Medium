import { Link } from "react-router-dom";

interface BlogCardProps {
    id: number;
    authorName: string;
    date: string;
    title: string;
    content: string;
}

function BlogCard({id, authorName, date, title, content}: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
        <div className="border-y-1 border-gray-300 py-[1.3rem] w-[50rem] cursor-pointer">
            <div className="flex items-center pb-[1.2rem]">
                <Avatar name={authorName} size="small"/>
                <div className="mx-[0.6rem] font-semibold">{authorName}</div>
                <div className="w-[5px] h-[5px] bg-slate-600 rounded-full mr-[0.6rem]"></div>
                <div className="text-slate-600">{date}</div>
            </div>
            <div className="text-3xl font-bold pb-[0.6rem]">{title}</div>
            <div className="pb-[1.5rem]">{content.length > 50 ? content.split(" ").slice(0, 50).join(" ") + " . . ." : content}</div>
            <div className="text-slate-600">{Math.ceil(content.length/100)} min read</div>
        </div>
    </Link>
  )
}

export function Avatar({name, size}: {name: string; size:"small" | "big"}){
    return (
        <div className={`${size==="small" ? "w-10 h-10" : "w-13 h-13"} rounded-full text-white bg-black font-semibold flex justify-center items-center ${size==="small" ? "text-1xl" : "text-2xl"}`}>{name[0]}</div>
    )
}

export default BlogCard