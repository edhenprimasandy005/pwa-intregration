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

const DemoTestNotif = () => {
  const [message, setMessage] = useState("");
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  useEffect(() => {
    // Check the current permission status when the component mounts
    if (Notification.permission === "granted") {
      setIsNotificationEnabled(true);
    }
  }, []);

  const handleSwitchChange = async (isChecked) => {
    if (isChecked) {
      // Request notification permission
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setIsNotificationEnabled(true);
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

  useEffect(() => {
    const checkPermission = async () => {
      if (Notification.permission !== "granted") {
        await Notification.requestPermission();
      }
    };

    checkPermission();
  }, []);

  const sendNotification = () => {
    if (Notification.permission === "granted") {
      console.log('send', Notification.permission, message)
      new Notification("Demo Notification", {
        body: message,
        icon: "/images/pwa/192.png", //"/images/pwa/192.png",
      });
      // if ('serviceWorker' in navigator && 'PushManager' in window) {
      //   navigator.serviceWorker.ready.then(function(registration) {
      //     registration.showNotification('Custom Notification', {
      //       body: message,
      //       icon: '/images/pwa/192.png'
      //     });
      //   });
      // } else {
      //   alert('Service Worker or Push Manager is not supported in this browser.');
      // }
    } else {
      alert("Please enable notifications to see the demo.");
    }
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
