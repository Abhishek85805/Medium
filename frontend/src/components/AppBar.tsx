import { Avatar } from "./BlogCard"

function AppBar() {
  return (
    <div className="h-[80px] flex justify-between  items-center px-[2rem] border-b border-gray-300">
        <div className="text-2xl font-semibold cursor-pointer">MEDIUM</div>
        <Avatar name="Abhishek" size="big"/>
    </div>
  )
}

export default AppBar