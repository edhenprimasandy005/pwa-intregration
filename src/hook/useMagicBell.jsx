import { useState } from 'react';
import { WebPushClient } from '@magicbell/webpush';

const userCredentials = {
  apiKey: import.meta.env.VITE_MAGICBELL_API_KEY,
  userEmail: 'pwa.example.magicbell@gmail.com',
};

export const useMagicBell = () => {
  const [subscribed, setSubscribed] = useState(false);
  const client = new WebPushClient({
    apiKey: userCredentials.apiKey,
    userEmail: userCredentials.userEmail,
  });
  const handleSubscribe = async () => {
    if (client.isSubscribed) {
      client.unsubscribe()
      setSubscribed(false);
    } else {
      client.subscribe()
      alert('Subscribed to push notifications!');
      setSubscribed(true);
    }
  };

  return { subscribed, handleSubscribe };
};