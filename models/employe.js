class Employe{
    constructor(id_emp, num_emp, prenom, nom, cin, departement, telephone, email){
        this.id_emp=id_emp;
        this.num_emp=num_emp;
        this.prenom=prenom;
        this.nom=nom;
        this.cin=cin;
        this.departement=departement;
        this.telephone=telephone;
        this.email=email;
    }
}
module.exports = Employe;