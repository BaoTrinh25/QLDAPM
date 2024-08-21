import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchOptions from '../../configs/useEffects';

const SearchFilter = () => {
  const { careers } = useFetchOptions();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleCareerClick = (careerId) => {
    navigate(`/jobs?career=${careerId}`);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-violet-100 p-4 shadow-md rounded-lg">
      <div className="flex items-center cursor-pointer" onClick={toggleMenu}>
        <div className="w-6 h-6 bg-red-900 text-white rounded-full flex items-center justify-center">
          <div className="flex flex-col space-y-1">
            <span className="block w-4 h-0.5 bg-white"></span>
            <span className="block w-4 h-0.5 bg-white"></span>
            <span className="block w-4 h-0.5 bg-white"></span>
          </div>
        </div>
        <span className="ml-2 text-red-900 font-bold">Lọc theo nghề nghiệp</span>
      </div>
      {isOpen && (
        <div className="flex overflow-x-auto mt-4 space-x-4">
          {careers.map((career) => (
            <button
              key={career.id}
              onClick={() => handleCareerClick(career.id)}
              className="flex-none w-40 h-12 bg-slate-400 text-white rounded-lg shadow-md hover:bg-slate-500 transition-colors duration-200 whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {career.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;