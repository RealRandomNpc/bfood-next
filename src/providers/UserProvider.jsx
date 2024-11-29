'use client';
import UserConnectModal from '@/components/Modals/UserConnectModal';
import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { HiBuildingOffice } from 'react-icons/hi2';
import { IoMdHome } from 'react-icons/io';
import { MdApartment } from 'react-icons/md';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext)



const DELIVERY_ADDRESS = [
  {
    residence_type: 'house',
    city: 'תל אביב',
    street: 'דרך נמיר',
    house_number: '123',
    floor_number: '1',
    apartment_number: '1',
    entrance: '1',
  },
  {
    residence_type: 'office',
    city: 'תל אביב',
    street: 'דרך נמיר',
    house_number: '123',
    floor_number: '1',
    apartment_number: '1',
    entrance: '1',
  }
]

const residenceTypeToIcon = {
  house: IoMdHome,
  apartment: MdApartment,
  office: HiBuildingOffice
}

const residenceTypeToHebrew = {
  house: "בית",
  apartment: "דירה",
  office: "משרד",
};

function UserProvider({ children}) {
  const [userAddresses, setUserAddresses] = useState([])
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1)
  const [userConnectModalState, setUserConnectModalState] = useState("close");

  const addUserAddress = (address) => setUserAddresses(prev => [...prev, address])
  const triggerConnectModal = () => setUserConnectModalState("open");

  useEffect(() => {
    if (userAddresses.length > 0 && selectedAddressIndex === -1) {
      setSelectedAddressIndex(0)
    }
  }, [userAddresses, selectedAddressIndex])

  useEffect(() => {
    localStorage.setItem('userAddresses', JSON.stringify(userAddresses));
  }, [userAddresses])
  useEffect(() => {
    localStorage.setItem('selectedAddressIndex', JSON.stringify(selectedAddressIndex));
  }, [selectedAddressIndex])

  useLayoutEffect(() => {
    const storageUserAddresses =JSON.parse(localStorage.getItem('userAddresses') ?? '') || [];
    const storageSelectedAddressIndex = JSON.parse(localStorage.getItem('selectedAddressIndex')) || -1;

    if (storageSelectedAddressIndex > -1) {
      setSelectedAddressIndex(storageSelectedAddressIndex)
    }
    if (storageUserAddresses.length > 0) {
      setUserAddresses(storageUserAddresses)
    }

  }, [])

  return (
    <UserContext.Provider value={{userAddresses, addUserAddress, selectedAddressIndex, setSelectedAddressIndex, residenceTypeToIcon, residenceTypeToHebrew, triggerConnectModal}}>
      {children}
      <UserConnectModal userConnectModalState={userConnectModalState} setUserConnectModalState={setUserConnectModalState}/>
    </UserContext.Provider>
  )
}

export default UserProvider