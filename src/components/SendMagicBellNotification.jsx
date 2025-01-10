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
import { isSupported } from "@magicbell/webpush";

const SendMagicBellNotification = () => {
  const [message, setMessage] = useState("");

  const sendNotificationMagicBell = async () => {
    try {
      const response = await axios.post(
        "https://api.magicbell.com/broadcasts",
        {
          broadcast: {
            title: "Testing Notification",
            content: message, //`<p>${message}</p>`,
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
      if (response?.data) {
        console.log("Notification sent successfully");
        setMessage("");
      }
      console.log("Response:", response.data);
      // new Notification("Testing Notification", {
      //   body: message,
      //   icon: "/images/pwa/192.png", //"/images/pwa/192.png",
      // });
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };
  return (
    <>
      {isSupported() ? (
        <Row>
          <Col md={12}>
            <Card>
              <CardBody>
                <CardTitle>Send MagicBell Notification</CardTitle>
                <Form>
                  <FormGroup>
                    <Label for="message">Message</Label>
                    <Input
                      type="textarea"
                      name="message"
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </FormGroup>
                  <Button onClick={sendNotificationMagicBell} color="primary" >
                    Send Notification
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : (
        <></>
      )}
    </>
  );
};

export default SendMagicBellNotification;
