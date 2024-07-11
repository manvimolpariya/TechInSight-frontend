import { BallTriangle} from "react-loader-spinner"

const Loader = ({text}) => {
  return (
    <div className="flexCenter flex-col gap-5 h-1/6 pt-44">
      <h1 className="bold-16">Loading {text}</h1>

  <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#808080"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
    </div>
  )
}

export default Loader
