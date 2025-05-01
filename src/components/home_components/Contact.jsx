import React, { useState, useEffect } from 'react';
import useScrollAnimation from '../../useScrollAnimation';


const Contact = ({ divider }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [email, setEmail] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL;

  const [contactData, setContactData] = useState({
    title: '',
    subtitle: '',
    bgColor: '',
    textColor: '',
    divsBgColor: '',
    divsTextColor: '',
    card1: {
      icon: '',
      title: '',
      description: '',
    },
    card2: {
      icon: '',
      title: '',
      description: '',
    },
  });

  useEffect(() => {
    // Fetch email from API
    fetch(`${apiUrl}/contact/contact2`)
      .then((res) => res.json())
      .then((data) => setEmail(data.email));
  }, []);

  useEffect(() => {
    // Fetch contact data from API
    fetch(`${apiUrl}/home/contact`)
      .then((res) => res.json())
      .then((data) => {
        setContactData(data);
      });
  }, []);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!formData.name || !formData.email || !formData.message) {
        alert('Please fill in all the fields.');
        return;
    }

    // Check if the email address is valid using a more accurate regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Prepare the form data for submission
    const data = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
    };

    setLoading(true);  // Start loading

    fetch(`${apiUrl}/contact-messages/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Server error, please try again later.');
            }
            return response.json();
        })
        .then((data) => {
            // Check for error messages from the backend
            if (data.error) {
                alert(`Error: ${data.error}`);
            } else {
                alert('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' }); // Reset the form
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert(error.message || 'An error occurred while sending the message. Please try again.');
        })
        .finally(() => {
            setLoading(false);  // Stop loading
        });
};




  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="relative" style={{ backgroundColor: contactData.bgColor, color: contactData.textColor }}>
      {/* Divider */}
      
      {/* Contact Section */}
      <section className="w-full xl:py-24 lg:py-20 py-12">
        <div className="w-full max-w-7xl px-6 lg:px-8 mx-auto">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-16 xl:gap-x-24 gap-y-14 max-w-lg md:max-w-3xl lg:max-w-full mx-auto">
            <div>
              <h1 className="font-manrope md:text-5xl text-4xl font-bold leading-tight mb-8 lg:text-left text-center">{contactData.title}</h1>
              <p className="text-lg font-normal leading-7 lg:text-left text-center">{contactData.subtitle}</p>

              {/* Cards */}
              <div className="my-12 grid md:grid-cols-2 grid-cols-1 md:gap-x-8 gap-y-8">
                {/* Card 1 */}
                <div
                  className="rounded-2xl border border-gray-200 p-7 group transition-all duration-500"
                  style={{ backgroundColor: contactData.divsBgColor, color: contactData.divsTextColor }}
                >
                  <a href="javascript:;" className="w-14 h-14 rounded-full flex items-center justify-center mb-5 transition-all duration-500 group-hover:bg-white cursor-pointer" style={{ backgroundColor: contactData.divsTextColor }}>
                    <img   loading="lazy" src={contactData.card1.icon} className="w-14 h-14 rounded-[100%]" />
                  </a>
                  <h5 className="text-xl font-semibold leading-8 mb-3 transition-all duration-500 group-hover:text-white">{contactData.card1.title}</h5>
                  <p className="text-sm font-normal leading-5 transition-all duration-500 group-hover:text-white">{contactData.card1.description}</p>
                </div>
                {/* Card 2 */}
                <div
                  className="rounded-2xl border border-gray-200 p-7 group transition-all duration-500"
                  style={{ backgroundColor: contactData.divsBgColor, color: contactData.divsTextColor }}
                >
                  <a href="javascript:;" className="w-14 h-14 rounded-full flex items-center justify-center mb-5 transition-all duration-500 group-hover:bg-white cursor-pointer" style={{ backgroundColor: contactData.divsTextColor }}>
                    <img  loading="lazy" src={contactData.card2.icon} className="w-14 h-14 rounded-[100%]" />
                  </a>
                  <h5 className="text-xl font-semibold leading-8 mb-3 transition-all duration-500 group-hover:text-white">{contactData.card2.title}</h5>
                  <p className="text-sm font-normal leading-5 transition-all duration-500 group-hover:text-white">{contactData.card2.description}</p>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="h-fit bg-white border border-slate-200 rounded-2xl lg:p-12 p-8 w-full max-w-lg md:max-w-3xl lg:max-w-full mx-auto text-black" style={{ backgroundColor: contactData.divsBgColor, color: contactData.divsTextColor }}>
              <div className="relative mb-8">
                <label className="flex items-center mb-2 text-base leading-6 font-medium">Name</label>
                <div className="relative focus-within:">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full block h-12 pr-5 pl-12 py-2.5 text-lg leading-7 font-normal shadow-xs bg-transparent border border-gray-300 rounded-full focus:outline-none"
                    placeholder="Your Name"
                  />
                </div>
              </div>
              <div className="relative mb-8">
                <label className="flex items-center mb-2 text-base leading-6 font-medium">Email</label>
                <div className="relative focus-within:">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full block h-12 pr-5 pl-12 py-2.5 text-lg leading-7 font-normal shadow-xs bg-transparent border border-gray-300 rounded-full focus:outline-none"
                    placeholder="Enter Your Email"
                  />
                </div>
              </div>
              <div className="relative mb-8">
                <label className="flex items-center mb-2 text-base leading-6 font-medium">Message</label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="block w-full h-40 px-4 py-2.5 text-lg leading-7 font-normal shadow-xs bg-transparent border border-gray-300 rounded-2xl focus:outline-none resize-none"
                    placeholder="Write your message"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full h-12 rounded-full transition-all duration-700 shadow-sm text-white text-base font-semibold leading-6 flex items-center justify-center"
                style={{ backgroundColor: contactData.divsTextColor, color: contactData.divsBgColor }}
              >
                Send message
                
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
