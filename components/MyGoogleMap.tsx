import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { motion, AnimatePresence } from "framer-motion";

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "1.5rem",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
};

const defaultCenter = {
  lat: 40.7128, // Fallback: New York City
  lng: -74.006,
};

// A sleek, dark map style from Snazzy Maps
const mapStyles = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    }
];


const MyGoogleMap: React.FC<{ onSaveLocation?: (location: { lat: number; lng: number }) => void }> = ({ onSaveLocation }) => {
  const [center, setCenter] = useState(defaultCenter);
  const [marker, setMarker] = useState(defaultCenter);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMapReady, setIsMapReady] = useState(false);
  const [saved, setSaved] = useState(false);

  // Get user's location on initial load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(userLocation);
          setMarker(userLocation);
          setIsLoading(false);
        },
        () => {
          // Handle error or user denial
          console.log("User denied geolocation.");
          setIsLoading(false); // Stop loading even if denied
        }
      );
    } else {
        setIsLoading(false); // Geolocation not supported
    }
  }, []);

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry?.location) {
        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setCenter(newLocation);
        setMarker(newLocation);
      }
    }
  };

  const handleSaveLocation = () => {
    if (onSaveLocation) {
        onSaveLocation(marker);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCIg6o_gE-IN0B8GbUA1l5fnEH2FgT829w"
      libraries={["places"]}
      onLoad={() => setIsMapReady(true)}
    >
      <div className="relative bg-black/20 p-2 rounded-[2rem] backdrop-blur-sm">
        <AnimatePresence>
            {(isLoading || !isMapReady) && (
                 <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 rounded-[1.5rem]"
                >
                    <div className="w-16 h-16 border-4 border-t-transparent border-blue-400 rounded-full animate-spin" />
                    <p className="mt-4 text-white font-semibold">Loading Map...</p>
                </motion.div>
            )}
        </AnimatePresence>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: (isLoading || !isMapReady) ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-md px-4">
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <input
                  type="text"
                  placeholder="Search for a futuristic location..."
                  className="w-full p-3 rounded-full shadow-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none"
                />
              </Autocomplete>
            </div>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={12}
              options={{ styles: mapStyles, disableDefaultUI: true }}
            >
              <Marker position={marker} icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  strokeColor: '#00ffff',
                  strokeWeight: 2,
                  fillColor: '#00ffff',
                  fillOpacity: 0.5,
              }} />
            </GoogleMap>
            <motion.button
              onClick={handleSaveLocation}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold shadow-lg border-2 border-cyan-300/50"
            >
              {saved ? "Saved! ✨" : "Save to Board"}
            </motion.button>
        </motion.div>
      </div>
    </LoadScript>
  );
};

export default MyGoogleMap;
