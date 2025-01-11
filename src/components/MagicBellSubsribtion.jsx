import React, { useState, useEffect, useMemo } from "react";
import { WebPushClient, registerServiceWorker } from "@magicbell/webpush";
import {useConfig} from '@magicbell/react-headless'
import { Modal, ModalBody, ModalHeader, Button } from "reactstrap";

const userCredentials = {
  apiKey: import.meta.env.VITE_MAGICBELL_API_KEY,
  userEmail: "pwa.example.magicbell@gmail.com",
};

const MagicBellSubscription = () => {
  const [subscribemodal, setSubscribemodal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const config = useConfig()
  const subscribeOptions = useMemo(() => {
    const host = "https://api.magicbell.com"
    try {
      const url = new URL(config.channels?.webPush.config.subscribeUrl || "")
      return {
        token: url.searchParams.get("access_token") || "",
        project: url.searchParams.get("project") || "",
        host,
      }
    } catch (e) {
      return { token: "", project: "", host }
    }
  }, [config])

  useEffect(() => {
    if (!subscribeOptions.token) {
      return
    }
    registerServiceWorker()
    // prefetchConfig(subscribeOptions)
  }, [subscribeOptions])

  const client = new WebPushClient({
    apiKey: userCredentials.apiKey,
    userEmail: userCredentials.userEmail,
  });

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const isSubscribed = await client.isSubscribed();
        console.log("magic bell push notif", isSubscribed);

        if (!isSubscribed) {
          setSubscribemodal(true);
        }
      } catch (err) {
        console.error("Error checking subscription:", err);
      }
    };

    checkSubscription();
  }, [client.isSubscribed]);

  // useEffect(() => {
  //   client.getAuthToken().then((token) => {
  //     console.log("auth token", token);
  //     registerServiceWorker('./sw.js');
  //   });
  // }, [client.isSubscribed()]);
  const handleSubscribe = async () => {
    setLoading(true);
    setError(null);

    try {
      if (Notification.permission === "default") {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
          // Now proceed to subscribe to MagicBell notifications
          await client.subscribe();
          console.log('auth token', client.getAuthToken())
          console.log('Successfully subscribed to MagicBell notifications');
          setLoading(false);
          setSubscribemodal(false); // Close modal after permission is granted

        } else {
          console.error('Notification permission denied');
        }
      } else if (Notification.permission === "granted") {
        // If permission already granted, directly subscribe
        await client.subscribe();
        console.log('Successfully subscribed to MagicBell notifications');
        setLoading(false);
        setSubscribemodal(false);
      }
    } catch (error) {
      console.error('Subscription error:', error.message);
    }
  };

  return (
    <Modal
      isOpen={subscribemodal}
      centered
      toggle={() => setSubscribemodal(!subscribemodal)}
    >
      <ModalHeader
        toggle={() => setSubscribemodal(!subscribemodal)}
        className="border-bottom-0"
      ></ModalHeader>
      <ModalBody className="text-center">
        <div className="avatar-md mx-auto mb-4">
          <div className="avatar-title bg-light rounded-circle text-primary h1">
            <i className="mdi mdi-bell"></i>
          </div>
        </div>

        <h4 className="text-primary">MagicBell Subscription</h4>
        <p className="text-muted font-size-14 mb-4">
          Once you subscribe, we will send you one automatic test notification.
          You can unsubscribe at any time.
        </p>

        {error && <p className="text-danger">{error}</p>}

        <div className="text-center mt-4">
          <Button color="primary" onClick={handleSubscribe} disabled={loading}>
            {loading ? "Subscribing..." : "Subscribe"}{" "}
            <i className="mdi mdi-arrow-right ms-1" />
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default MagicBellSubscription;
