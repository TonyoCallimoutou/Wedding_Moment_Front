export class Utils {

  static equals(objet1: any, objet2: any): boolean {
    // Vérifier si les deux paramètres sont des objets
    if (typeof objet1 !== 'object' || objet1 === null || typeof objet2 !== 'object' || objet2 === null) {
      return false;
    }

    // Récupérer les clés des deux objets
    const clesObjet1 = Object.keys(objet1);
    const clesObjet2 = Object.keys(objet2);

    // Vérifier si les deux objets ont le même nombre de propriétés
    if (clesObjet1.length !== clesObjet2.length) {
      return false;
    }

    // Vérifier les propriétés et valeurs de chaque objet récursivement
    for (const cle of clesObjet1) {
      if (!clesObjet2.includes(cle) || !this.equals(objet1[cle], objet2[cle])) {
        return false;
      }
    }

    // Si toutes les vérifications ont réussi, les objets sont égaux
    return true;
  }
}
