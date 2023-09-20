import React, { useState, useEffect } from 'react';

function Doctors() {
  const [hospitals, setHospitals] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      findNearbyHospitals(userLocation.latitude, userLocation.longitude);
    }
  }, [userLocation]);

  const getUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting user location:', error);
          setLoading(false); 
        }
      );
    } else {
      console.error('Geolocation is not available in this browser.');
      setLoading(false); 
    }
  };

  const findNearbyHospitals = async (latitude, longitude) => {
    const API_KEY = 'AIzaSyCRgAdyEX-uXCg6-vevbgowW6OSaIHRdtM';
    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=veterinary_care&key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const results = data.results;
        console.log(results);
        setHospitals(results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); 
      });
  };


  return (
    <div p={4}>
      <h2 as="h2" size="xl" mb={4}>
        Nearby Hospitals
      </h2>
      {isLoading ? (
        <div align="center" justify="center" height="200px">
          {/* <CircularProgress isIndeterminate color="teal.500" /> */}
        </div>
      ) : (
        <>
          {userLocation && (
            <p>
              Current location successfully fetched!! {userLocation.latitude}, {userLocation.longitude}
            </p>
          )}
          <div flexWrap="wrap">
            {hospitals.map((hospital, index) => (
              <div
                key={index}
                p={4}
                m={2}
                width={{ base: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.33% - 16px)' }}
                borderWidth="1px"
                borderRadius="md"
                divShadow="md"
                bg="white"
              >
                <h2 as="h3" size="lg">
                  {hospital.name}
                </h2>
                <p>
                  Code: {hospital.plus_code?.compound_code}
                  <br />
                  Rating: {hospital.rating}
                  <br />
                  Reviews: {hospital.user_ratings_total}
                  <br />
                  Vicinity: {hospital.vicinity}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Doctors;


