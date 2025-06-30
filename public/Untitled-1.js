import { useEffect, useState } from "react";

function useMascotData() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/mascot.json")
      .then(res => res.json())
      .then(setData);
  }, []);
  return data;
}

// In your component:
const mascotData = useMascotData();
if (!mascotData) return null; // or loading spinner
// ...use mascotData...
<img src="/spotify.png" alt="Spotify icon" />