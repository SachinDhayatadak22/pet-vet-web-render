import { useState } from 'react';
import uploadIcon from "../../images/icon/upload.svg";

const AddPatient = () => {
  const [formData, setFormData] = useState({
    salutation: '',
    name: '',
    email: '',
    mobile: '',
    address: '',
    zip: '',
    petName: '',
    petType: '',
    petBreed: '',
    birthDate: '',
    vaccinationStatus: '',
    lastVaccinated: '',
    weight: '',
    existingInsurance: false,
    insuranceNumber: '',
    electroChipNumber: '',
    diseases: '',
    currentMedicine: '',
    documents: null,
  });

  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setFormData({ ...formData, documents: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const [errors, setErrors] = useState({});
  const [showInsurance, setShowInsurance] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.salutation) newErrors.salutation = 'Salutation is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
    if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = 'Mobile number must be 10 digits';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!/^\d{5}$/.test(formData.zip)) newErrors.zip = 'ZIP must be 5 digits';
    if (!formData.petName) newErrors.petName = 'Pet name is required';
    if (!formData.petType) newErrors.petType = 'Pet type is required';
    if (!formData.petBreed) newErrors.petBreed = 'Pet breed is required';
    if (!formData.birthDate) newErrors.birthDate = 'Birth date is required';
    if (!formData.vaccinationStatus)
      newErrors.vaccinationStatus = 'Vaccination status is required';
    if (!formData.lastVaccinated)
      newErrors.lastVaccinated = 'Last vaccinated date is required';
    if (!formData.weight || isNaN(formData.weight))
      newErrors.weight = 'Valid weight is required';
    if (formData.existingInsurance && !formData.insuranceNumber)
      newErrors.insuranceNumber = 'Insurance number is required';
    if (!formData.documents)
      newErrors.documents = 'Upload at least one document';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === 'existingInsurance') {
      setShowInsurance(value === 'true');
      setFormData({ ...formData, existingInsurance: value === 'true' });
    } else {
      setFormData({
        ...formData,
        [name]:
          type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(formData);
    }
  };

  const styles =
    'w-full py-3 px-[18px] rounded-[10px] bg-white text-textsecondary border-[1.5px] border-[#F2F2F6] outline-none focus:ring-2 focus:ring-secondary2 mt-[6px]';
  const labelStyle = "text-[18px] text-black font-medium";

  return (
    <>
      <div className="p-6 bg-primary pt-0 pb-[22px]">
        <form onSubmit={handleSubmit}>
          <div className="bg-white p-4 rounded-[12px]">
            <h2 className="text-texttertiary text-[20px] font-medium">
              Pet Owner Detail
            </h2>
            <div className="grid grid-cols-3 gap-x-[20px] gap-y-7 mt-8">
              <div>
                <label htmlFor="salutation" className={labelStyle}>Salutation</label>
                <select name="salutation" id="salutation" className={styles}>
                  <option>Select</option>
                  <option value="mr">Mr</option>
                  <option value="mrs">Mrs</option>
                </select>
                {errors['salutation'] && (
                  <p className="text-red-500">{errors['salutation']}</p>
                )}
              </div>
              <div>
                <label htmlFor="name" className={labelStyle}>Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={styles}
                  placeholder="Name"
                />
                {errors['name'] && (
                  <p className="text-red-500">{errors['name']}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className={labelStyle}>Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={styles}
                  placeholder="Email"
                />
                {errors['email'] && (
                  <p className="text-red-500">{errors['email']}</p>
                )}
              </div>
              <div>
                <label htmlFor="mobile" className={labelStyle}>Mobile Number</label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  className={styles}
                  placeholder="Mobile"
                />
                {errors['mobile'] && (
                  <p className="text-red-500">{errors['mobile']}</p>
                )}
              </div>
              <div>
                <label htmlFor="address" className={labelStyle}>Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className={styles}
                  placeholder="Address"
                />
                {errors['address'] && (
                  <p className="text-red-500">{errors['address']}</p>
                )}
              </div>
              <div>
                <label htmlFor="zip" className={labelStyle}>Zip</label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  className={styles}
                  placeholder="Zip"
                />
                {errors['zip'] && (
                  <p className="text-red-500">{errors['zip']}</p>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-[12px] mt-4">
            <div>
              <h2 className="text-texttertiary text-[20px] font-medium">
                Pet Detail
              </h2>
              <div className="grid grid-cols-3 gap-x-[20px] gap-y-7 mt-8">
                <div>
                  <label htmlFor="petName" className={labelStyle}>Pet Name</label>
                  <input
                    type="text"
                    name="petName"
                    id="petName"
                    className={styles}
                    placeholder="Pet Name"
                  />
                  {errors['petName'] && (
                    <p className="text-red-500">{errors['petName']}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="name" className={labelStyle}>Pet Type</label>
                  <input
                    type="text"
                    name="petType"
                    id="petType"
                    className={styles}
                    placeholder="Pet Type"
                  />
                  {errors['petType'] && (
                    <p className="text-red-500">{errors['petType']}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="petBreed" className={labelStyle}>Pet Breed</label>
                  <input
                    type="text"
                    name="petBreed"
                    id="petBreed"
                    className={styles}
                    placeholder="Pet Breed"
                  />
                  {errors['petBreed'] && (
                    <p className="text-red-500">{errors['petBreed']}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="vaccinationStatus" className={labelStyle}>Vaccination Status</label>
                  <input
                    type="text"
                    name="vaccinationStatus"
                    id="vaccinationStatus"
                    className={styles}
                    placeholder="Vaccination Status"
                  />
                  {errors['vaccinationStatus'] && (
                    <p className="text-red-500">{errors['vaccinationStatus']}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastVaccinated" className={labelStyle}>Last Vaccinated</label>
                  <input
                    type="date"
                    name="lastVaccinated"
                    id="lastVaccinated"
                    className={styles}
                    placeholder="Last Vaccinated"
                  />
                  {errors['lastVaccinated'] && (
                    <p className="text-red-500">{errors['lastVaccinated']}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="birthDate" className={labelStyle}>Birth Date</label>
                  <input
                    type="date"
                    name="birthDate"
                    id="birthDate"
                    className={styles}
                    placeholder="Birth Date"
                  />
                  {errors['birthDate'] && (
                    <p className="text-red-500">{errors['birthDate']}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="weight" className={labelStyle}>Weight</label>
                  <input
                    type="text"
                    name="weight"
                    id="weight"
                    className={styles}
                    placeholder="Weight"
                  />
                  {errors['weight'] && (
                    <p className="text-red-500">{errors['weight']}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="currentMedicine" className={labelStyle}>
                    Current Medicines, if any
                  </label>
                  <input
                    type="text"
                    name="currentMedicine"
                    id="currentMedicine"
                    className={styles}
                    placeholder="Current Medicine"
                  />
                  {errors['currentMedicine'] && (
                    <p className="text-red-500">{errors['currentMedicine']}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="diseases" className={labelStyle}>Diseases, if any</label>
                  <input
                    type="text"
                    name="diseases"
                    id="diseases"
                    className={styles}
                    placeholder="Diseases"
                  />
                  {errors['diseases'] && (
                    <p className="text-red-500">{errors['diseases']}</p>
                  )}
                </div>

                <div>
                  <p className={labelStyle}>Existing Insurances ?</p>
                  <div>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="existingInsurance"
                          className="peer hidden"
                          value={true}
                          checked={showInsurance}
                          onChange={handleChange}
                        />
                        <div className="w-5 h-5 border-2 border-secondary2 rounded-full relative peer-checked:border-secondary2 before:absolute before:content-[''] before:w-3 before:h-3 before:bg-secondary2 before:rounded-full before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:scale-0 peer-checked:before:scale-100 before:transition-transform"></div>
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="existingInsurance"
                          className="peer hidden"
                          value={false}
                          checked={!showInsurance}
                          onChange={handleChange}
                        />
                        <div className="w-5 h-5 border-2 border-secondary2 rounded-full relative peer-checked:border-secondary2 before:absolute before:content-[''] before:w-3 before:h-3 before:bg-secondary2 before:rounded-full before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:scale-0 peer-checked:before:scale-100 before:transition-transform"></div>
                        <span>No</span>
                      </label>
                    </div>
                    {showInsurance && (
                      <div className="mt-5">
                        <input
                          type="text"
                          name="insuranceNumber"
                          id="insuranceNumber"
                          className={styles}
                          placeholder="Insurance Number"
                          onChange={handleChange}
                        />
                        {errors.insuranceNumber && (
                          <p className="text-red-500">{errors.insuranceNumber}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="Electro Chip Number" className={labelStyle}>Diseases, if any</label>
                  <input
                    type="text"
                    name="electroChipNumber"
                    id="electroChipNumber"
                    className={styles}
                    placeholder="Electro Chip Number"
                  />
                </div>
                <div>
                  <h2 className={labelStyle}>Upload Documents</h2>
                  <label className="mt-[5px] p-[12px] relative flex flex-col items-center justify-center w-96 h-64 border-2 border-gray-200 border-dashed rounded-xl bg-white cursor-pointer">
                    {/* Hidden File Input */}
                    <input
                      type="file"
                      accept="image/*"
                      className="peer hidden"
                      name="documents"
                      onChange={handleFileChange}
                    />
                    {errors['documents'] && (
                      <p className="text-red-500">{errors['documents']}</p>
                    )}

                    {/* Thumbnail Preview */}
                    {image ? (
                      <img
                        src={image}
                        alt="Uploaded"
                        className="w-full h-full object-cover rounded-lg shadow-md top-6 left-6"
                      />
                    ) : (
                      <>
                        {/* Upload Icon */}
                        <img src={uploadIcon} alt="" />
                        {/* File Formats */}
                        <p className="text-[#CCCCCCBA] mt-2 peer-hover:text-gray-400 transition text-[18px]">
                          JPG, PNG, SVG, PDF
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
            <div className="pr-16 flex items-center justify-end mt-[40px]">
              <button type="submit" className="py-[12px] px-[90px] bg-secondary text-white text-[18px] font-medium rounded-[12px]">Add</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPatient;
