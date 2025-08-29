import React from 'react';
import DopamineGarden from '../components/gamification/DopamineGarden';

const DopamineGardenPage: React.FC = () => {
  return (
    <div>
      <DopamineGarden 
        onPlantUpdate={(plant) => {
          console.log('Plant updated:', plant);
        }}
        theme="light"
      />
    </div>
  );
};

export default DopamineGardenPage;
