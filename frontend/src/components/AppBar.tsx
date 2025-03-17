import { Avatar } from "./BlogCard"
import {Link} from "react-router-dom";

function AppBar() {
  return (
    <div className="h-[80px] flex justify-between  items-center px-[2rem] border-b border-gray-300">
        <div className="text-2xl font-semibold cursor-pointer">MEDIUM</div>
        <div className="flex items-center h-full">
          <Link to={"/publish"}>
            <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-8">New</button>
          </Link>
          <Avatar name="Abhishek" size="big"/>
        </div>
    </div>
  )
}

export default AppBar