// ServiceDetail.js
import React,{useState} from 'react';
import { useParams } from 'react-router-dom';
// import { servicesData } from '../../servicesData'; // Adjust the path as necessary

const ServiceDetail = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [servicesData,setServicesData] = useState([])

  useEffect(()=>{
    fetch(`${apiUrl}/services/`)
    .then(res=>res.json())
    .then(data=>{
      setServicesData(data)
    })
  },[])

  const { serviceId } = useParams();
  const service = servicesData.find(service => service.id === serviceId);

  // Return a not found message if the service doesn't exist
  if (!service) {
    return <div className="text-center text-gray-600 mt-10">Service not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto my-10 p-5 bg-white rounded-lg shadow-lg">
      {/* Header with Service Title and Tagline */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{service.title}</h1>
        <p className="text-lg text-gray-500">Excellence in every detail.</p>
      </div>

      
      {/* Service Description */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Overview</h2>
        <p className="text-gray-600 leading-relaxed">{service.description}</p>
      </div>

      {/* Features and Benefits Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Features */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Features</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>High-quality materials and craftsmanship</li>
            <li>Customizable options tailored to your needs</li>
            <li>24/7 support and customer service</li>
            <li>Affordable pricing with no hidden fees</li>
          </ul>
        </div>

        {/* Benefits */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Benefits</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Increased efficiency and productivity</li>
            <li>Peace of mind with reliable service</li>
            <li>Cost-effective solutions</li>
            <li>Improved user experience</li>
          </ul>
        </div>
      </div>

      {/* Pricing and CTA */}
      <div className="mt-10 bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-5 rounded-lg shadow-lg text-center">
        <h3 className="text-2xl font-semibold mb-3">Pricing</h3>
        <p className="text-lg mb-4">Starting from just $99</p>
        <button className="px-6 py-3 font-semibold bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-200">
          Get Started
        </button>
      </div>

      {/* Customer Reviews */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Customer Reviews</h3>
        <div className="space-y-5">
          {/* Review 1 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="font-semibold text-gray-700">John Doe</p>
            <p className="text-gray-600 mt-1">
              “This service has transformed the way I work. Reliable and professional!”
            </p>
            <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
          </div>
          {/* Review 2 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="font-semibold text-gray-700">Jane Smith</p>
            <p className="text-gray-600 mt-1">
              “Exceptional quality and great customer support. Highly recommended!”
            </p>
            <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
