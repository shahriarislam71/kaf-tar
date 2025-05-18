import React, { useState } from 'react';
import Home from '../../pages/Home';
import CarouselModal from './editor_modals/home_modals/CarouselModal';
import HeroModal from './editor_modals/home_modals/HeroModal';
import CardsModal from './editor_modals/home_modals/CardsModal';
import ServicesModal from './editor_modals/home_modals/ServicesModal';
import StatisticsModal from './editor_modals/home_modals/StatisticsModal';
import WhyUsModal from './editor_modals/home_modals/WhyUsModal';
import OurClientsModal from './editor_modals/home_modals/OurClientsModal';
import LocationModal from './editor_modals/home_modals/LocationModal';
import AssociatesModal from './editor_modals/home_modals/AssociatesModal';
import IndustriesModal from './editor_modals/home_modals/IndustriesModal';
import TimelineModal from './editor_modals/home_modals/TimelineModal';
import AboutPreviewModal from './editor_modals/home_modals/AboutPreviewModal';
import ContactModal from './editor_modals/home_modals/LocationModal';
import ComprehensiveServices from './editor_modals/servicesModal/ComprehensiveServices';
import ServiceModel from './editor_modals/servicesModal/ServiceModel';

const ServicesEditor = ({ getDivider, availableShapes }) => {
  const [isCarouselOpen, setCarouselOpen] = useState(false);
  const [isAboutPreview, setAboutPreview] = useState(false);
  const [isHeroOpen, setHeroOpen] = useState(false);
  const [isCardsOpen, setCardsOpen] = useState(false);
  const [isServicesOpen, setServicesOpen] = useState(false);
  const [isStatisticsOpen, setStatisticsOpen] = useState(false);
  const [isGridCardsOpen, setGridCardsOpen] = useState(false);
  const [isWhyUsOpen, setWhyUsOpen] = useState(false);
  const [isOurClientsOpen, setOurClientsOpen] = useState(false);
  const [isAssociatesOpen, setAssociatesOpen] = useState(false);
  const [isNewsOpen, setNewsOpen] = useState(false);
  const [isLocationOpen, setLocationOpen] = useState(false);

  return (
    <div className='flex gap-40 items-start justify-between p-20 w-[1300px]'>
      {/* Buttons Section */}
      <div className='grid grid-cols-2 gap-28 font-bold text-center'>
        <button className="btn btn-primary w-20 m-2" onClick={() => setHeroOpen(true)}>Our Services</button>
        <button className="btn btn-primary w-20 m-2" onClick={() => setLocationOpen(true)}>Service Model</button>
      </div>

      {/* Mockup Browser Section */}
      <div className="mockup-browser bg-white border-8 border-black p-2 h-[1000px] overflow-y-scroll">
        <div>
          <div className="mockup-browser-toolbar m-10">
            <div className="input">https://sample-website.com</div>
          </div>
          <div className='overflow-scroll'>
            <Home context={{ getDivider, availableShapes }} />
          </div>
        </div>
      </div>

      {/* Modal Components */}
      <ComprehensiveServices isOpen={isHeroOpen} onClose={() => setHeroOpen(false)} />
      <ServiceModel isOpen={isLocationOpen} onClose={() => setLocationOpen(false)} />
      
    </div>
  );
};

export default ServicesEditor;
