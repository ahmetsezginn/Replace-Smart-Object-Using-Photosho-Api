require('dotenv').config();
const { Dropbox } = require('dropbox');
//For Adobe
const CLIENT_ID=process.env.CLIENT_ID;
const CLIENT_SECRET=process.env.CLIENT_SECRET;
//For Dropbox
const DROPBOX_ACCESS_TOKEN=process.env.DROPBOX_ACCESS_TOKEN;

const dbx= new Dropbox({accessToken:DROPBOX_ACCESS_TOKEN});
//usse delay for long operation
async function delay(x){
  return new Promise((resolve) => {
    setTimeout(()=>{
      resolve();
    },x);
  });
}

//Try to get acces from photoshop api

async function getAccesToken(clientId, clientSecret){
  const params = new URLSearchParams();
  params.append("client_secret", clientSecret);
  params.append("grant_type", "client_credentials");
  params.append("scope", "openid,AdobeID,read_organizations");

  let resp = await fetch(`https://ims-na1.adobelogin.com/ims/token/v2?client_id=${clientId}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'  // Your Funcion Type 
    },
    body: params
  });
 
  let data = await resp.json();
  return data.access_token; // Create Access Token
}
console.log("satır 33 hatasız");
(async()=>{
  let access_token = await getAccesToken(CLIENT_ID,CLIENT_SECRET);
  console.log("Got Acces Token Succesfuly");
  let linkRequest = await dbx.filesGetTemporaryLink({path:"/2.psd"});
  let inputURL = linkRequest.result.link;
  linkRequest = await dbx.filesGetTemporaryLink({path:"/source.jpg"});
  let inputURL_jsx = linkRequest.result.link;
  linkRequest= await dbx.filesGetTemporaryUploadLink({commit_info:{path:"/source_modified1.psd",mode:"overwrite"}});
  let outputURL= linkRequest.result.link;
  console.log("Got Dropbox link to read and write");
  
// this option part will be change for each type
  let data = {
    "inputs": [{
      "href":inputURL,
      "storage": "dropbox"
    }],
    "options": { 
      "layers": [{
        "name": "5x7 Double click to edit copy",
        "id": 20,
        "input": {
          "storage": "dropbox",
          "href": inputURL_jsx
          },
    }]
      },
    "outputs":[{
      "storage":"dropbox",
      "type":"image/vnd.adobe.photoshop",
      "href":outputURL
    }]
  }
  let resp = await fetch("https://image.adobe.io/pie/psdService/smartObject",//this post created for smart object. if you want to use different operation change this link.
  {
    method:"POST",
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'x-api-key': CLIENT_ID,
      "Content-Type":"application/json"
    },
    body: JSON.stringify(data)
  });
  let result = await resp.json();
  console.log("satır 70 hatasız");
  let status = "running";
  let jobResult;

  while (status === "running" || status === "pending" || status === "starting"){
    console.log("\n Delaying while checking job.");
    await delay(2000);
    let jobReq =await fetch(result['_links']['self']['href'],{
      headers:{
        'Authorization': `Bearer ${access_token}`,
        'x-api-key': CLIENT_ID,
        "Content-Type":"application/json"
      }
    });
    jobResult=await jobReq.json();
    status = jobResult.outputs[0]["status"];

  }
  console.log("\n Final result:\n",JSON.stringify(jobResult.outputs,null,"\t"));

})();


