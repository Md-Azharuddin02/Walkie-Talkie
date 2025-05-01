import React, { useState, useContext } from 'react';
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { Store } from '../Store/Store';

const InputField = ({ label, type, value, onChange, placeholder, required }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      required={required}
    />
  </div>
);

const AddNewUser = () => {
  const { isCardOpen, setIsCardOpen, addUser } = useContext(Store);
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState({
    number: '',
    name: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await addUser(details)
    setIsLoading(false);
    setIsCardOpen(false)
    setDetails({
      number: '',
      name: '',
    })
  };

  return (
    <div className={`${!isCardOpen ? 'hidden' : " "} flex justify-center items-center bg-gradient-to-r from-blue-50 to-purple-50 absolute top-[180px] left-[95px] w-[410px] shadow-2xl transform transition-all duration-500 hover:scale-105`}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md backdrop-blur-sm bg-opacity-80">
        <MdCancel className='text-2xl cursor-pointer float-end text-gray-700 hover:text-gray-900 transition-colors duration-300 relative top-[-20px] right-[-20px]' onClick={() => setIsCardOpen(!isCardOpen)} />
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New User
        </h2>


        <form onSubmit={handleSubmit}>
          <InputField
            label="Phone Number"
            type="number"
            value={details.number}
            onChange={(e) => setDetails(prev => ({ ...prev, number: e.target.value }))}
            placeholder="Enter phone number"
            required
          />

          <InputField
            label="Name"
            type="text"
            value={details.name}
            onChange={(e) => setDetails(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter name"
            required
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className={`text-6xl rounded-2xl  ${isLoading ? 'text-grey-700' : ''} text-green-700 cursor-pointer px-6 py-2 rounded-lg transition duration-300  hover:scale-110`}
            >
              <IoIosArrowDroprightCircle display={isLoading} className={`${isLoading ? 'text-grey-700' : ''} `} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewUser;