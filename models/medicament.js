class Medicament{
    constructor(id_med,medicament,nom_commercial,presentation, Qte){
        this.id_med=id_med;
        this.medicament=medicament;
        this.nom_commercial=nom_commercial;
        this.presentation=presentation;
        this.Qte=Qte;
    }
}
module.exports = Medicament;