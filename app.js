import express, { response } from "express";
import bodyParser from "body-parser";
import axios from "axios";
import requestIp from "request-ip";

const app = express();
const port = process.env.PORT||3000;
const API_URL = "http://api.weatherapi.com/v1/forecast.json";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestIp.mw());
app.use(express.static("public"));
//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "titche";

const yourPassword = "bunjaku90";
const yourAPIKey = "a8789d617457406f8dc101750240406";
const yourBearerToken = "966ec5ef-4571-43dd-8aee-3d4d14446586";
let data=false;
app.get("/", async (req, res) => {
  const ip = req.clientIp;
    
  try {
    const response = await axios.get(API_URL,{
      auth:{
        username:yourUsername,
        password:yourPassword,
      },
      params:{
        key:yourAPIKey,
        q:'Halmstad',
        lang:"sv",
      }
    });
    const result = JSON.stringify(response.data);
  res.render("index.ejs", {image:response.data.current.condition.icon,condition:response.data.current.condition.text,country:response.data.location.name+", "+response.data.location.region,feelslike:response.data.current.feelslike_c,temperatur:response.data.current.temp_c});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message, content:error.message
    });
  }
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.

});



app.post("/",async (req, res) => {
  
  try {
    const response = await axios.get(API_URL,{
      auth:{
        username:yourUsername,
        password:yourPassword,
      },
      params:{
        key:yourAPIKey,
        q:req.body.City,
        lang:"sv",
      }
    });
    const result = JSON.stringify(response.data);
  res.render("index.ejs", {image:response.data.current.condition.icon,condition:response.data.current.condition.text,country:response.data.location.name+", "+response.data.location.region,feelslike:response.data.current.feelslike_c,temperatur:response.data.current.temp_c});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message, content:error.message
    });
  }
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.post("/weather",async (req, res) => {
  
  try {
    const response = await axios.get(API_URL,{
      auth:{
        username:yourUsername,
        password:yourPassword,
      },
      params:{
        key:yourAPIKey,
        q:req.body.City,
        days:3,
        lang:"sv",
      }
    });
    const result = JSON.stringify(response.data);
  res.render("weather.ejs", {content:response.data.forecast,country:response.data.location.name});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("weather.ejs", {
      error: error.message, content:error.message
    });
  }
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});
app.get("/vader", async (req,res)=>{
  try {
    const response = await axios.get(API_URL,{
      auth:{
        username:yourUsername,
        password:yourPassword,
      },
      params:{
        key:yourAPIKey,
        q:'Halmstad',
        days:5,
        lang:"sv",
      }
    });
    const result = JSON.stringify(response.data);
    
  res.render("vader.ejs", {content:response.data.forecast,country:response.data.location.name+", "+response.data.location.region});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("vader.ejs", {
      error: error.message, content:error.message
    });
  }
});
app.post("/vader", async (req,res)=>{
  try {
    const response = await axios.get(API_URL,{
      auth:{
        username:yourUsername,
        password:yourPassword,
      },
      params:{
        key:yourAPIKey,
        q:req.body.City,
        days:5,
        lang:"sv",
      }
    });
    const result = JSON.stringify(response.data);
    
  res.render("vader.ejs", {content:response.data.forecast,country:response.data.location.name+", "+response.data.location.region});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("vader.ejs", {
      error: error.message, content:error.message
    });
  }
});
app.get("/weather",async (req, res) => {
  
  try {
    const response = await axios.get(API_URL,{
      auth:{
        username:yourUsername,
        password:yourPassword,
      },
      params:{
        key:yourAPIKey,
        q:'Halmstad',
        days:4,
        lang:"sv",
      }
    });
    const result = JSON.stringify(response.data);
    
  res.render("weather.ejs", {content:response.data.forecast,country:response.data.location.name});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("weather.ejs", {
      error: error.message, content:error.message
    });
  }
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});
app.post("/apiKey",async (req, res) => {
  try {
    const response = await axios.post(
      'http://api.weatherapi.com/v1/current.json',
      // '{\n    "locations": [\n        {\n            "q": "53,-0.12",\n            "custom_id": "my-id-1"\n        },\n        {\n            "q": "London",\n            "custom_id": "any-internal-id"\n        },\n        {\n            "q": "90201",\n            "custom_id": "us-zipcode-id-765"\n        }\n    ]\n}',
      {
        'locations': [
          {
            'q': 'Halmstad',
            'custom_id': 'my-id-1'
          },
          {
            'q': 'Vushtrri',
            'custom_id': 'Kosova'
          },
          {
            'q': 'Madrid',
            'custom_id': 'Spain'
          },
          {
            'q': 'Dubai',
            'custom_id': 'United Arab Emirates'
          },
          {
            'q': 'Paris',
            'custom_id': 'France'
          },
        ]
      },
      {
        params: {
          'key': yourAPIKey,
          'q': 'bulk',
          'lang':'sv'
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const result = JSON.stringify(response.data);
    
    console.log()
    res.render("index.ejs", { content:response.data.bulk}); 
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message, content:error.message
    });
  }
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  
});






app.listen(port,'0.0.0.0',() => {
  console.log(`Listening on port ${port}`);
});
