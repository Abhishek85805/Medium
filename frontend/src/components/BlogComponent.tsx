import { useBlog } from "../hooks";
import { Avatar } from "./BlogCard";

function BlogComponent({id} : {id: string}) {
    const {loading, blog} = useBlog(id);

    if(loading){
        return <div>
            loading...
        </div>
    }
  return (
    <div className="flex lg:flex-row flex-col-reverse">
        <div className="w-[2/3] p-[1.2rem]">
            <div className="text-3xl font-bold pb-[1rem]">{blog?.title}</div>
            <div className="text-slate-500 pb-[0.7rem]">Posted on August 24, 2023</div>
            <div>{blog?.content}</div>
        </div>
        <div className="w-[1/3] p-[1.2rem]">
            <div className="font-semibold">Author</div>
            <div className="flex items-center gap-[0.9rem]">
                <div>
                    <Avatar name={blog?.author.name || "Anonymous"} size="small"/>
                </div>
                <div>
                    <div className="text-2xl font-bold pb-[0.7rem]">{blog?.author.name || "Anonymous"}</div>
                    <div className="text-slate-500">Master of mirth, purveyor of puns, and the funniest person in the kingdom</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BlogComponent