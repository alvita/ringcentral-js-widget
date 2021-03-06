import callErrors from 'ringcentral-integration/modules/Call/callErrors';

export default {
  [callErrors.noToNumber]: 'Veuillez saisir un numéro de téléphone valide.',
  [callErrors.noAreaCode]: 'Veuillez paramétrer {areaCodeLink} pour utiliser des numéros de téléphone locaux à 7 chiffres.',
  [callErrors.specialNumber]: 'La composition de numéros d\'urgence ou renvoyant à des services spéciaux n\'est pas prise en charge.',
  [callErrors.connectFailed]: 'Échec de la connexion. Veuillez réessayer plus tard.',
  [callErrors.internalError]: 'Connexion impossible en raison d\'erreurs internes. Veuillez réessayer plus tard.',
  [callErrors.notAnExtension]: 'Le numéro de l\'extension n\'existe pas.',
  [callErrors.networkError]: 'Connexion impossible en raison de problèmes de réseau. Veuillez réessayer plus tard.',
  [callErrors.noRingoutEnable]: `Votre extension est autorisée à passer des appels avec l'application pour ordinateur de bureau.
    Si vous souhaitez passer à d'autres options d'appel,
    veuillez contacter votre administrateur de compte pour une mise à niveau.`,
  areaCode: 'indicatif régional',
};
