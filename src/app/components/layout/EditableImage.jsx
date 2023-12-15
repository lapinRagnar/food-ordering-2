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

      <div className=''>
        { imageId && (
          <CldImage
            width="300"
            height="300"
            src={imageId}
            sizes="100vw"
            alt="mon image"
            className=" mb-3"
          />
          
        )}

        {!imageId && (
          <div className='relative'>
            Pas d&apos;image
          </div>
        )}
      </div>

      <div className='flex justify-center -mt-10'>
      
          <CldUploadButton
          className="
           text-gray-400 
            hover:text-gray-100
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

      </div>
    </>
  )
}

export default EditableImage