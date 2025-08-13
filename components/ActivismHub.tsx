import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Megaphone, 
  Calendar, 
  Shield, 
  Heart,
  TrendingUp,
  MapPin
} from 'lucide-react';

interface ActivismHubProps {
  readonly theme: string;
}

const ActivismHub: React.FC<ActivismHubProps> = ({ theme }) => {
  const cardClass = theme === 'dark' 
    ? 'bg-gray-800/60 border-gray-700/50 backdrop-blur-sm' 
    : 'bg-white/70 border-sage-200/50 backdrop-blur-sm';

  const quickActions = [
    {
      id: 'create-campaign',
      title: 'Start a Campaign',
      description: 'Launch a new advocacy initiative.',
      icon: Megaphone,
      action: () => console.log('Start campaign')
    },
    {
      id: 'join-cause',
      title: 'Discover Causes',
      description: 'Find and join causes you care about.',
      icon: Heart,
      action: () => console.log('Join cause')
    },
    {
      id: 'organize-event',
      title: 'Organize an Event',
      description: 'Plan rallies, meetings, or actions.',
      icon: Calendar,
      action: () => console.log('Organize event')
    },
    {
      id: 'safe-chat',
      title: 'Community Chat',
      description: 'Join encrypted group discussions.',
      icon: Shield,
      action: () => console.log('Safe chat')
    }
  ];

  const myCauses = [
    {
      id: 1,
      title: 'Climate Action',
      description: 'Fighting for environmental justice',
      members: 1250,
      recentActivity: '3 new actions this week',
      progress: 75
    },
    {
      id: 2,
      title: 'Neurodiversity Rights',
      description: 'Advocating for neurodivergent inclusion',
      members: 892,
      recentActivity: 'Meeting tomorrow at 7 PM',
      progress: 60
    },
    {
      id: 3,
      title: 'Digital Privacy',
      description: 'Protecting online rights and data',
      members: 567,
      recentActivity: 'New legislation to review',
      progress: 40
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Climate Rally Downtown',
      date: 'Aug 15, 2025',
      time: '2:00 PM',
      location: 'City Hall',
      attendees: 234
    },
    {
      id: 2,
      title: 'Accessibility Workshop',
      date: 'Aug 20, 2025',
      time: '6:00 PM',
      location: 'Community Center',
      attendees: 45
    }
  ];

  return (
    <div className={`min-h-screen p-6 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-sage-50 text-sage-900'
    }`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-sage-500 to-blue-500 bg-clip-text text-transparent">
          Activism Hub
        </h1>
        <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-sage-700'}`}>
          Your space for safe, accessible activism and community organizing.
        </p>
      </motion.div>

      {/* Quick Actions Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <motion.button
              key={action.id}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.97 }}
              onClick={action.action}
              className={`p-6 rounded-2xl text-left shadow-lg hover:shadow-xl transition-all duration-300 group ${cardClass}`}
            >
              <action.icon className="w-10 h-10 mb-4 text-sage-500 group-hover:text-blue-500 transition-colors" />
              <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-sage-600'}`}>{action.description}</p>
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* My Causes */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-semibold mb-4">My Causes</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {myCauses.map((cause) => (
            <motion.div
              key={cause.id}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-2xl shadow-lg ${cardClass}`}
            >
              <h3 className="font-semibold text-xl mb-2">{cause.title}</h3>
              <p className={`mb-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-sage-600'}`}>
                {cause.description}
              </p>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium">Progress</span>
                  <span className="text-xs font-bold">{cause.progress}%</span>
                </div>
                <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-sage-100'}`}>
                  <motion.div
                    className="h-2 bg-gradient-to-r from-sage-500 to-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${cause.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{cause.members} members</span>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                  {cause.recentActivity}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Upcoming Events */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ x: 5 }}
              className={`p-4 rounded-xl border-l-4 border-blue-500 shadow-md ${cardClass}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-sage-600 mb-2">{event.attendees} attending</div>
                  <button className="px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors text-sm font-semibold">
                    Join Event
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Impact Stats */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Your Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-2xl text-center shadow-lg ${cardClass}`}>
            <TrendingUp className="w-8 h-8 mx-auto mb-3 text-green-500" />
            <div className="text-3xl font-bold text-green-500">12</div>
            <div className="text-sm">Campaigns Supported</div>
          </div>
          <div className={`p-6 rounded-2xl text-center shadow-lg ${cardClass}`}>
            <Users className="w-8 h-8 mx-auto mb-3 text-blue-500" />
            <div className="text-3xl font-bold text-blue-500">847</div>
            <div className="text-sm">People Reached</div>
          </div>
          <div className={`p-6 rounded-2xl text-center shadow-lg ${cardClass}`}>
            <Heart className="w-8 h-8 mx-auto mb-3 text-pink-500" />
            <div className="text-3xl font-bold text-pink-500">6</div>
            <div className="text-sm">Events Organized</div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ActivismHub;
