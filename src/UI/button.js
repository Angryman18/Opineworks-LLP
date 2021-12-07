
const Button = (props) => {
    return (
        <button className="text-base sm:text-md transition duration-100 ease-in px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:text-xl" {...props}>{props.text}</button>
    )
}

export default Button;