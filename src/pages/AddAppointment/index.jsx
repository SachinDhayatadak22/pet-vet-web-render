import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { services, ServiceCard } from '../../components/ClinicService/index.jsx';
import anyvet from '../../images/vets/any-vet.svg';
import kile from '../../images/vets/kile.svg';
import kindle from '../../images/vets/kindle.svg';
import sem from '../../images/vets/sem.svg';
import ching from '../../images/vets/ching.svg';
import robert from '../../images/vets/robert.svg';
import BookingCalender from '../../components/BookingCalender/index.jsx';

const vets = [
  { src: anyvet, name: 'Any Vet' },
  { src: kile, name: 'Dr. Stranger Kile' },
  { src: kindle, name: 'Dr. Kindle Joy' },
  { src: sem, name: 'Dr. Louise Sem' },
  { src: ching, name: 'Dr. Ching Chong' },
  { src: robert, name: 'Dr. Robert' }
];

const SectionTitle = ({ title }) => (
  <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
);

const SearchBar = () => (
  <div className="col-span-6 relative">
    <span className="absolute text-gray-500 text-lg font-bold top-4 left-4">
      <IoSearchOutline />
    </span>
    <input
      type="text"
      className="w-full py-3 pl-10 pr-5 rounded-lg bg-primary text-textColor2 outline-none focus:ring-2 focus:ring-secondary"
      placeholder="Search Anything"
    />
  </div>
);

const PatientNotFound = () => (
  <div className="col-span-6 flex items-center">
    <span className="text-gray-500 text-sm">Patient Not Found. </span>
    <a href="#" className="text-secondary text-sm ml-1">Create New Pet Patient</a>
  </div>
);

const VetSelection = () => (
  <div className="mt-8">
    <SectionTitle title="Select Employee" />
    <div className="mt-6 flex flex-wrap gap-4">
      {vets.map((vet, index) => (
        <figure key={index} className="text-center flex-1 flex-col items-center justify-center">
          <img src={vet.src} alt={vet.name} className="rounded-full" />
          <figcaption className="mt-2 text-textColor4 font-medium text-[16px] leading-[19px]">{vet.name}</figcaption>
        </figure>
      ))}
    </div>
  </div>
);

const ServiceSelection = () => (
  <div className="mt-8">
    <SectionTitle title="Service" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} />
      ))}
    </div>
  </div>
);


const AddAppointment = () => {
  return (
    <div className="p-6 bg-primary rounded-lg pt-0">
      <div className="bg-white p-6">
        <SectionTitle title="Select Patient" />
        <div className="grid grid-cols-12 gap-4 mt-6">
          <SearchBar />
          <PatientNotFound />
        </div>
        <VetSelection />
        <ServiceSelection />
        <BookingCalender />
      </div>
    </div>
  );
};

export default AddAppointment;
