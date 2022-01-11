const sql = require('mssql');
const config = require ('./app');
const usertoadd = require('./models/things');

//testt

async function getUser(){
    try{
         pool = await sql.connect(config);
         user = await pool.request().query("select * from dbo.auth");
        return user.recordset;
    }
    catch (error){
        console.log('erreur get user', +error);
    }
}

async function getOneUser(idUser){
    try{
        conn = await sql.connect(config);
        oneuser = await conn.request()
        .input('input_parameter', sql.Int, idUser)
        .query("select id, username, password from dbo.auth where id= @input_parameter");
        return oneuser.recordset;
    }
    catch (error){
        console.log("error get one user",+error);
    }
}

async function deleteUser(idUser){
    try{
        conn = await sql.connect(config);
        oneuser = await conn.request()
        .input('input_parameter', sql.Int, idUser)
        .query("delete from dbo.auth where id= @input_parameter");
        return deleteUser.recordset;
    }
    catch (error){
        console.log("error deleting a user",+error);
    }

}

async function addUser(usertoadd){
    try {
        conn = await sql.connect(config);
        adduser = await conn.request()
        .input("id", sql.Int, usertoadd.id)
        .input("userame", sql.VarChar(50), usertoadd.username)
        .input("password", sql.VarChar(50), usertoadd.password)
        .execute("insertUser");
        return adduser.recordset;

    } catch (error) {
        console.log("error adduser",+error);
    }

}

//// medical service project

// get medicament
async function getMedicament(){
    try{
         pool = await sql.connect(config);
         user = await pool.request().query("select * from dbo.medicament");
        return user.recordset;
    }
    catch (error){
        console.log('erreur get user', +error);
    }
}

// get medicament detail by id


async function getMedicamentDetail(idMed){
    try{
        conn = await sql.connect(config);
        oneuser = await conn.request()
        .input('input_parameter', sql.Int, idMed)
        .query("select * from  dbo.medicament_detail where dbo.medicament_detail.id_med= @input_parameter");
        return oneuser.recordset;
    }
    catch (error){
        console.log("error get med by id",+error);
    }
}

// add new medicament

async function addMed(medtoadd){
    try {
        conn = await sql.connect(config);
        addmed = await conn.request()
        .input("id_med", sql.Int, medtoadd.id_med)
        .input("medicament", sql.VarChar(50), medtoadd.medicament)
        .input("nom_commercial", sql.VarChar(50), medtoadd.nom_commercial)
        .input("presentation", sql.VarChar(50), medtoadd.presentation)
        .input("Qte", sql.Int, medtoadd.Qte)
        .execute("InsertIntoMedicament");
        return addmed.recordset;

    } catch (error) {
        console.log("error add medicament",+error);

    }

}

// add new medicament detail

async function addMedDetail(meddetailtoadd){
    try {
        conn = await sql.connect(config);
        addmed = await conn.request()
        .input("id_med_detail", sql.BigInt, meddetailtoadd.id_med_detail)
        .input("nlot", sql.Int, meddetailtoadd.nlot)
        .input("date_peremption", sql.DateTime,  meddetailtoadd.date_peremption)
        .input("date_entree", sql.DateTime, meddetailtoadd.date_entree)
        .input("id_med", sql.Int, meddetailtoadd.id_med)
        .execute("InsertIntoMedicamentDetail");

        return addMedDetail.recordset;

    } catch (error) {
        console.log("error add medicament detail",+error);
     }

}

/// delete med deleteMed
async function deleteMed(idMed){
    try{
        conn = await sql.connect(config);
        oneuser = await conn.request()
        .input('input_parameter', sql.Int, idMed)
        .query("delete from dbo.medicament where id_med= @input_parameter");
        return deleteMed.recordset;
    }
    catch (error){
        console.log("error deleting a Med",+error);
    }

}

/// delete med deleteMedDetail
async function deleteMedDetail(idMed,idMedDetail){
    try{
        conn = await sql.connect(config);
        oneuser = await conn.request()
        .input('id_med', sql.Int, idMed)
        .input('id_med_detail', sql.Int, idMedDetail)
        .execute('DeleteMedicamentDetail');
        return deleteMedDetail.recordset;
    }
    catch (error){
        console.log("error deleting a Med",+error);
    }

}

/////////////////////////////////////////////////////
//      EMPLOYE

// get Emp
async function getEmp(){
    try{
         pool = await sql.connect(config);
         emp = await pool.request().query("select * from dbo.employe");
        return emp.recordset;
    }
    catch (error){
        console.log('erreur get emp', +error);
    }
}

