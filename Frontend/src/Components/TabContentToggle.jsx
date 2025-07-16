import React, { useContext } from 'react';
import { Store } from '../Store/Store';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

const TabContentToggle = () => {
  const { isTabContentOpen, setIsTabContentOpen } = useContext(Store);
  
  return (
    <button 
      className="lg:hidden fixed top-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer transition-transform duration-300 hover:bg-blue-700"
      onClick={() => setIsTabContentOpen(!isTabContentOpen)}
    >
      {isTabContentOpen ? <MdOutlineNavigateNext/> : <MdOutlineNavigateBefore/>}
    </button>
  );
};
export default TabContentToggle;
