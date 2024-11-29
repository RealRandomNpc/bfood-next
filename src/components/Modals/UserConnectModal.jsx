import React from 'react'
import { FcGoogle } from "react-icons/fc";
import DefaultModal from './DefaultModal';
import Image from 'next/image';


function UserConnectModal({ userConnectModalState, setUserConnectModalState}) {
  const closeModal = () => setUserConnectModalState("close");

  return (
    <DefaultModal
      modalId={'user-connect-modal'}
      modalState={userConnectModalState}
      setModalState={setUserConnectModalState}
      closeModal={closeModal}
      className={'bg-b-product-bg/90 border-2 border-b-product-border'}
      wrapperClassName={'md:max-w-md'}
    >
      <div className='text-2xl text-center font-semibold text-b-text-900 w-full'>
        התחברות
      </div>
      <div className='flex flex-col mt-7 mb-2 gap-2 text-b-text-600' dir='ltr'>
        <button className='rounded-lg w-full py-3 px-4 border border-b-product-border bg-b-gray-100/70 hover:bg-b-gray-100/90 flex justify-center items-center  text-lg font-semibold gap-3'>
          <FcGoogle size={32}/><span>Google</span>
        </button>
        <button disabled={true} className='rounded-lg w-full py-3 px-4 border opacity-50 border-b-product-border bg-b-gray-100/70 hover:bg-b-gray-100/90 flex justify-center items-center text-lg font-semibold gap-3'>
          <Image src={'/assets/icons/facebook.svg'} width={32} height={32} alt='facebook icon'/><span>Facebook</span>
        </button>
      </div>
    </DefaultModal>
  )
}

export default UserConnectModal