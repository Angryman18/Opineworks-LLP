const Input = (props) => {
  return (
    <input
      className="border-2 m-2 border-transparent filter drop-shadow-lg p-2 rounded-lg focus:border-blue-600 focus:outline-none focus:bg-blue-100"
      {...props}
    />
  );
};

export default Input;
