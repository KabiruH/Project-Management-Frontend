import { useState } from 'react';
import Modal from 'react-modal';
const customStyles = {
    overlay: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      top: '15%',
      left: '17%',
      right: '17%',
      bottom: '10%',
      margin: 'auto',
      padding: '20px',
      borderRadius: '8px',
      backgroundColor: '#fff',
    },
  };

 const ModalLayout = ({open,children})=>{
    const [isModalOpen,setIsModalOpen] = useState(open)
    return(
        <Modal style={customStyles} isOpen={isModalOpen} onRequestClose={()=>setIsModalOpen(false)} contentLabel={'editMode' ? "Edit Institution" : "Add Institution"} >
        <div className='w-full h-full'>
        <h2 className="text-xl mb-4 mt-3">Add Institution</h2>
       <div className='flex grow'>
         {children}
       </div>
        <div className="flex w-full gap-3 pb-6">
        <button  className="bg-secondary rounded text-white font-[500]  w-full px-3 py-1">Add</button>
        <button onClick={()=>setIsModalOpen(false)}  className="text-primary font-[500] outline outline-1 rounded outline-primary w-full px-3 py-1">Cancel</button>
        </div>
        </div>
         </Modal>
    )
}

export default ModalLayout;