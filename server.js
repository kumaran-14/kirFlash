const express = require('express');
const cors = require('cors');
const path = require('path');
const Zillow = require('node-zillow');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;
const zillow = new Zillow(process.env.ZILLOW_API_KEY);

app.use(cors());
app.use('/',express.static(path.join(__dirname + '/public')));
app.set('views', path.join('views'));
app.set('view engine', 'ejs');

var cityData;
var cityList = fs.readFileSync('list_xml5.json', 'utf-8');
cityList = JSON.parse(cityList);

app.get('/animate', (req,res) =>{
    if(Object.keys(req.query).length === 0)
        res.sendFile(path.join(__dirname + "/animate.html"));
    else
    {
        zillow.get("GetDeepSearchResults", req.query).then(function (results) {
            for (let i = 0; i < cityList.city.length; i++) {
                let element = cityList.city[i];
                //if(element['label'].toLowerCase() == req.query.citystatezip.toLowerCase()){
                if(req.query.citystatezip.substr(0, element['label'].length).toUpperCase() == element['label'].toUpperCase()){
                    cityData = {
                        no : element['no'],
                        data : element['data'],
                        datatwo : element['datatwo']
                    }
                    break;
                }
            }
            res.send({results, cityData});
        });
    }
});
app.get('/animate_iDesigner_v3_june18.swf', (req,res) =>{
    res.sendFile(path.join(__dirname + "/animate_iDesigner_v3_june18.swf"));
});
app.get('/list_xml5.xml', (req,res) =>{
    res.sendFile(path.join(__dirname + "/list_xml5.xml"));
});

app.get('/zillow', (req, res) => {
    address = req.query.address;
    arr = address.split(',');
    citystatezip = arr[1].trim();
    address = arr[0].trim();
    query = {
        address,
        citystatezip
    };
    zillow.get("GetDeepSearchResults", query).then(function (results) {
        let latH = results.response.results.result[0].address[0].latitude[0];
        let longH = results.response.results.result[0].address[0].longitude[0];
        let staticMap = "https://maps.googleapis.com/maps/api/staticmap?center=" + latH + "," + longH +
            "&zoom=19&size=600x600&maptype=hybrid&key=" + process.env.GOOGLE_STATIC_MAPS_KEY;
      
        let address = query.address.split(' ').join('+');
        let citystatezip = query.citystatezip.split(' ').join('+'); 
        let streetView = "http://www.mapquestapi.com/staticmap/v4/getplacemap?key="+process.env.MAPQUEST_API_KEY+"&location="+address+","+citystatezip+"&size=600,600&type=map&zoom=16&imagetype=jpeg&showicon=red_1-1";

        for (let i = 0; i < cityList.city.length; i++) {
            let element = cityList.city[i];
            if(element['label'].toLowerCase() == query.citystatezip.toLowerCase()){
                cityData = {
                    no : element['no'],
                    data : element['data'],
                    datatwo : element['datatwo']
                }
                break;
            }
        }
        res.render('zillow', {
            results: results,
            staticMap: staticMap,
            streetView: streetView,
            cityData : cityData
        });
    });
});

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});