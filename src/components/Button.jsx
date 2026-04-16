export default function Button({ 
  width, 
  height, 
  bg = "bg-brand-yellow", 
  textColor = "text-gray-900", 
  btnText, 
  className = "",
  onClick, 
  type = "button"
}) {
  return (
    <button
      type={type}
      onClick={onClick} 
      style={{ width, height }}
      className={`flex items-center justify-center rounded-xl font-bold transition-all hover:opacity-90 ${bg} ${textColor} ${className}`}
    >
      {btnText}
    </button>
  );
}