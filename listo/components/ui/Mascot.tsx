import React from "react";

export default function Mascot() {
  return (
    <video
      src="/assets/Cat mascot.webm" // Change to your preferred mascot
      autoPlay
      loop
      muted
      playsInline
      style={{ width: 200, height: 200 }}
    />
  );
}