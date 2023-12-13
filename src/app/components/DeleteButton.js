import { useState } from "react"

const DeleteButton = ({label, onDelete}) => {
  const [showConfirm, setShowConfirm] = useState(false)

  if (showConfirm) {
    return (
      <div>
        <div>Etes-vous sure ?</div>
        
        <div className="flex gap-2 mt-5">
          <button 
            className="bg-primary"
            type="button" 
            onClick={() => onDelete()} 
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