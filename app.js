import express, { response } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = process.env.PORT||3000;
const API_URL = "http://api.weatherapi.com/v1/current.json";
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "titche";

const yourPassword = "bunjaku90";
const yourAPIKey = "a8789d617457406f8dc101750240406";
const yourBearerToken = "966ec5ef-4571-43dd-8aee-3d4d14446586";
let data=false;
app.get("/", async (req, res) => {
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

app.get("/noAuth", async (req, res) => {
  
  try {
    const response = await axios.get(API_URL+"random");
    const result = JSON.stringify(response.data);
    console.log(result);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
    
  
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL+"all?page=2",{
      auth:{
        username:yourUsername,
        password:yourPassword,
      },
    });
    const result = JSON.stringify(response.data);
    console.log(result);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message, content:error.message
    });
  }
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
   
});

app.get("/apiKey",async (req, res) => {
  try {
    const response = await axios.get(API_URL,{
      auth:{
        username:yourUsername,
        password:yourPassword,
      },
      params:{
        key:yourAPIKey,
        q:"Halmstad",
        lang:"sv",
      }
    });
    const result = JSON.stringify(response.data);
    console.log(result);
    res.render("index.ejs", { condition:response.current.condtion.text,country:response.data.location.name,temperatur:response.data.current.temp_c,image:response.data.current.condition.icon });
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
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(API_URL+'secrets/52',config);
    const result = JSON.stringify(response.data);
    console.log(result);
    res.render("index.ejs", { content: result});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message, content:error.message
    });
    
  }
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.post("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(API_URL+'secrets/'+req.body.text,config);
    const result = JSON.stringify(response.data);

    console.log(result);
    data=true;
    res.render("index.ejs", { content: result, username:response.data.username,secret:response.data.secret,emScore:response.data.emScore,timestamp:response.data.timestamp,dataT:data });
    
    console.log(response.data.secret)
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message, content:error.message
    });
   
  }
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}`);
});