// add Emp


async function addEmp(emptoadd){
    try {
        conn = await sql.connect(config);
        addemp = await conn.request()
        .input("num_emp", sql.VarChar(50), emptoadd.num_emp)
        .input("prenom", sql.VarChar(50), emptoadd.prenom)
        .input("nom", sql.VarChar(50), emptoadd.nom)
        .input("cin", sql.VarChar(50), emptoadd.cin)
        .input("departement", sql.VarChar(50), emptoadd.departement)
        .input("telephone", sql.VarChar(50), emptoadd.telephone)
        .input("email", sql.VarChar(50), emptoadd.email)
        .execute("InsertIntoEmp");
        return addemp.recordset;

    } catch (error) {
        console.log("error add Emp",+error);

    }

}

/// delete med deleteMed
async function deleteEmp(idEmp){
    try{
        conn = await sql.connect(config);
        oneuser = await conn.request()
        .input('input_parameter', sql.Int, idEmp)
        .query("delete from dbo.employe where id_emp= @input_parameter");
        return deleteMed.recordset;
    }
    catch (error){
        console.log("error deleting a Emp",+error);
    }

}
///////////////////////////////////////////// DM
// get dm


async function getDM(){
    try{
         pool = await sql.connect(config);
         dm = await pool.request().query("select * from dbo.DossierMedical");
        return dm.recordset;
    }
    catch (error){
        console.log('erreur get dm', +error);
    }
}

//get dm by id
async function getDMById(idDM){
    try{
        conn = await sql.connect(config);
        oneuser = await conn.request()
        .input('input_parameter', sql.Int, idDM)
        .query("select * from  dbo.DossierMedical where dbo.DossierMedical.id_emp= @input_parameter");
        return oneuser.recordset;
    }
    catch (error){
        console.log("error get dm by id",+error);
    }
}

// add DM


async function addDM(emptoadd){
    try {
        conn = await sql.connect(config);
        adddm = await conn.request()
        .input("num_dm", sql.VarChar(50), emptoadd.num_dm)
        .input("date_creation", sql.DateTime, emptoadd.date_creation)
        .input("cree_par", sql.VarChar(50), emptoadd.cree_par)
        .input("entreprise", sql.VarChar(50), emptoadd.entreprise)
        .input("id_emp", sql.Int, emptoadd.id_emp)
        .execute("InsertIntoDM");
        return adddm.recordset;

    } catch (error) {
        console.log("error add Emp",+error);

    }

}

///// dm details
// add addahf
async function addAHF(ahftoadd){
    try {
        conn = await sql.connect(config);
        addahf = await conn.request()
        .input("conjoint", sql.VarChar(50), ahftoadd.conjoint)
        .input("nom_pere", sql.VarChar(50), ahftoadd.nom_pere)
        .input("nom_mere", sql.VarChar(50), ahftoadd.nom_mere)
        .input("nb_enfants", sql.Int, ahftoadd.nb_enfants)
        .input("nb_freres", sql.Int, ahftoadd.nb_freres)
        .input("nb_soeurs", sql.Int, ahftoadd.nb_soeurs)
        .input("id_dm", sql.Int, ahftoadd.id_dm)
        .execute("InsertIntoAHF");
        return addahf.recordset;

    } catch (error) {
        console.log("error add addahf",+error);

    }

}
// add addvac
async function addVac(vactoadd){
    try {
        conn = await sql.connect(config);
        addahf = await conn.request()
        .input("BCG", sql.VarChar(50), vactoadd.BCG)
        .input("diphterie_tetanos", sql.VarChar(50), vactoadd.diphterie_tetanos)
        .input("TAB", sql.VarChar(50), vactoadd.TAB)
        .input("polimoyelite", sql.VarChar(50), vactoadd.polimoyelite)
        .input("autres", sql.VarChar(50), vactoadd.autres)
        .input("id_dm", sql.Int, vactoadd.id_dm)
        .execute("InsertIntoVac");
        return addahf.recordset;

    } catch (error) {
        console.log("error add addvac",+error);

    }

}

// add addvac
async function addfsp(vactoadd){
    try {
        conn = await sql.connect(config);
        addahf = await conn.request()
        .input("Formation", sql.Text, vactoadd.Formation)
        .input("activite_professionnelle", sql.Text, vactoadd.activite_professionnelle)
        .input("id_dm", sql.Int, vactoadd.id_dm)
        .execute("InsertIntoFSP");
        return addahf.recordset;

    } catch (error) {
        console.log("error add addvac",+error);

    }

}
/// get ahf

