//____ ____ ____ _ ____ ___ ____ ____    ____ ____ ____ _  _ _ ____ ____    _ _ _ ____ ____ _  _ ____ ____ 
//|__/ |___ | __ | [__   |  |___ |__/    [__  |___ |__/ |  | | |    |___    | | | |  | |__/ |_/  |___ |__/ 
//|  \ |___ |__] | ___]  |  |___ |  \    ___] |___ |  \  \/  | |___ |___    |_|_| |__| |  \ | \_ |___ |  \ 
//                                                                                                         

//See if the browser supports Service Workers, if so try to register one
if("serviceWorker" in navigator){
    navigator.serviceWorker.register("service-worker.js").then(function(registering){
      // Registration was successful
      console.log("Browser: Service Worker registration is successful with the scope",registering.scope);
    }).catch(function(error){
      //The registration of the service worker failed
      console.log("Browser: Service Worker registration failed with the error",error);
    });
  }else { 
    //The registration of the service worker failed
    console.log("Browser: I don't support Service Workers :(");
  }
  
  //_  _ ____ ___ _ ____ _ ____ ____ ___ _ ____ _  _ ____ 
  //|\ | |  |  |  | |___ | |    |__|  |  | |  | |\ | [__  
  //| \| |__|  |  | |    | |___ |  |  |  | |__| | \| ___] 
  //                                                      
  
  //Asking for permission with the Notification API
//   if(typeof Notification!==typeof undefined){ //First check if the API is available in the browser
//       Notification.requestPermission().then(function(result){ 
//           //If accepted, then save subscriberinfo in database
//           if(result==="granted"){
//               console.log("Browser: User accepted receiving notifications, save as subscriber data!");
//               navigator.serviceWorker.ready.then(function(serviceworker){ //When the Service Worker is ready, generate the subscription with our Serice Worker's pushManager and save it to our list
//                   const VAPIDPublicKey="BGSsvX9EwjMVkdd0yi2qBmzub-QYNpkUeKBcOjgjWji9ma_Op_M33xE1whbQ4MR5hniT40rLEG-yQ8PBNv_Mgeo"; // Fill in your VAPID publicKey here
//                   const options={applicationServerKey:VAPIDPublicKey,userVisibleOnly:true} //Option userVisibleOnly is neccesary for Chrome
//                   serviceworker.pushManager.subscribe(options).then((subscription)=>{
//             //POST the generated subscription to our saving script (this needs to happen server-side, (client-side) JavaScript can't write files or databases)
//                       let subscriberFormData=new FormData();
//                       subscriberFormData.append("json",JSON.stringify(subscription));
//                       fetch("data/saveSubscription.php",{method:"POST",body:subscriberFormData});
//                   });
//               });
//           }
//       }).catch((error)=>{
//           console.log(error);
//       });
//   }
   