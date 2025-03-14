import Auth from "../components/Auth"
import Quote from "../components/Quote"


function Signup() {
  return (
    <div className="flex">
        <div className="w-1/2 flex justify-center items-center">
            <Auth type="signup"/>
        </div>
        <Quote/>
    </div>
  )
}

export default Signup