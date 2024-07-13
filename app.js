import express, { response } from "express";
import bodyParser from "body-parser";
import axios from "axios";
import requestIp from "request-ip";


const app = express();
const port = process.env.PORT || 3000;
const API_URL = "http://api.weatherapi.com/v1/forecast.json";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestIp.mw());
app.use(express.static("public"));
//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "titche";

const yourPassword = "bunjaku90";
const yourAPIKey = "a8789d617457406f8dc101750240406";
const yourBearerToken = "966ec5ef-4571-43dd-8aee-3d4d14446586";




//Home Get
app.get("/", async (req, res) => {
  const ip = req.clientIp;

  try {
    const response = await axios.get(API_URL, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
      params: {
        key: yourAPIKey,
        q: 'Madrid',
        lang: "sv",
      }
    });
    console.log(response.data);
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { image: response.data.current.condition.icon, condition: response.data.current.condition.text, country: response.data.location.name + ", " + response.data.location.region, feelslike: Math.round(response.data.current.feelslike_c), temperatur: Math.round(response.data.current.temp_c),wind:Math.round(response.data.current.wind_kph) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message, content: error.message
    });
  }
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.

});


//Home Post
app.post("/", async (req, res) => {

  try {
    const response = await axios.get(API_URL, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
      params: {
        key: yourAPIKey,
        q: req.body.City,
        lang: "sv",
      }
    });
    const result = JSON.stringify(response.data);
    res.render("index.ejs", { image: response.data.current.condition.icon, condition: response.data.current.condition.text, country: response.data.location.name + ", " + response.data.location.region, feelslike: response.data.current.feelslike_c, temperatur: Math.round(response.data.current.temp_c), wind:Math.round(response.data.current.wind_kph)});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message, content: error.message
    });
  }
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

//Vader Get
app.get("/vader", async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
      params: {
        key: yourAPIKey,
        q: 'Halmstad',
        days: 5,
        lang: "sv",
      }
    });
    const result = JSON.stringify(response.data);

    res.render("vader.ejs", { content: response.data.forecast, country: response.data.location.name + ", " + response.data.location.region });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("vader.ejs", {
      error: error.message, content: error.message
    });
  }
});
//Vader Post
app.post("/vader", async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
      params: {
        key: yourAPIKey,
        q: req.body.City,
        days: 5,
        lang: "sv",
      }
    });
    const result = JSON.stringify(response.data);

    res.render("vader.ejs", { content: response.data.forecast, country: response.data.location.name + ", " + response.data.location.region });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("vader.ejs", {
      error: error.message, content: error.message
    });
  }
});
//Vader14 Get
app.get("/varld", async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
      params: {
        key: yourAPIKey,
        q: 'stockholm',
        days: 1,
        lang: "sv",
      }
    });
    const paris = await axios.get(API_URL, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
      params: {
        key: yourAPIKey,
        q: 'paris',
        days: 1,
        lang: "sv",
      }
    });
    const dubai = await axios.get(API_URL, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
      params: {
        key: yourAPIKey,
        q: 'dubai',
        days: 1,
        lang: "sv",
      }
    });
    const germany = await axios.get(API_URL, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
      params: {
        key: yourAPIKey,
        q: 'germany',
        days: 1,
        lang: "sv",
      }
    });
    const spain = await axios.get(API_URL, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
      params: {
        key: yourAPIKey,
        q: 'spain',
        days: 1,
        lang: "sv",
      }
    });
    const result = JSON.stringify(response.data);

    res.render("varld.ejs", { 
      content: response.data.forecast, country: response.data.location.name + ", " + response.data.location.region,
      content1: paris.data.forecast, country1:paris.data.location.name + ", " + paris.data.location.region,
      content2: dubai.data.forecast, country2:dubai.data.location.name + ", " + dubai.data.location.region,
      content3: germany.data.forecast, country3:germany.data.location.name + ", " + germany.data.location.region,
      content4: spain.data.forecast, country4:spain.data.location.name + ", " + spain.data.location.region   });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("varld.ejs", {
      error: error.message, content: error.message
    });
  }
});
//Vader14 Post
app.post("/vader14", async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
      params: {
        key: yourAPIKey,
        q: req.body.City,
        days: 14,
        lang: "sv",
      }
      
    });
    
    const result = JSON.stringify(response.data);

    res.render("vader14.ejs", { content: response.data.forecast, country: response.data.location.name + ", " + response.data.location.region });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("vader14.ejs", {
      error: error.message, content: error.message
    });
  }
});
app.get("/error",(req,res)=>{

  res.render("error.ejs");
});
app.get("*",(req,res)=>{

  res.redirect("/error");
});


 



// Server
app.listen(port,'0.0.0.0', () => {
  console.log(`Listening on port ${port}`);
});
