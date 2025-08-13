import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function TestPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#1e293b',
      color: 'white',
      fontSize: '2rem',
      fontFamily: 'system-ui'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>🎯 LISTO Test Page</h1>
        <p>If you can see this, routing is working!</p>
        <Button 
          onClick={() => window.location.href = '/medical-hub'}
          variant="default"
          className="mt-5 text-lg px-6 py-3"
          rightIcon={<ArrowRight className="w-5 h-5" />}
        >
          Go to Medical Hub
        </Button>
      </div>
    </div>
  );
}
