import React, { useState } from 'react';
import { Pet } from '../../data/petData';

interface AdoptionFormProps {
  pet: Pet;
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  housingType: string;
  hasChildren: boolean;
  hasPets: boolean;
  experience: string;
  reason: string;
  agreedToTerms: boolean;
}

const AdoptionForm: React.FC<AdoptionFormProps> = ({ pet, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    housingType: '',
    hasChildren: false,
    hasPets: false,
    experience: '',
    reason: '',
    agreedToTerms: false
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is updated
    if (errors[name as keyof FormData]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormData];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    // Required fields
    ['firstName', 'lastName', 'email', 'phone', 'reason'].forEach(field => {
      if (!formData[field as keyof FormData]) {
        newErrors[field as keyof FormData] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (formData.phone && !/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Terms agreement
    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'You must agree to the terms to proceed';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        onSubmit(formData);
        setSubmitting(false);
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-primary-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-primary-800 mb-2">Adoption Application for {pet.name}</h3>
        <p className="text-primary-700">
          Please complete this form to begin the adoption process. Our team will review your application and contact you within 1-2 business days.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="form-label">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="address" className="form-label">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="form-group">
          <label htmlFor="city" className="form-label">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="state" className="form-label">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="zipCode" className="form-label">ZIP Code</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="housingType" className="form-label">Housing Type</label>
        <select
          id="housingType"
          name="housingType"
          value={formData.housingType}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Select housing type</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="hasChildren"
              checked={formData.hasChildren}
              onChange={handleChange}
              className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span>Do you have children at home?</span>
          </label>
        </div>
        <div className="form-group">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="hasPets"
              checked={formData.hasPets}
              onChange={handleChange}
              className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span>Do you have other pets?</span>
          </label>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="experience" className="form-label">
          Previous Pet Experience
        </label>
        <textarea
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          rows={3}
          className="form-input"
          placeholder="Please describe your previous experience with pets, if any."
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="reason" className="form-label">
          Why do you want to adopt {pet.name}? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          rows={4}
          className={`form-input ${errors.reason ? 'border-red-500' : ''}`}
          placeholder={`Tell us why you're interested in adopting ${pet.name} and how you plan to care for them.`}
        />
        {errors.reason && (
          <p className="mt-1 text-sm text-red-500">{errors.reason}</p>
        )}
      </div>
      
      <div className="form-group">
        <label className="flex items-start">
          <input
            type="checkbox"
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            className={`mr-2 mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded ${
              errors.agreedToTerms ? 'border-red-500' : ''
            }`}
          />
          <span>
            I understand that submitting this application does not guarantee adoption and that additional steps may be required in the adoption process, including a home visit and reference checks.
          </span>
        </label>
        {errors.agreedToTerms && (
          <p className="mt-1 text-sm text-red-500">{errors.agreedToTerms}</p>
        )}
      </div>
      
      <div className="mt-6">
        <button
          type="submit"
          className="btn-primary w-full py-3"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
};

export default AdoptionForm;