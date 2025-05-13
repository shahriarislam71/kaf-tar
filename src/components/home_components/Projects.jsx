import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const apiUrl = import.meta.env.VITE_API_URL;

const ProjectPreview = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${apiUrl}/projects/`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#f9f9f9] py-12 pt-32 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-[#040404] mb-4">
          Our <span className="text-[#7bbf42]">Projects</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#7bbf42] to-[#f9b414] mx-auto mb-6"></div>
        <p className="text-lg text-[#555] max-w-3xl mx-auto">
          Delivering excellence in facility management across diverse industries
        </p>
      </motion.div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7bbf42]"></div>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="h-48 bg-gradient-to-r from-[#70308c] to-[#7bbf42] relative">
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white text-center px-4">
                    {project.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#7bbf42] mr-2"></span>
                  <span className="text-sm font-medium text-[#555]">
                    {project.industry}
                  </span>
                </div>
                <h4 className="text-xl font-semibold text-[#040404] mb-3">
                  Project Scope
                </h4>
                <ul className="space-y-2 mb-5">
                  {project.scope.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-4 h-4 text-[#f9b414] mt-1 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <span className="text-[#555]">{item}</span>
                    </li>
                  ))}
                </ul>
                <h4 className="text-xl font-semibold text-[#040404] mb-3">
                  Key Outcomes
                </h4>
                <div className="bg-gradient-to-r from-[#f9b414]/10 to-[#7bbf42]/10 p-4 rounded-lg">
                  <ul className="space-y-2">
                    {project.outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-4 h-4 text-[#70308c] mt-1 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          ></path>
                        </svg>
                        <span className="text-[#555]">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Our Process Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-24 max-w-4xl mx-auto"
      >
        <h3 className="text-3xl font-bold text-center text-[#040404] mb-8">
          Our <span className="text-[#7bbf42]">Process</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Open-Book Offers',
              desc: 'Transparent analysis of client needs with full costing breakdown',
              color: 'from-[#7bbf42] to-[#7bbf42]/80',
            },
            {
              title: 'Project Kickoff',
              desc: 'Dedicated manager assigned with SLA/KPI tracking',
              color: 'from-[#f9b414] to-[#f9b414]/80',
            },
            {
              title: 'Performance Tracking',
              desc: 'Regular reporting and continuous improvement',
              color: 'from-[#70308c] to-[#70308c]/80',
            },
          ].map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border-t-4 border-[#7bbf42]"
            >
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xl mb-4`}
              >
                {index + 1}
              </div>
              <h4 className="text-xl font-semibold text-[#040404] mb-2">
                {step.title}
              </h4>
              <p className="text-[#555]">{step.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectPreview;