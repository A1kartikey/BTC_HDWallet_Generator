const HdAddGen = require('hdaddressgenerator')
var bodyParser = require('body-parser')
const cors = require('cors');

const express = require('express')
const app = express()
const port = 9000

app.options('*', cors());
app.use(cors());

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.post('/generateChildKey', jsonParser, async (req, res) => { 

  try {

    
    console.log( 'xPub In Request: ',req.body.xPubKey ) ;
    console.log('Number of public Key requested: ',req.body.count)


   let extPub = req.body.xPubKey ;
   let addressCount = req.body.count ; 
   // The easiest way to initiate a class is by using an initiation function. 
   //HdAddGen.bip44() 
   let bip44 = HdAddGen.withExtPub(extPub,"BTC",bip=44,account=1,change=2)
   const addresses = await  bip44.generate(addressCount)
   console.log('Generated addtresses: ',addresses);

   res.send(addresses);
  
} catch (e) {

    throw new Error("error: ",e);
} 

} )  


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })