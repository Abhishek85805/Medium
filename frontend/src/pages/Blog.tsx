import AppBar from "../components/AppBar"
import BlogComponent from "../components/BlogComponent"
import { useParams } from "react-router-dom"

function Blog() {
  const {id} = useParams<{id: string}>();
  return (
    <div>
        <AppBar/>
        <div className="pt-[1.4rem]">
          <BlogComponent id={id || ""}/>
        </div>
    </div>
  )
}

export default Blog