async function getahfById(id){
    try{
        conn = await sql.connect(config);
        oneuser = await conn.request()
        .input('input_parameter', sql.Int, id)
        .query("SELECT * from dbo.AHF where dbo.AHF.id_dm= @input_parameter");
        return oneuser.recordset;
    }
    catch (error){
        console.log("error get ahf by id",+error, id);
    }
}
async function getvacById(id){
    try{
        conn = await sql.connect(config);
        oneuser = await conn.request()
        .input('input_parameter', sql.Int, id)
        .query("SELECT * from dbo.vaccination where dbo.vaccination.id_dm= @input_parameter");
        return oneuser.recordset;
    }
    catch (error){
        console.log("error get vac by id",+error);
    }
}
async function getfspById(id){
    try{
        conn = await sql.connect(config);
        oneuser = await conn.request()
        .input('input_parameter', sql.Int, id)
        .query("SELECT * from dbo.formation_scolaire_professionnelle where dbo.formation_scolaire_professionnelle.id_dm= @input_parameter");
        return oneuser.recordset;
    }
    catch (error){
        console.log("error get fsp by id",+error);
    }
}

///////////////////////////:getVisite

async function getVisite(){
    try{
         pool = await sql.connect(config);
         dm = await pool.request().query("select * from dbo.visite");
        return dm.recordset;
    }
    catch (error){
        console.log('erreur get visites', +error);
    }
}

async function getVisiteById(idDM){
    try{
        conn = await sql.connect(config);
        oneuser = await conn.request()
        .input('input_parameter', sql.Int, idDM)
        .query("select * from  dbo.visite where dbo.visite.id_dm= @input_parameter");
        return oneuser.recordset;
    }
    catch (error){
        console.log("error get dm by id",+error);
    }
}
async function addvisite(vactoadd){
    try {
        conn = await sql.connect(config);
        addahf = await conn.request()
        .input("date_visite", sql.Date, vactoadd.date_visite)
        .input("docteur", sql.VarChar(50), vactoadd.docteur)
        .input("type_visite", sql.VarChar(50), vactoadd.type_visite)
        .input("diagnostic", sql.Text, vactoadd.diagnostic)
        .input("id_dm", sql.Int, vactoadd.id_dm)
        .execute("InsertIntoVisite");
        return addahf.recordset;

    } catch (error) {
        console.log("error add add visite",+error);

    }

}
/// delete med deleteVisite
async function deleteVisite(idEmp){
    try{
        conn = await sql.connect(config);
        oneuser = await conn.request()
        .input('input_parameter', sql.Int, idEmp)
        .query("delete from dbo.visite where id_visite= @input_parameter");
        return oneuser.recordset;
    }
    catch (error){
        console.log("error deleting a visite",+error);
    }

}

///////////: grand form

async function addmoteur(data){
    try {
        conn = await sql.connect(config);
        add = await conn.request()
        .input("descr", sql.Text, data.descr)
        .input("poids", sql.Int, data.poids)
        .input("taille", sql.Int, data.taille)
        .input("id_dm", sql.Int, data.id_dm)
        .execute("InsertIntoMoteur");
        return add.recordset;

    } catch (error) {
        console.log("error add moteur",+error);

    }

}

async function addoculaire(data){
    try {
        conn = await sql.connect(config);
        add = await conn.request()
        .input("gauche", sql.Int, data.gauche)
        .input("droite", sql.Int, data.droite)
        .input("aveccorrection", sql.VarChar(10), data.aveccorrection)
        .input("couleur", sql.VarChar(50), data.couleur)
        .input("id_dm", sql.Int, data.id_dm)
        .execute("InsertIntoOcc");
        return add.recordset;

    } catch (error) {
        console.log("error add occ",+error);

    }

}

