import { CldImage, CldUploadButton } from 'next-cloudinary'
import { toast } from 'sonner'


const EditableImage = ({imageId, setImageId}) => {

  const uploadCloudinary = async (result) => {
    
    toast.success('Téléchargement...')

    setImageId(result.info.public_id)


    toast.success('teléchargement terminé!')
  }


  return (

    <>

      { imageId && (
        <CldImage
          width="100"
          height="100"
          src={imageId}
          sizes="100vw"
          alt="mon image"
          className=" mb-3"
        />
        
      )}

      {!imageId && (
        <div className='mb-10'>
          Pas d&apos;image
        </div>
      )}

      <form>
      
          <CldUploadButton
          className="
            m-0 p-0 text-gray-400 
            hover:text-green-500 hover:text-lg 
            whitespace-nowrap
            bg-transparent
            cursor-pointer
            "  
            uploadPreset="hwawxrhz"
            onUpload={uploadCloudinary}

          >
            { !imageId && ("Ajouter Image")}
            { imageId && ("Modifier Image")}
            
          </CldUploadButton>

      </form>
    </>
  )
}

export default EditableImage