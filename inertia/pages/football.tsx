import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import imgOne from '../assets/1.webp'
import imgTwo from '../assets/2.jpg'
import imgThree from '../assets/3.webp'
import imgFour from '../assets/4.jpg'
import { thousandSeparator } from '../../app/libs/utility.string';
import {DreamData} from '../../app/models/dream-data.entities'
import apiFetch from '../../app/libs/fetch';
const images = [
  imgTwo,
  imgOne,
  imgThree,
  imgFour,
];



export default function Dreamboard() {
  const [flight, setFlight] = useState<DreamData['flight'] | null>(null);
  const [hotel, setHotel] = useState<DreamData['hotel'] | null>(null);
  const [matchTicket, setMatchTicket] = useState<DreamData['matchTicket'] | null>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    apiFetch<DreamData['flight']>('/flight')
      .then(response => {
        setFlight(response)
      })
    apiFetch<DreamData['matchTicket']>('/match-ticket')
      .then(response => {
        setMatchTicket(response)
      })
    // setFlight(await apiFetch<DreamData['flight']>('/flight'))
  }, [])

  const dreamPrice = (flight?.price || 0) + (matchTicket?.priceRial || 0) + (hotel?.totalPrice || 0);

  // Auto slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 50000);
    
    return () => clearInterval(interval);
  }, []);

  // Card templates
  const flightCardFooter = (
    <div className="flex justify-end">
      <Button 
        label="Book Now" 
        severity='danger'
        icon="pi pi-external-link" 
        onClick={() => window.open(flight?.link, '_blank')}
        className="w-full"
      />
    </div>
  );

  return (

    <div className="h-screen w-full relative overflow-hidden bg-black">
      {/* Image Slider */}
      <div 
        className="w-full h-full transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Cards Container */}
      <div className="absolute inset-0 flex flex-wrap items-center justify-center">
      <div className="w-full text-center text-white text-6xl font-bold">
          A Sunny Day in Anfield
        </div>
        <div className="flex flex-col md:flex-row gap-6 p-6 max-w-6xl w-full">
          {/* Flight Card */}
          <Card 
            title="Flight Ticket" 
            subTitle={`${flight?.from} to ${flight?.to}`}
            footer={flightCardFooter}
            className="w-full md:w-1/3 bg-white bg-opacity-90 shadow-lg"
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="font-bold">Date:</span>
                <span>{flight?.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Agency:</span>
                <span>{flight?.agency}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Price:</span>
                <span>{thousandSeparator(flight?.price || 0)} IRR</span>
              </div>
            </div>
          </Card>
          
          {/* Football Match Card */}
          <Card 
            title="Football Match Ticket" 
            subTitle={matchTicket?.teams}
            className="w-full md:w-1/3 bg-white bg-opacity-90 shadow-lg"
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="font-bold">Venue:</span>
                <span>{matchTicket?.venue}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Date:</span>
                <span>{matchTicket?.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Price:</span>
                <span>€{thousandSeparator(matchTicket?.priceEuro || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Price in IRR:</span>
                <span>{thousandSeparator(matchTicket?.priceRial || 0)}IRR</span>
              </div>
            </div>
          </Card>
          
          {/* Hotel Card */}
          <Card 
            title="Hotel Accommodation" 
            subTitle={hotel?.name || 0}
            className="w-full md:w-1/3 bg-white bg-opacity-90 shadow-lg"
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="font-bold">Location:</span>
                <span>{hotel?.location || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Rating:</span>
                <span>{hotel?.rating}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Price per night:</span>
                <span>{thousandSeparator(hotel?.pricePerNight || 0)} IRR</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Nights:</span>
                <span>{hotel?.nights}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Total:</span>
                <span>{thousandSeparator((hotel?.pricePerNight || 0) * (hotel?.nights || 0))} IRR</span>
              </div>
            </div>
          </Card>
        </div>
        <div className="w-full text-center text-white text-3xl font-bold">
          {thousandSeparator(dreamPrice)} IRR
        </div>
      </div>
      
      {/* Slider indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <div 
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              index === currentImageIndex ? "bg-white scale-125" : "bg-gray-400"
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}