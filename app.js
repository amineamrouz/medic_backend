const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');
const Things = require ('./models/things');
const dbop = require('./dboperation');
const Medicament = require ('./models/things');
router = express.Router();



const app = express();


//config
var config = {
    user: 'login', 
    password: '2pac1996',  
    server: 'localhost',  
    database: 'medser',
    options: {
       trustServerCertificate: true,
       enableArithAbort: true
    }  
 };

 //configurationhttp

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
   
//connectedb
sql.connect(config,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à sql server réussie !'))
  .catch(() => console.log('Connexion à sql server échouée !'));


app.use(bodyParser.json());

//test



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api',router);

app.use('/api/user',(req, res, next)=>{
    console.log("middleware 1 mate!!");
    next();
});

app.get('/api/user',(req, res, next)=>{
    dbop.getUser().then(result=>{
        res.json(result);
    });
    
});

app.use('/api/user/:id', (req, res, next)=>{
    console.log("middleware 2 bruv");
    next();
});
app.get('/api/user/:id',(req, res, next,)=>{
    dbop.getOneUser(req.params.id).then(result=>{
        res.json(result);
    });
});

app.use('/api/adduser', (req, res, next)=>{
    console.log("middleware add user ");
    next();
});

app.post('/api/adduser', (req, res, next)=>{
    user ={...req.body}
    dbop.addUser(user).then(result=>{
        res.status(201).json(result);
    });
});

app.use('/api/deleteuserbyid/:id', (req, res, next)=>{
    console.log("middleware delete user by id");
    next();
});
app.delete('/api/deleteuserbyid/:id',(req, res, next,)=>{
    dbop.deleteUser(req.params.id).then(result=>{
        res.status(200).send("user has been deleted" );
    });
});


///////// medical service project
/// pharma

//get medicament
app.use('/api/medicament',(req, res, next)=>{
    console.log("middleware get medicament!!");
    next();
});

app.get('/api/medicament',(req, res, next)=>{
    dbop.getMedicament().then(result=>{
        res.json(result);
    });
    
});
// get medicament detail
app.use('/api/medicament/:id', (req, res, next)=>{
    console.log("middleware medicament details by id");
    next();
});
app.get('/api/medicament/:id',(req, res, next,)=>{
    dbop.getMedicamentDetail(req.params.id).then(result=>{
        res.json(result);
    });
});
// add new med
app.use('/api/addmed', (req, res, next)=>{
    console.log("middleware add new medicament ");
    next();
});

app.post('/api/addmed', (req, res, next)=>{
    med ={...req.body}
    dbop.addMed(med).then(result=>{
        res.status(201).json(result);
    });
});
// add new med detail
app.use('/api/addmeddetail', (req, res, next)=>{
    console.log("middleware add new medicament detail ");
    next();
});

app.post('/api/addmeddetail', (req, res, next)=>{
    med ={...req.body}
    dbop.addMedDetail(med).then(result=>{
        res.status(201).json(result);
    });
});
/// delete medicament
app.use('/api/deletemedbyid/:id', (req, res, next)=>{
    console.log("middleware delete Med by id");
    next();
});
app.delete('/api/deletemedbyid/:id',(req, res, next,)=>{
    dbop.deleteMed(req.params.id).then(result=>{
        res.status(200).send("Medicament has been deleted" );
    }); 
});

/// delete medicament details
app.use('/api/deletemeddetailbyid/:id', (req, res, next)=>{
    console.log("middleware delete Med  detaiks by id" );
    next();
});
app.delete('/api/deletemeddetailbyid/:id/:id_med',(req, res, next,)=>{
    dbop.deleteMedDetail(req.params.id,req.params.id_med).then(result=>{
        res.status(200).send("Medicament Details has been deleted");
    });
});
//////////////////////////////////////////////////////////////////////////
//          EMPLYEE

//get Emp
app.use('/api/emp',(req, res, next)=>{
    console.log("middleware get emp!!");
    next();
});

app.get('/api/emp',(req, res, next)=>{
    dbop.getEmp().then(result=>{
        res.json(result);
    });
    
});

///add EMP
app.use('/api/addemp', (req, res, next)=>{
    console.log("middleware add new employee ");
    next();
});

app.post('/api/addemp', (req, res, next)=>{
    emp ={...req.body}
    dbop.addEmp(emp).then(result=>{
        res.status(201).json(result);
    });
});
/// delete emp
app.use('/api/deleteempbyid/:id', (req, res, next)=>{
    console.log("middleware delete emp by id");
    next();
});
app.delete('/api/deleteempbyid/:id',(req, res, next,)=>{
    dbop.deleteEmp(req.params.id).then(result=>{
        res.status(200).send("Employee has been deleted" );
    }); 
});

/////////////////// dossier medical
// get dm
app.use('/api/getdm', (req, res, next)=>{
    console.log("middleware add new employee ");
    next();
});

app.get('/api/getdm',(req, res, next)=>{
    dbop.getDM().then(result=>{
        res.json(result);
    });
    
});

// get dm by id
// get medicament detail
app.use('/api/dm/:id', (req, res, next)=>{
    console.log("middleware dm by id");
    next();
});
app.get('/api/dm/:id',(req, res, next,)=>{
    dbop.getDMById(req.params.id).then(result=>{
        res.json(result);
    });
});

///add DM
app.use('/api/adddm', (req, res, next)=>{
    console.log("middleware add new DM ");
    next();
});

app.post('/api/adddm', (req, res, next)=>{
    emp ={...req.body}
    console.log(emp)
    dbop.addDM(emp).then(result=>{
        res.status(201).json(result);
    });
});

/////// DM Details
// add AHF
///add DM
app.use('/api/addahf', (req, res, next)=>{
    console.log("middleware add ahf ");
    next();
});

app.post('/api/addahf', (req, res, next)=>{
    ahf ={...req.body}
    console.log(ahf)
    dbop.addAHF(ahf).then(result=>{
        res.status(201).json(result);
    });
});
///add vaccin
app.use('/api/addvaccin', (req, res, next)=>{
    console.log("middleware add vac ");
    next();
});

app.post('/api/addvaccin', (req, res, next)=>{
    vac ={...req.body}
    console.log(vac)
    dbop.addVac(vac).then(result=>{
        res.status(201).json(result);
    });
});
///add DM
app.use('/api/addfsp', (req, res, next)=>{
    console.log("middleware add fsp ");
    next();
});

app.post('/api/addfsp', (req, res, next)=>{
    fsp ={...req.body}
    console.log(fsp)
    dbop.addfsp(fsp).then(result=>{
        res.status(201).json(result);
    });
});
 ///get dmd
 app.use('/api/getahf/:id', (req, res, next)=>{
    console.log("middleware ahf by id");
    next();
});
app.get('/api/getahf/:id',(req, res, next,)=>{
    dbop.getahfById(req.params.id).then(result=>{
        res.json(result);
        console.log("res:",result)
    });
});
//get vac
app.use('/api/getvac/:id', (req, res, next)=>{
    console.log("middleware vac by id");
    next();
});
app.get('/api/getvac/:id',(req, res, next,)=>{
    dbop.getvacById(req.params.id).then(result=>{
        res.json(result);
        console.log("res:",result)
    });
});
// get fsp
app.use('/api/getfsp/:id', (req, res, next)=>{
    console.log("middleware fsp by id");
    next();
});
app.get('/api/getfsp/:id',(req, res, next,)=>{
    dbop.getfspById(req.params.id).then(result=>{
        res.json(result);
        console.log("res:",result)
    });
});


/////////////////////////::VISITE
//get visit
app.use('/api/visite',(req, res, next)=>{
    console.log("middleware visite emp!!");
    next();
});

app.get('/api/visite',(req, res, next)=>{
    dbop.getVisite().then(result=>{
        res.json(result);
    });
    
});
// get visite by id
app.use('/api/visite/:id', (req, res, next)=>{
    console.log("middleware visite by id");
    next();
});
app.get('/api/visite/:id',(req, res, next,)=>{
    dbop.getVisiteById(req.params.id).then(result=>{
        res.json(result);
    });
});
///add visit
app.use('/api/addvisite', (req, res, next)=>{
    console.log("middleware add visite ");
    next();
});

app.post('/api/addvisite', (req, res, next)=>{
    fsp ={...req.body}
    console.log(fsp)
    dbop.addvisite(fsp).then(result=>{
        res.status(201).json(result);
    });
});

// delete deletevisiteById

app.use('/api/deletevisiteById/:id', (req, res, next)=>{
    console.log("middleware delete visit by id");
    next();
});
app.delete('/api/deletevisiteById/:id',(req, res, next,)=>{
    dbop.deleteVisite(req.params.id).then(result=>{
        res.status(200).send("visit has been deleted" );
    }); 
});
 ////////////: grand form
///add moteur
app.use('/api/addmoteur', (req, res, next)=>{
    console.log("middleware addmoteur ");
    next();
});

app.post('/api/addmoteur', (req, res, next)=>{
    data ={...req.body}
    console.log(data)
    dbop.addmoteur(data).then(result=>{
        res.status(201).json(result);
    });
});
///add Occulaire
app.use('/api/addocculaire', (req, res, next)=>{
    console.log("middleware Occulaire ");
    next();
});

app.post('/api/addocculaire', (req, res, next)=>{
    data ={...req.body}
    console.log(data)
    dbop.addoculaire(data).then(result=>{
        res.status(201).json(result);
    });
});
///add addAuditif
app.use('/api/addauditif', (req, res, next)=>{
    console.log("middleware addauditif ");
    next();
});

app.post('/api/addauditif', (req, res, next)=>{
    data ={...req.body}
    console.log(data)
    dbop.addAuditif(data).then(result=>{
        res.status(201).json(result);
    });
});
///add addCardio
app.use('/api/addCardio', (req, res, next)=>{
    console.log("middleware addCardio ");
    next();
});

app.post('/api/addCardio', (req, res, next)=>{
    data ={...req.body}
    console.log(data)
    dbop.addCardio(data).then(result=>{
        res.status(201).json(result);
    });
});
///add addres
app.use('/api/addres', (req, res, next)=>{
    console.log("middleware addres ");
    next();
});

app.post('/api/addres', (req, res, next)=>{
    data ={...req.body}
    console.log(data)
    dbop.addRes(data).then(result=>{
        res.status(201).json(result);
    });
});
///add addDigestif
app.use('/api/addDigestif', (req, res, next)=>{
    console.log("middleware addDigestif ");
    next();
});

app.post('/api/addDigestif', (req, res, next)=>{
    data ={...req.body}
    console.log(data)
    dbop.addDigestif(data).then(result=>{
        res.status(201).json(result);
    });
});

///add addGenital
app.use('/api/addGenital', (req, res, next)=>{
    console.log("middleware addGenital ");
    next();
});

app.post('/api/addGenital', (req, res, next)=>{
    data ={...req.body}
    console.log(data)
    dbop.addGenital(data).then(result=>{
        res.status(200).json(result);
    });
});
///add addUrinaire
app.use('/api/addUrinaire', (req, res, next)=>{
    console.log("middleware addUrinaire ");
    next();
});

app.post('/api/addUrinaire', (req, res, next)=>{
    data ={...req.body}
    console.log(data)
    dbop.addUrinaire(data).then(result=>{
        res.status(200).json(result);
    });
});
///add addUrinaire
app.use('/api/addHemato', (req, res, next)=>{
    console.log("middleware addHemato ");
    next();
});

app.post('/api/addHemato', (req, res, next)=>{
    data ={...req.body}
    console.log(data)
    dbop.addHemato(data).then(result=>{
        res.status(201).json(result);
    });
});
///add addNeuro
app.use('/api/addNeuro', (req, res, next)=>{
    console.log("middleware addNeuro ");
    next();
});

app.post('/api/addNeuro', (req, res, next)=>{
    data ={...req.body}
    console.log(data)
    dbop.addNeuro(data).then(result=>{
        res.status(201).json(result);
    });
});
//test 
module.exports= app;