async function addAuditif(data){
    try {
        conn = await sql.connect(config);
        add = await conn.request()
        .input("gauche", sql.Int, data.gauche)
        .input("droite", sql.Int, data.droite)
        .input("prothese", sql.VarChar(10), data.prothese)
        .input("id_dm", sql.Int, data.id_dm)
        .execute("InsertIntoAud");
        return add.recordset;

    } catch (error) {
        console.log("error add occ",+error);

    }

}
async function addCardio(data){
    try {
        conn = await sql.connect(config);
        add = await conn.request()
        .input("pouls", sql.Int, data.pouls)
        .input("TA", sql.Int, data.TA)
        .input("varices", sql.VarChar(200), data.varices)
        .input("id_dm", sql.Int, data.id_dm)
        .execute("InsertIntoCar");
        return add.recordset;

    } catch (error) {
        console.log("error add occ",+error);

    }

}
async function addRes(data){
    try {
        conn = await sql.connect(config);
        add = await conn.request()
        .input("capVit", sql.Text, data.capVit)
        .input("VEMS", sql.Text, data.VEMS)
        .input("VEMSCV", sql.Text, data.VEMSCV)
        .input("id_dm", sql.Int, data.id_dm)
        .execute("InsertIntoRes");
        return add.recordset;

    } catch (error) {
        console.log("error add occ",+error);

    }

}

async function addDigestif(data){
    try {
        conn = await sql.connect(config);
        add = await conn.request()
        .input("parois", sql.Text, data.parois)
        .input("regime", sql.Text, data.regime)
        .input("id_dm", sql.Int, data.id_dm)
        .execute("InsertIntoDig");
        return add.recordset;

    } catch (error) {
        console.log("error add occ",+error);

    }

}

async function addGenital(data){
    try {
        conn = await sql.connect(config);
        add = await conn.request()
        .input("descr", sql.Text, data.descr)
        .input("regles", sql.VarChar(100), data.regles)
        .input("id_dm", sql.Int, data.id_dm)
        .execute("InsertIntoGen");
        return add.recordset;

    } catch (error) {
        console.log("error add genital",+error);

    }

}
async function addUrinaire(data){
    try {
        conn = await sql.connect(config);
        add = await conn.request()
        .input("descr", sql.Text, data.descr)
        .input("sucre", sql.VarChar(100), data.sucre)
        .input("albumine", sql.VarChar(100), data.albumine)
        .input("id_dm", sql.Int, data.id_dm)
        .execute("InsertIntoUri");
        return add.recordset;

    } catch (error) {
        console.log("error add genital",+error);

    }

}

async function addHemato(data){
    try {
        conn = await sql.connect(config);
        add = await conn.request()
        .input("ganglions", sql.VarChar(50), data.ganglions)
        .input("rate", sql.VarChar(50), data.rate)
        .input("id_dm", sql.Int, data.id_dm)
        .execute("InsertIntoHem");
        return add.recordset;

    } catch (error) {
        console.log("error add hemato",+error);

    }

}
async function addNeuro(data){
    try {
        conn = await sql.connect(config);
        add = await conn.request()
        .input("nervotime", sql.VarChar(50), data.nervotime)
        .input("tremblement", sql.VarChar(50), data.tremblement)
        .input("equilibre", sql.VarChar(50), data.equilibre)
        .input("S_remberg", sql.VarChar(50), data.S_remberg)
        .input("reflexes_oc", sql.VarChar(50), data.reflexes_oc)
        .input("reflexes_tend", sql.VarChar(50), data.reflexes_tend)
        .input("id_dm", sql.Int, data.id_dm)
        .execute("InsertIntoNeu");
        return add.recordset;

    } catch (error) {
        console.log("error add Neuro",+error);

    }

}

module.exports ={
    getUser : getUser,
    getOneUser : getOneUser,
    addUser : addUser,
    deleteUser : deleteUser,
    /// medical service
    //pharma
    getMedicament : getMedicament,
    getMedicamentDetail:getMedicamentDetail,
    addMed:addMed,
    addMedDetail:addMedDetail,
    deleteMed:deleteMed,
    deleteMedDetail:deleteMedDetail,
    // Employee
    getEmp:getEmp,
    addEmp:addEmp,
    deleteEmp:deleteEmp,
    // DM
    getDM:getDM,
    getDMById:getDMById,
    addDM:addDM,
    // dm detail
    addAHF:addAHF,
    addVac:addVac,
    addfsp:addfsp,
    //get dm details
    getahfById:getahfById,
    getvacById:getvacById,
    getfspById:getfspById,
    //visites
    getVisite:getVisite,
    getVisiteById:getVisiteById,
    addvisite:addvisite,
    deleteVisite:deleteVisite,
    ////
    addmoteur:addmoteur,
    addoculaire:addoculaire,
    addAuditif:addAuditif,
    addCardio:addCardio,
    addRes:addRes,
    addDigestif:addDigestif,
    addGenital:addGenital,
    addUrinaire:addUrinaire,
    addHemato:addHemato,
    addNeuro:addNeuro



}


//testt