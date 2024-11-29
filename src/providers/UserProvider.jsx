'use client';
import UserConnectModal from '@/components/Modals/UserConnectModal';
import useLocalStorage from '@/hooks/useLocalStorage';
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
  const [userAddresses, setUserAddresses] = useLocalStorage('user_addresses', []);
  const [selectedAddressIndex, setSelectedAddressIndex] = useLocalStorage('selected_address_index',-1)
  const [userConnectModalState, setUserConnectModalState] = useState("close");

  const addUserAddress = (address) => setUserAddresses(prev => [...prev, address])
  const triggerConnectModal = () => setUserConnectModalState("open");

  useEffect(() => {
    if (userAddresses.length > 0 && selectedAddressIndex === -1) {
      setSelectedAddressIndex(0)
    }
  }, [userAddresses, selectedAddressIndex])

  return (
    <UserContext.Provider value={{userAddresses, addUserAddress, selectedAddressIndex, setSelectedAddressIndex, residenceTypeToIcon, residenceTypeToHebrew, triggerConnectModal}}>
      {children}
      <UserConnectModal userConnectModalState={userConnectModalState} setUserConnectModalState={setUserConnectModalState}/>
    </UserContext.Provider>
  )
}

export default UserProvider