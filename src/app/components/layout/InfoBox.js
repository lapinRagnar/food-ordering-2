
const InfoBox = ({children}) => {
  return (
    <div 
    className="text-center bg-zinc-600 rounded-md
      border-violet-400 
      shadow-md shadow-fuchsia-700
      mb-10
    "
    >
      {children}
    </div>
  )
}

export default InfoBox