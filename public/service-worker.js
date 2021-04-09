const cacheName="Cache_WIP";
const appFiles=[
  "offline.html",
  "offline.css",
  "offline.jpg",
  "manifest.json",
  "scripts.js"
];

self.addEventListener("install",(installing)=>{
    console.log("Service Worker: I am being installed, hello world!");
  
    installing.waitUntil(
    caches.open(cacheName).then((cache)=>{
      console.log("Service Worker: Caching important offline files");
      return cache.addAll(appFiles);
    })
  );
  });
  
  self.addEventListener("activate",(activating)=>{    
    console.log("Service Worker: All systems online, ready to go!");
  });
  
  self.addEventListener("fetch",(fetching)=>{   
    console.log("Service Worker: User threw a ball, I need to fetch it!");
    fetching.respondWith(
      caches.match(fetching.request.url).then((response)=>{
        console.log("Service Worker: Fetching resource "+fetching.request.url);
        return response||fetch(fetching.request).then((response)=>{
          console.log("Service Worker: Resource "+fetching.request.url+" not available in cache");
          return caches.open(fetching).then((cache)=>{
              console.log("Service Worker: Caching (new) resource "+fetching.request.url);
              //cache.put(fetching.request,response.clone());
            return response;
          });
        }).catch(function(){      
          console.log(fetching.request.mode);
          //Do something else with the request (respond with a different cached file)
          if(fetching.request.mode == "navigate"){
            return caches.match("offline.html")
          }
        })
      })
    );
  });
  
//   self.addEventListener("push",(pushing)=>{
//       console.log("Service Worker: I received some push data, but because I am still very simple I don't know what to do with it :(");
//       if(pushing.data){
//         pushdata=JSON.parse(pushing.data.text());		
//         console.log("Service Worker: I received this:",pushdata);
//         if((pushdata["title"]!="")&&(pushdata["message"]!="")){			
//           const options={ body:pushdata["message"], image: "images/notconnected.png", icon:"icon.png" }
//           self.registration.showNotification(pushdata["title"],options);
//           console.log("Service Worker: I made a notification for the user");
//         } else {
//           console.log("Service Worker: I didn't make a notification for the user, not all the info was there :(");			
//         }
//       }
//   })

// self.addEventListener("notificationclick",function(clicking){
//   const pageToOpen="/";
//   const promiseChain=clients.openWindow(pageToOpen);
//   event.waitUntil(promiseChain);
// });
