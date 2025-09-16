export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
}

export const createNotification = (title: string, message: string, type: Notification['type'] = 'info'): Notification => ({
  id: Math.random().toString(36).substr(2, 9),
  title,
  message,
  type,
  timestamp: new Date(),
});

export const showNotification = (notification: Notification) => {
  // Implementation for showing notification (e.g., toast, alert)
  console.log(`[${notification.type.toUpperCase()}] ${notification.title}: ${notification.message}`);
};

export const dismissNotification = (id: string) => {
  // Implementation for dismissing notification
  console.log(`Notification ${id} dismissed`);
};