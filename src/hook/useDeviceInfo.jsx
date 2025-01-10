// // import subscriptionManager from "@/services/subscriptionManager"
// import { createContext, useContext, useEffect, useState } from "react"
// import { clientSettings } from "@magicbell/react-headless"
// import { browserName, deviceType, osName, osVersion } from "react-device-detect"
// import { detectIncognito } from "detectincognitojs"
// import magicBell from "@/services/magicBell"


// const DeviceInfoContext = createContext(null)

// export function DeviceInfoProvider(props) {
//   const [info, setInfo] = useState(null)
//   useEffect(() => {
//     // initialize device info
//     setInfo({
//       standalone: window.matchMedia("(display-mode: standalone)").matches, // true if PWA is installed
//       browserName,
//       osName,
//       deviceType,
//       osVersion,
//       isPrivate: false,
//       // note that user may still not have granted notification permissions on a system settings level
//       notificationApiPermissionStatus:
//         typeof Notification !== "undefined"
//           ? Notification.permission
//           : "Notification API unsupported",
//       serviceWorkerStatus: "fetching",
//       subscriptionState: "pending",
//       topics: [],
//     })

//     return subscriptionManager.subscribeToActiveSubscriptionFromLocalStorage(
//       clientSettings.getState().userExternalId, // TODO: fix typing here
//       async (activeSubscription, context) => {
//         const { isPrivate } = await detectIncognito()
//         const topics = await magicBell.getTopics()
//         setInfo((info) =>
//           info
//             ? {
//                 ...info,
//                 isPrivate,
//                 serviceWorkerStatus:
//                   context.serviceWorkerRegistration?.active?.state ||
//                   "inactive",
//                 subscriptionState: Boolean(activeSubscription)
//                   ? "subscribed"
//                   : "unsubscribed",
//                 topics,
//               }
//             : null
//         )
//       }
//     )
//   }, [])

//   return (
//     <DeviceInfoContext.Provider value={info}>
//       {props.children}
//     </DeviceInfoContext.Provider>
//   )
// }

// export default function useDeviceInfo() {
//   return useContext(DeviceInfoContext)
// }
