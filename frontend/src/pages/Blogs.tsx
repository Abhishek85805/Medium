import AppBar from "../components/AppBar"
import BlogCard from "../components/BlogCard"
import { useBlogs } from "../hooks"

function Blogs() {
    const {loading, blogs} = useBlogs();

    if(loading){
        return <div>
            loading...
        </div>
    }
  return (
    <div>
        <AppBar/>
        <div className="flex flex-col items-center">
            {blogs.map((blog, index) => 
                <BlogCard 
                id = {blog.id}
                authorName={blog.author.name}
                date="4 Oct 2002"
                title={blog.title}
                content={blog.content}
                key={index}
                />
            )}
            
        </div>
    </div>
  )
}

export default Blogs