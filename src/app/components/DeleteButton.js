import { useState } from "react"

const DeleteButton = ({label, onDelete}) => {
  const [showConfirm, setShowConfirm] = useState(false)

  if (showConfirm) {
    return (
      <div 
        className="flex items-center 
        justify-center bg-transparent/80 
        inset-0 h-full 
        absolute"
        
      >

        <div className="p-10 border-emerald-900 rounded-lg  ">
          <div>Etes-vous sure ?</div>
          
          <div className="flex gap-2 mt-5">
            <button 
              className="bg-primary"
              type="button" 
              onClick={() => {onDelete(); setShowConfirm(false)}} 
            >
              Oui, Supprimer
            </button>
            <button
              type="button"
              onClick={() => setShowConfirm(false)}
            >
              Annuler
            </button>
          </div>

        </div>

      </div>
    )
  }

  return (
    <button 
      className="bg-transparent text-red-600 hover:bg-red-200 hover:text-red-800" 
      onClick={() => setShowConfirm(true)}
    >
      {label}
    </button>
  )
}

export default DeleteButton