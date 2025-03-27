import { useState } from 'react';
import uploadIcon from "../../images/icon/upload.svg";
import FileUpload from '../../components/FileUpload/index.jsx';
import { apiPOST } from '../../utils/apiHelper.js';
import { toast } from 'react-toastify';
import Select from "react-select";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const initialFormData = {
  profilePic: 'empty-string',
  fullname: '',
  email: '',
  contactNumber: '',
  address: '',
  specialization: '',
  workingDaysHours: {
    days: [],
    hours: {
      start: dayjs(new Date(Date.now()).getTime()),
      end: dayjs(new Date(Date.now()).getTime()),
    }
  },
  calenderResource: false,
  contractBase: "",
  individualVetService: "",
  healthInsurance: "",
  birthDate: '',
  licensureDetails: '',
  divisions: '',
  language: '',
  certificationDocument: 'empty-string',
  documents: 'empty-string',
  notes: ''
}

const AddVets = () => {

  const [formData, setFormData] = useState(initialFormData);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const validateInput = (name, value) => {
    if (typeof value !== "string") {
      value = value ? String(value) : "";
    }
    const rules = {
      fullname: {
        regex: /^[A-Za-z\s]+$/, // Only letters and spaces allowed
        error: "Name should contain only letters and spaces",
        required: true
      },
      email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Standard email format
        error: "Enter a valid email address",
        required: true
      },
      contactNumber: {
        regex: /^[+]?[\d]{10,15}$/, // 10 to 15 digits, optional leading "+"
        error: "Contact number must be between 10-15 digits (only numbers and + allowed)",
        required: true
      },
      address: {
        minLength: 5,
        error: "Address must be at least 5 characters long",
        required: true
      },
      specialization: {
        required: true,
        error: "Specialization is required"
      },
      workingHours: {
        required: true,
        error: "Working hours are required"
      },
      // calenderResource: {
      //   required: true,
      //   error: "Calendar resource is required"
      // },
      contractBase: {
        required: true,
        error: "Contract base is required"
      },
      // documents: {
      //   required: true,
      //   error: "Upload at least one document"
      // },
      licensureDetails: {
        regex: /^[A-Za-z0-9\s-]+$/, // Letters, numbers, spaces, and hyphens
        error: "License should contain only letters, numbers, spaces, or hyphens",
        required: true
      },
      language: {
        regex: /^[A-Za-z\s,]+$/, // Comma-separated list of languages
        error: "Enter valid languages separated by commas",
        required: false
      }
    };

    const rule = rules[name];

    if (rule) {
      if (rule.required && !value?.trim()) return "This field is required";
      if (rule.regex && !rule.regex.test(value)) return rule.error;
      if (rule.minLength && value.length < rule.minLength) return rule.error;
    }

    return "";
  };

  const validateForm = () => {
    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateInput(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate on change
    const errorMsg = validateInput(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const isValid = validateForm();

      if (!isValid) return;

      const response = await apiPOST('/vet/add-vetDetails', formData);

      if (response.status === 201) {
        toast.success("Vet added successfully");
      } else {
        toast.error( response?.data?.data||"Failed to add vet");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error while saving the vet details!");
    } finally {
      setFormData(initialFormData);
      setErrors({});
      setLoading(false);
    }
  };

  const [value, setValue] = useState(dayjs());


  const weekDays = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" }
  ];

  // Handle weekday selection change
  const handleWeekdayChange = (selectedOptions) => {
    setFormData(prev => ({
      ...prev,
      workingDaysHours: { ...prev.workingDaysHours, days: selectedOptions.map(option => option.value) }
    }));
  };

  const handleTimeChange = (field, newValue) => {
    if (newValue) {
      setFormData((prev) => ({
        ...prev,
        workingDaysHours: {
          ...prev.workingDaysHours,
          hours: {
            ...prev.workingDaysHours.hours,
            [field]: newValue.toISOString(), // Convert to ISO 8601 format
          },
        },
      }));
    }
  };


  const styles =
    'w-full py-3 px-[18px] rounded-[10px] bg-white text-textsecondary  border-[1.5px] border-[#F2F2F6]  outline-none focus:ring-2 focus:ring-secondary2 mt-[6px]';
  const labelStyle = "text-[18px] text-black font-medium";

  return (
    <>
      <div className="p-6 bg-primary pt-0 pb-[22px]">
        <form onSubmit={handleSubmit}>
          <div className="bg-white p-[22px] rounded-[12px]">
            <div className="grid grid-cols-12 gap-x-8 gap-y-7">
              <div className="col-span-4">
                <FileUpload title="Profile Picture" onFileSelect={(file) => setFormData({ ...formData, profilePic: file })} error={errors.profilePic} />
              </div>
              <div className="col-span-8 grid grid-cols-2 gap-x-[20px] gap-y-7">
                {[
                  { name: "fullname", label: "Full Name", type: "text" },
                  { name: "contactNumber", label: "Contact Number", type: "text" },
                  { name: "email", label: "Email Address", type: "email" },
                  { name: "specialization", label: "Specialization", type: "text" },
                  { name: "language", label: "Language", type: "text" },
                  { name: "calenderResource", label: "Calendar Resource (y/n)", type: "checkbox" }, // Added checkbox
                ].map(({ name, label, type }) => (
                  <div key={name}>
                    <label htmlFor={name} className={labelStyle}>{label}:</label>
                    {type === "checkbox" ? (
                      <input
                        type="checkbox"
                        name={name}
                        id={name}
                        className="mt-12 ml-4"
                        checked={formData[name] || false}
                        onChange={(e) => setFormData({ ...formData, [name]: e.target.checked })}
                      />
                    ) : (
                      <input
                        type={type}
                        name={name}
                        id={name}
                        className={styles}
                        placeholder={label}
                        value={formData[name]}
                        onChange={handleChange}
                      />
                    )}
                    {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-x-[20px] gap-y-7 mt-[22px]">
              {[
                { name: "contractBase", label: "Contract Base" },
                { name: "individualVetService", label: "Individual Vet Services" },
                { name: "healthInsurance", label: "Health Insurance" },
                { name: "birthDate", label: "Birthday", type: "date" },
                { name: "licensureDetails", label: "Licensure (State/Country & License Number)" },
                { name: "divisions", label: "Divisions" }
              ].map(({ name, label, type }) => (
                <div key={name}>
                  <label htmlFor={name} className={labelStyle}>{label}:</label>
                  <input
                    type={type || "text"}
                    name={name}
                    id={name}
                    className={styles}
                    placeholder={label}
                    value={formData[name]}
                    onChange={handleChange}
                  />
                  {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-12 gap-x-8 gap-y-7 mt-7">
              <div className="col-span-8 grid grid-cols-2 gap-x-8">
                <FileUpload title="Upload Certification" onFileSelect={(file) => setFormData({ ...formData, certificationDocument: file })} error={errors.certificationDocument} />
                <FileUpload title="Upload Documents" onFileSelect={(file) => setFormData({ ...formData, documents: file })} error={errors.documents} />
              </div>
              <div className="col-span-4">
                <label htmlFor="workingDays" className="block font-medium mb-1">General Working Days:</label>
                <Select
                  id="workingDays"
                  options={weekDays}
                  isMulti
                  className="w-full z-10"
                  classNamePrefix="react-select"
                  value={weekDays.filter(day => formData.workingDaysHours.days.includes(day.value))}
                  onChange={handleWeekdayChange}
                />
                <label className="block font-medium mt-4">Working Hours:</label>
                <div className="flex gap-2 mt-2">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Start Time"
                      value={formData.workingDaysHours.hours.start ? dayjs(formData.workingDaysHours.hours.start) : null}
                      onChange={(newValue) => handleTimeChange("start", newValue)}
                      ampm={new Intl.DateTimeFormat().resolvedOptions().hourCycle === "h12"}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker
                      label="End Time"
                      value={formData.workingDaysHours.hours.end ? dayjs(formData.workingDaysHours.hours.end) : null}
                      onChange={(newValue) => handleTimeChange("end", newValue)}
                      ampm={new Intl.DateTimeFormat().resolvedOptions().hourCycle === "h12"}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div className="col-span-8">
                <label htmlFor="address" className={labelStyle}>Address:</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className={styles}
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-x-8 gap-y-7 mt-4">
              <div className="col-span-8">
                <label htmlFor="notes" className={labelStyle}>Notes:</label>
                <textarea
                  type="textarea"
                  name="notes"
                  id="notes"
                  className={styles}
                  placeholder="Notes"
                  value={formData.notes}
                  onChange={handleChange}
                />
                {errors.notes && <p className="text-red-500 text-sm mt-1">{errors.notes}</p>}
              </div>
            </div>
            <div className="pr-16 flex items-center justify-end mt-[20px]">
              <button
                type="submit"
                className={`py-[12px] px-16 flex items-center gap-3 bg-secondary text-white text-[18px] font-medium opacity-80 hover:opacity-100 rounded-[12px] ${loading ? "opacity-80" : ""}`}>
                <span>
                  Add
                </span>
                {
                  loading &&
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress color='white' size={22} />
                  </Box>
                }
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddVets;
