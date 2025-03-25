import { useState } from 'react';
import examinationIcon from '../../images/services/examination.svg';
import surgicalIcon from '../../images/services/surgical.svg';
import protectionIcon from '../../images/services/protection.svg';
import petVaccinationIcon from '../../images/services/pet-vaccine.svg';
import servicePawIcon from '../../images/services/servicePaws.svg';
import consultationIcon from '../../images/services/consultation.svg';

export let services = [
  { title: "Examination Treatment", icon: servicePawIcon },
  { title: "Surgical Consultation", icon: surgicalIcon },
  { title: "Others", icon: protectionIcon },
  { title: "Annual Vaccination", icon: petVaccinationIcon },
  { title: "Initial Vaccination/Consultation", icon: consultationIcon },
  { title: "Geriatric Examination", icon: examinationIcon },
].map(service => ({
  ...service,
  duration: "30 Minutes",
  description: "Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
}));

export const ServiceCard = ({ title, duration, description, icon }) => (
  <div className="flex items-center gap-4 pt-[9px] pl-[13px] pb-[13px] pr-9 bg-bg2 rounded-[10px] shadow-sm">
    <img src={icon} alt={title} />
    <div>
      <h3 className="text-[16px] leading-[20px] font-medium">{title}</h3>
      <p className="text-[10px] leading-[20px] font-medium">{duration}</p>
      <p className="text-[11px] leading-[15px] font-medium mt-[8px]">{description}</p>
    </div>
  </div>
);

const styles =
  'w-full py-3 px-[18px] rounded-[10px] bg-primary text-textsecondary outline-none focus:ring-2 focus:ring-secondary2';

const ClinicService = () => {
  const [data, setServices] = useState(services);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newService, setNewService] = useState({ title: "", duration: "30 Minutes", description: "", icon: examinationIcon });


  const handleAddService = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setServices((prevServices) => [
      ...prevServices,
      {
        title: "",
        duration: "30 Minutes",
        description: "",
        icon: examinationIcon
      }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newService.title && newService.description) {
      setServices([...services, newService]);
      newService.title = "";
      newService.description = "";
      handleCloseModal();
    }
  }


  return (
    <div className="mt-7">
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-[20px] font-medium mb-[7px]">Services</h2>
          <p className="text-textColor2 text-[16px] font-normal">Select your Services</p>
        </div>
        <div>
          <button onClick={handleAddService} className="px-6 py-3 bg-secondary text-white text-[16px] font-medium rounded-[12px]">
            Add Services
          </button>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add New Service</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Service Title"
                className={styles}
                value={newService.title}
                onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Service Description"
                className={`mt-4 ${styles}`}
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                required
              />
              <button type="submit" className="w-full bg-secondary2 rounded-[12px] text-white p-2 mt-4">
                Add Service
              </button>
              <button type="button" onClick={handleCloseModal} className="w-full bg-gray-400 text-white p-2 rounded mt-2">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicService;
