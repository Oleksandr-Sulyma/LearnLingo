// src/components/Button.jsx
export default function Button({ 
  width, 
  height, 
  bg = "bg-brand-yellow", 
  textColor = "text-gray-900", 
  btnText, 
  className = "" 
}) {
  return (
    <button
      style={{ width, height }}
      className={`flex items-center justify-center rounded-xl font-bold transition-all hover:opacity-90 ${bg} ${textColor} ${className}`}
    >
      {btnText}
    </button>
  );
}