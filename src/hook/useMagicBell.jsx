import { useState, useEffect } from 'react';
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

  useEffect(() => {
    setSubscribed(client.isSubscribed());
    return () => {
    }
  }, [client.isSubscribed()])

  return { subscribed };
};