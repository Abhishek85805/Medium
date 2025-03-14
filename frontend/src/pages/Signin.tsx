import Auth from "../components/Auth"
import Quote from "../components/Quote"

function Signin() {
  return (
    <div className="flex">
      <div className="w-1/2 flex justify-center items-center">
          <Auth type="signin"/>
      </div>
        <Quote/>
    </div>
  )
}

export default Signin