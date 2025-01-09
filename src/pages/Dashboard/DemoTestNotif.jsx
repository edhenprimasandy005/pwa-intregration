import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import axios from "axios";
import { isSupported } from '@magicbell/webpush';
import { useMagicBell } from '../../hook/useMagicBell';

const DemoTestNotif = () => {
  const [message, setMessage] = useState("");
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const { subscribed, handleSubscribe } = useMagicBell();

  // const isPWAInstalled = () => {
  //   // Check for iOS standalone mode
  //   if (window.navigator.standalone) {
  //     return true; // PWA is installed on iOS
  //   }

  //   // Check for Android and desktop standalone mode
  //   if (window.matchMedia("(display-mode: standalone)").matches) {
  //     return true; // PWA is installed on Android or desktop
  //   }

  //   // Fallback: Check if the appinstalled event has been fired
  //   const pwaInstalledFlag = localStorage.getItem("pwaInstalled");
  //   if (pwaInstalledFlag === "true") {
  //     return true; // PWA is installed based on custom tracking
  //   }

  //   return false; // PWA is not installed
  // };

  const handleSwitchChange = async (isChecked) => {
    if (isChecked) {
      // Request notification permission
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setIsNotificationEnabled(true);
        handleSubscribe()
      } else {
        alert(
          "You need to grant notification permission to enable notifications."
        );
        setIsNotificationEnabled(false);
      }
    } else {
      // Disable notifications
      setIsNotificationEnabled(false);
    }
  };
  function isPushSupported() {
    //checks if user has granted permission to Push notifications
    if (Notification.permission === 'denied') {
      alert('User has blocked push notification.');
      return;
    }

    //Checks if current browser supports Push notification
    if (!('PushManager' in window)) {
      alert('Sorry, Push notification isn\'t supported in your browser.');
      return;
    }

    //Get `push notification` subscription id

    //If `serviceWorker` is registered and ready
    navigator.serviceWorker.ready
      .then(function (registration) {
        registration.pushManager.getSubscription()
        .catch(function (error) {
          console.error('Error occurred while enabling push ', error);
        });
      });
  }
  useEffect(() => {
    isPushSupported()
    console.log('magic bell push notif', isSupported())
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        setIsNotificationEnabled(true);
        handleSubscribe()
      }

      const checkPermission = async () => {
        if (Notification.permission !== "granted") {
          await Notification.requestPermission();
        }
      };

      checkPermission();
    }
  }, []);

  const sendNotificationMagicBell = async () => {
    try {
      const response = await axios.post(
        "https://api.magicbell.com/broadcasts",
        {
          broadcast: {
            title: "Testing Notification",
            content: `<p>${message}</p>`,
            category: "comments",
            topic: "Comments",
            recipients: [
              { email: "pwa.example.magicbell@gmail.com" },
              {
                external_id: "83d987a-83fd034",
                first_name: "Person",
                last_name: "Doe",
                custom_attributes: {
                  plan: "enterprise",
                  pricing_version: "v10",
                  preferred_pronoun: "They",
                },
                phone_numbers: ["+1 5005550001"],
              },
            ],
            overrides: {
              channels: {
                email: {
                  title: "[MagicBell] Testing Notification",
                  content: message,
                },
              },
            },
          },
        },
        {
          headers: {
            "X-MAGICBELL-API-KEY": import.meta.env.VITE_MAGICBELL_API_KEY,
            "X-MAGICBELL-API-SECRET": import.meta.env.VITE_MAGICBELL_API_SECRET,
          },
        }
      );

      console.log("Response:", response.data);
      new Notification("Testing Notification", {
        body: message,
        icon: "/images/pwa/192.png", //"/images/pwa/192.png",
      });
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const sendNotification = () => {
    if (Notification.permission === "granted") {
      sendNotificationMagicBell();
    } else {
      alert("Please enable notifications to see the demo.");
    }
    // if (isPWAInstalled) {
    //   if ("serviceWorker" in navigator && "PushManager" in window) {
    //     navigator.serviceWorker.ready.then(function (registration) {
    //       registration.showNotification("Custom Notification", {
    //         body: message,
    //         icon: "/images/pwa/192.png",
    //       });
    //     });
    //   } else {
    //     alert(
    //       "Service Worker or Push Manager is not supported in this browser."
    //     );
    //   }
    // } else if ("Notification" in window && navigator.serviceWorker) {
    //   if (Notification.permission === "granted") {
    //     new Notification("Demo Notification", {
    //       body: message,
    //       icon: "/images/pwa/192.png", //"/images/pwa/192.png",
    //     });
    //   } else {
    //     alert("Please enable notifications to see the demo.");
    //   }
    // }
  };
  return (
    <Card className="overflow-hidden">
      <CardBody>
        <CardTitle className="mb-4">Test Push Notification</CardTitle>
        <Row>
          <Col sm="12">
            <Form>
              <FormGroup switch className="mb-2">
                <Input
                  type="switch"
                  checked={isNotificationEnabled}
                  onChange={() => {
                    handleSwitchChange(!isNotificationEnabled);
                  }}
                />
                <Label check>Enable Notifications</Label>
              </FormGroup>
              <FormGroup>
                <Label>Message</Label>
                <Input
                  value={message}
                  id="message"
                  name="message"
                  type="textarea"
                  placeholder="Type message here..."
                  onChange={(e) => setMessage(e.target.value)}
                />
              </FormGroup>
            </Form>
          </Col>
          <Col>
            <div className="d-flex justify-content-end">
              <Button
                type="button"
                color="primary"
                className="btn-rounded  mb-2 me-2"
                onClick={sendNotification}
              >
                <i className="mdi mdi-send me-1" />
                Send
              </Button>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default DemoTestNotif;
