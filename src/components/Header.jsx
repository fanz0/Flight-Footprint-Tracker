import logo from "../images/logo1-removebg-preview.png"

export const Header = () => {
    return(
        <div className="flex items-center bg-[#43a0bf]/20">
            <img className="w-20 sm:w-40 md:w-52 lg:w-72" src={logo} alt="logo" />
            <h1 className="text-center font-bold sm:text-lg md:text-2xl lg:text-4xl w-[70%]">Flight Footprint Tracker</h1>
        </div>
    )
}