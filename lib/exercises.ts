import { Level, Topic, Exercise, ExerciseStep, LevelInfo, TopicInfo } from './types';

export const LEVELS: LevelInfo[] = [
  {
    id: '1Obs',
    name: '1Obs',
    fullName: '1ère Observation',
    emoji: '🌱',
    color: '#10B981',
    colorLight: '#D1FAE5',
    description: 'Les bases essentielles',
    ageRange: '10-11 ans',
  },
  {
    id: '1phase',
    name: '1phase',
    fullName: '1ère Phase',
    emoji: '🚀',
    color: '#3B82F6',
    colorLight: '#DBEAFE',
    description: 'Nouveaux défis au collège',
    ageRange: '11-12 ans',
  },
  {
    id: '5eme',
    name: '5ème',
    fullName: 'Cinquième',
    emoji: '🔥',
    color: '#F59E0B',
    colorLight: '#FEF3C7',
    description: 'Concepts avancés',
    ageRange: '12-13 ans',
  },
];

export const TOPICS: TopicInfo[] = [
  {
    id: 'geometry',
    name: 'Géométrie',
    emoji: '📐',
    color: '#8B5CF6',
    colorLight: '#EDE9FE',
    description: 'Formes, aires, périmètres',
  },
  {
    id: 'fractions',
    name: 'Fractions',
    emoji: '🍕',
    color: '#EF4444',
    colorLight: '#FEE2E2',
    description: 'Découpages et opérations',
  },
  {
    id: 'mental',
    name: 'Calcul mental',
    emoji: '🧠',
    color: '#06B6D4',
    colorLight: '#CFFAFE',
    description: 'Vitesse et précision',
  },
  {
    id: 'numbers',
    name: 'Nombres',
    emoji: '🔢',
    color: '#10B981',
    colorLight: '#D1FAE5',
    description: 'Lecture, décomposition, abaques',
  },
];

export const EXERCISES: Exercise[] = [
  // ==================== 1OBS - GÉOMÉTRIE ====================
  {
    id: '1Obs-geo-1',
    level: '1Obs',
    topic: 'geometry',
    title: 'Périmètre du carré',
    emoji: '⬜',
    question: 'Un carré a un côté de 5 cm. Quel est son périmètre ?',
    options: ['10 cm', '20 cm', '25 cm', '15 cm'],
    correctAnswer: '20 cm',
    steps: [
      { text: 'Le périmètre d\'un carré = côté × 4', formula: 'P = c × 4' },
      { text: 'On remplace : P = 5 × 4', formula: 'P = 5 × 4' },
      { text: 'On calcule le produit', formula: 'P = 20 cm' },
    ],
    explanation: 'Un carré a 4 côtés égaux. Donc 5 + 5 + 5 + 5 = 20 cm. Bravo ! 🎉',
    visual: { type: 'rectangle', width: 120, height: 120, labels: [{ text: '5 cm', x: 60, y: -8 }] },
    difficulty: 1,
    xp: 10,
  },
  {
    id: '1Obs-geo-2',
    level: '1Obs',
    topic: 'geometry',
    title: 'Aire du rectangle',
    emoji: '▭',
    question: 'Un rectangle mesure 8 cm de long et 3 cm de large. Quelle est son aire ?',
    options: ['22 cm²', '24 cm²', '11 cm²', '26 cm²'],
    correctAnswer: '24 cm²',
    steps: [
      { text: 'L\'aire d\'un rectangle = Longueur × largeur', formula: 'A = L × l' },
      { text: 'On identifie : L = 8 cm, l = 3 cm', formula: 'L = 8 ; l = 3' },
      { text: 'On calcule : A = 8 × 3', formula: 'A = 24 cm²' },
    ],
    explanation: 'L\'unité est cm² (centimètres carrés) car c\'est une surface. ✨',
    visual: { type: 'rectangle', width: 140, height: 60, labels: [{ text: '8', x: 70, y: -8 }, { text: '3', x: -10, y: 30 }] },
    difficulty: 2,
    xp: 15,
  },
  {
    id: '1Obs-geo-3',
    level: '1Obs',
    topic: 'geometry',
    title: 'Reconnaître les formes',
    emoji: '🔺',
    question: 'Combien de côtés a un triangle ?',
    options: ['2', '3', '4', '5'],
    correctAnswer: '3',
    steps: [
      { text: 'Un triangle est une forme à 3 sommets' },
      { text: 'Chaque sommet est relié aux autres par un côté' },
      { text: 'Avec 3 sommets, on a donc 3 côtés' },
    ],
    explanation: 'Triangle = tri (3) + angle. Facile ! 😄',
    difficulty: 1,
    xp: 10,
  },
  {
    id: '1Obs-geo-4',
    level: '1Obs',
    topic: 'geometry',
    title: 'Périmètre du rectangle',
    emoji: '▭',
    question: 'Un rectangle de 7 cm × 4 cm. Quel est son périmètre ?',
    options: ['22 cm', '28 cm', '11 cm', '26 cm'],
    correctAnswer: '22 cm',
    steps: [
      { text: 'Le périmètre d\'un rectangle = 2 × (L + l)', formula: 'P = 2 × (L + l)' },
      { text: 'On calcule : P = 2 × (7 + 4)', formula: 'P = 2 × 11' },
      { text: 'Résultat final', formula: 'P = 22 cm' },
    ],
    explanation: 'On additionne les 4 côtés : 7+4+7+4 = 22 cm. 👏',
    visual: { type: 'rectangle', width: 140, height: 80, labels: [{ text: '7', x: 70, y: -8 }, { text: '4', x: -8, y: 40 }] },
    difficulty: 2,
    xp: 15,
  },

  // ==================== CM2 - FRACTIONS ====================
  {
    id: '1Obs-frac-1',
    level: '1Obs',
    topic: 'fractions',
    title: 'Lire une fraction',
    emoji: '🍕',
    question: 'Que représente la fraction 3/4 ?',
    options: ['3 parts sur 4', '4 parts sur 3', '3 + 4', '3 × 4'],
    correctAnswer: '3 parts sur 4',
    steps: [
      { text: 'Le chiffre du haut (3) est le numérateur' },
      { text: 'Le chiffre du bas (4) est le dénominateur' },
      { text: '3/4 = 3 parts sur 4 parts égales' },
    ],
    explanation: 'Imagine une pizza coupée en 4 parts égales : tu en prends 3. 🍕',
    visual: { type: 'fraction-bar', numerator: 3, denominator: 4 },
    difficulty: 1,
    xp: 10,
  },
  {
    id: '1Obs-frac-2',
    level: '1Obs',
    topic: 'fractions',
    title: 'Fractions égales',
    emoji: '🍰',
    question: 'Quelle fraction est égale à 1/2 ?',
    options: ['2/3', '2/4', '3/4', '4/2'],
    correctAnswer: '2/4',
    steps: [
      { text: 'Deux fractions sont égales si on multiplie (ou divise) le numérateur et le dénominateur par le même nombre' },
      { text: '1/2 → multiplions par 2 : 1×2 / 2×2' },
      { text: 'Résultat : 2/4 = 1/2' },
    ],
    explanation: '2/4 et 1/2 représentent la même quantité, la moitié ! 🎯',
    visual: { type: 'fraction-bar', numerator: 2, denominator: 4 },
    difficulty: 2,
    xp: 15,
  },
  {
    id: '1Obs-frac-3',
    level: '1Obs',
    topic: 'fractions',
    title: 'Addition de fractions',
    emoji: '🥧',
    question: 'Calcule : 1/4 + 2/4 = ?',
    options: ['3/8', '3/4', '2/8', '1/4'],
    correctAnswer: '3/4',
    steps: [
      { text: 'Les dénominateurs sont identiques (4)' },
      { text: 'On additionne seulement les numérateurs : 1 + 2' },
      { text: 'Résultat : 3/4' },
    ],
    explanation: 'Comme les parts ont la même taille, on ajoute juste les numérateurs ! 👍',
    visual: { type: 'fraction-bar', numerator: 3, denominator: 4 },
    difficulty: 2,
    xp: 15,
  },
  {
    id: '1Obs-frac-4',
    level: '1Obs',
    topic: 'fractions',
    title: 'Comparer des fractions',
    emoji: '⚖️',
    question: 'Quelle fraction est la plus grande : 1/2 ou 1/4 ?',
    options: ['1/2', '1/4', 'Elles sont égales', 'On ne peut pas savoir'],
    correctAnswer: '1/2',
    steps: [
      { text: 'Même numérateur (1), donc celle avec le plus petit dénominateur est plus grande' },
      { text: '2 < 4, donc 1/2 est plus grand que 1/4' },
      { text: 'Plus les parts sont grandes, moins il en faut !' },
    ],
    explanation: 'Imagine : couper un gâteau en 2 parts donne des parts plus grandes qu\'en couper en 4. 🎂',
    difficulty: 2,
    xp: 15,
  },

  // ==================== CM2 - CALCUL MENTAL ====================
  {
    id: '1Obs-men-1',
    level: '1Obs',
    topic: 'mental',
    title: 'Addition rapide',
    emoji: '➕',
    question: 'Combien font 47 + 28 ?',
    options: ['65', '75', '85', '70'],
    correctAnswer: '75',
    steps: [
      { text: 'On décompose : 47 = 40 + 7 et 28 = 20 + 8' },
      { text: 'On additionne les dizaines : 40 + 20 = 60' },
      { text: 'On additionne les unités : 7 + 8 = 15' },
      { text: 'On combine : 60 + 15 = 75' },
    ],
    explanation: 'Astuce : décompose en dizaines et unités pour calculer plus vite ! ⚡',
    difficulty: 1,
    xp: 10,
  },
  {
    id: '1Obs-men-2',
    level: '1Obs',
    topic: 'mental',
    title: 'Multiplication',
    emoji: '✖️',
    question: 'Combien font 7 × 8 ?',
    options: ['54', '56', '64', '48'],
    correctAnswer: '56',
    steps: [
      { text: '7 × 8 = ?' },
      { text: 'Astuce : 7 × 8 = 7 × (10 - 2) = 70 - 14' },
      { text: 'Résultat : 56' },
    ],
    explanation: '7 × 8 = 56. À connaître par cœur ! 🎯',
    difficulty: 1,
    xp: 10,
  },
  {
    id: '1Obs-men-3',
    level: '1Obs',
    topic: 'mental',
    title: 'Soustraction',
    emoji: '➖',
    question: 'Combien font 100 - 37 ?',
    options: ['63', '67', '57', '73'],
    correctAnswer: '63',
    steps: [
      { text: 'Méthode : 100 - 37 = 100 - 40 + 3' },
      { text: '100 - 40 = 60' },
      { text: '60 + 3 = 63' },
    ],
    explanation: 'Astucieux : soustraire un nombre rond puis ajuster ! 💡',
    difficulty: 2,
    xp: 15,
  },
  {
    id: '1Obs-men-4',
    level: '1Obs',
    topic: 'mental',
    title: 'Division',
    emoji: '➗',
    question: 'Combien font 56 ÷ 7 ?',
    options: ['6', '7', '8', '9'],
    correctAnswer: '8',
    steps: [
      { text: 'On cherche combien de fois 7 dans 56' },
      { text: '7 × 8 = 56' },
      { text: 'Donc 56 ÷ 7 = 8' },
    ],
    explanation: 'La division est l\'inverse de la multiplication. 7 × 8 = 56 ! 🎉',
    difficulty: 2,
    xp: 15,
  },

  // ==================== CM2 - NOMBRES ====================
  // Note: Les exercices d'abaques sont générés dynamiquement pour avoir une infinité d'exercices
  {
    id: '1Obs-num-2',
    level: '1Obs',
    topic: 'numbers',
    title: 'Décomposition additive',
    emoji: '➕',
    question: 'Quelle est la décomposition additive de 427 ?',
    options: ['400 + 20 + 7', '4 + 2 + 7', '420 + 7', '400 + 27'],
    correctAnswer: '400 + 20 + 7',
    steps: [
      { text: '427 se décompose en centaines, dizaines et unités' },
      { text: '4 centaines = 400' },
      { text: '2 dizaines = 20' },
      { text: '7 unités = 7' },
      { text: 'Donc 427 = 400 + 20 + 7' },
    ],
    explanation: 'La décomposition additive sépare chaque rang du nombre ! ✨',
    difficulty: 1,
    xp: 10,
  },
  {
    id: '1Obs-num-3',
    level: '1Obs',
    topic: 'numbers',
    title: 'Recomposer un nombre',
    emoji: '🔧',
    question: 'Quel nombre correspond à 500 + 30 + 4 ?',
    options: ['534', '543', '354', '435'],
    correctAnswer: '534',
    steps: [
      { text: '500 = 5 centaines' },
      { text: '30 = 3 dizaines' },
      { text: '4 = 4 unités' },
      { text: 'Donc 5 centaines, 3 dizaines, 4 unités = 534' },
    ],
    explanation: 'On additionne : 500 + 30 + 4 = 534 ! 🎉',
    difficulty: 1,
    xp: 10,
  },
  {
    id: '1Obs-num-4',
    level: '1Obs',
    topic: 'numbers',
    title: 'Décomposition multiplicative',
    emoji: '✖️',
    question: 'Quelle est la décomposition multiplicative de 326 ?',
    options: ['3×100 + 2×10 + 6×1', '3×10 + 2×100 + 6×1', '300×20×6', '3×26'],
    correctAnswer: '3×100 + 2×10 + 6×1',
    steps: [
      { text: '326 se décompose avec des multiplications' },
      { text: '3 centaines = 3 × 100' },
      { text: '2 dizaines = 2 × 10' },
      { text: '6 unités = 6 × 1' },
      { text: 'Donc 326 = 3×100 + 2×10 + 6×1' },
    ],
    explanation: 'La décomposition multiplicative utilise les puissances de 10 ! 💡',
    difficulty: 2,
    xp: 15,
  },
  {
    id: '1Obs-num-5',
    level: '1Obs',
    topic: 'numbers',
    title: 'Valeur d\'un chiffre',
    emoji: '🎯',
    question: 'Dans le nombre 458, quelle est la valeur du chiffre 5 ?',
    options: ['5', '50', '500', '5000'],
    correctAnswer: '50',
    steps: [
      { text: 'Dans 458, le chiffre 5 est en position des dizaines' },
      { text: 'Chaque position a une valeur : unités, dizaines, centaines...' },
      { text: 'Le 5 représente 5 dizaines' },
      { text: '5 dizaines = 5 × 10 = 50' },
    ],
    explanation: 'La valeur d\'un chiffre dépend de sa position ! 📊',
    difficulty: 2,
    xp: 15,
  },
  {
    id: '1Obs-num-6',
    level: '1Obs',
    topic: 'numbers',
    title: 'Lire les grands nombres',
    emoji: '📈',
    question: 'Comment lit-on le nombre 2 345 ?',
    options: ['Deux mille trois cent quarante-cinq', 'Vingt-trois cent quarante-cinq', 'Deux cent trente-quatre mille cinq', 'Mille deux cent trente-quatre'],
    correctAnswer: 'Deux mille trois cent quarante-cinq',
    steps: [
      { text: 'On sépare en groupes : 2 (milliers) et 345 (unités)' },
      { text: '2 = deux mille' },
      { text: '345 = trois cent quarante-cinq' },
      { text: 'Donc 2 345 = deux mille trois cent quarante-cinq' },
    ],
    explanation: 'Les grands nombres se lisent par groupes de 3 chiffres ! 📚',
    difficulty: 2,
    xp: 15,
  },
  {
    id: '1Obs-num-7',
    level: '1Obs',
    topic: 'numbers',
    title: 'Abaque et milliers',
    emoji: '🔢',
    question: 'Sur un abaque avec milliers, centaines, dizaines, unités : 2 milliers, 0 centaines, 5 dizaines, 3 unités = ?',
    options: ['2053', '2503', '20053', '253'],
    correctAnswer: '2053',
    steps: [
      { text: '2 milliers = 2 000' },
      { text: '0 centaines = 0' },
      { text: '5 dizaines = 50' },
      { text: '3 unités = 3' },
      { text: '2 000 + 0 + 50 + 3 = 2 053' },
    ],
    explanation: 'Attention au 0 centaines ! Le nombre est 2 053, pas 253 ! ⚠️',
    difficulty: 2,
    xp: 15,
  },
  {
    id: '1Obs-num-8',
    level: '1Obs',
    topic: 'numbers',
    title: 'Comparaison de nombres',
    emoji: '⚖️',
    question: 'Quel est le plus grand nombre entre 1 234 et 1 432 ?',
    options: ['1 234', '1 432', 'Ils sont égaux', 'On ne peut pas savoir'],
    correctAnswer: '1 432',
    steps: [
      { text: 'On compare chiffre par chiffre de gauche à droite' },
      { text: 'Les milliers sont identiques : 1 et 1' },
      { text: 'Les centaines : 2 < 4' },
      { text: 'Donc 1 432 est plus grand que 1 234' },
    ],
    explanation: 'On compare les chiffres à la même position en partant de la gauche ! 🎯',
    difficulty: 1,
    xp: 10,
  },
  {
    id: '1Obs-num-9',
    level: '1Obs',
    topic: 'numbers',
    title: 'Comparer avec des zéros',
    emoji: '⚖️',
    question: 'Quel est le plus grand : 3 005 ou 3 050 ?',
    options: ['3 005', '3 050', 'Ils sont égaux', 'On ne peut pas savoir'],
    correctAnswer: '3 050',
    steps: [
      { text: 'Les milliers sont identiques : 3 et 3' },
      { text: 'Les centaines : 0 et 0 (identiques)' },
      { text: 'Les dizaines : 0 < 5' },
      { text: 'Donc 3 050 est plus grand que 3 005' },
    ],
    explanation: 'Attention aux zéros ! Ils comptent comme les autres chiffres. 🎯',
    difficulty: 2,
    xp: 15,
  },
  {
    id: '1Obs-num-10',
    level: '1Obs',
    topic: 'numbers',
    title: 'Comparer des nombres à 4 chiffres',
    emoji: '⚖️',
    question: 'Range ces nombres du plus petit au plus grand : 4 567, 4 576, 4 657',
    options: ['4 567, 4 576, 4 657', '4 657, 4 576, 4 567', '4 576, 4 567, 4 657', '4 567, 4 657, 4 576'],
    correctAnswer: '4 567, 4 576, 4 657',
    steps: [
      { text: 'Les milliers sont identiques : 4' },
      { text: 'On compare les centaines : 5 < 6' },
      { text: '4 567 et 4 576 ont les mêmes centaines (5)' },
      { text: 'On compare les dizaines : 6 < 7' },
      { text: 'Donc : 4 567 < 4 576 < 4 657' },
    ],
    explanation: 'On compare position par position pour ranger les nombres ! 📊',
    difficulty: 2,
    xp: 15,
  },
  {
    id: '1Obs-num-11',
    level: '1Obs',
    topic: 'numbers',
    title: 'Symboles de comparaison',
    emoji: '⚖️',
    question: 'Quel symbole complète : 845 ___ 854 ?',
    options: ['<', '>', '=', '≠'],
    correctAnswer: '<',
    steps: [
      { text: 'On compare 845 et 854' },
      { text: 'Les centaines sont identiques : 8' },
      { text: 'Les dizaines : 4 < 5' },
      { text: 'Donc 845 est plus petit que 854' },
      { text: '845 < 854' },
    ],
    explanation: '< signifie "plus petit que", > signifie "plus grand que" ! 🔤',
    difficulty: 1,
    xp: 10,
  },
  {
    id: '1Obs-num-12',
    level: '1Obs',
    topic: 'numbers',
    title: 'Encadrer un nombre',
    emoji: '📏',
    question: 'Encadre 2 345 entre deux centaines consécutives :',
    options: ['2 300 < 2 345 < 2 400', '2 340 < 2 345 < 2 350', '2 000 < 2 345 < 3 000', '2 400 < 2 345 < 2 500'],
    correctAnswer: '2 300 < 2 345 < 2 400',
    steps: [
      { text: 'On cherche les centaines avant et après 2 345' },
      { text: '2 345 a 23 centaines' },
      { text: 'La centaine avant : 23 × 100 = 2 300' },
      { text: 'La centaine après : 24 × 100 = 2 400' },
      { text: 'Donc 2 300 < 2 345 < 2 400' },
    ],
    explanation: 'Encadrer signifie trouver le nombre juste avant et juste après ! 📏',
    difficulty: 2,
    xp: 15,
  },
  {
    id: '1Obs-num-13',
    level: '1Obs',
    topic: 'numbers',
    title: 'Comparer nombres de différentes longueurs',
    emoji: '⚖️',
    question: 'Quel est le plus grand : 999 ou 1 000 ?',
    options: ['999', '1 000', 'Ils sont égaux', 'On ne peut pas savoir'],
    correctAnswer: '1 000',
    steps: [
      { text: '999 a 3 chiffres' },
      { text: '1 000 a 4 chiffres' },
      { text: 'Un nombre avec plus de chiffres est plus grand' },
      { text: 'Donc 1 000 > 999' },
    ],
    explanation: 'Le nombre de chiffres compte d\'abord ! 4 chiffres > 3 chiffres. 🎯',
    difficulty: 1,
    xp: 10,
  },
  {
    id: '1Obs-num-14',
    level: '1Obs',
    topic: 'numbers',
    title: 'Intercaler un nombre',
    emoji: '🔢',
    question: 'Quel nombre peut s\'intercaler entre 450 et 460 ?',
    options: ['449', '461', '455', '440'],
    correctAnswer: '455',
    steps: [
      { text: 'On cherche un nombre entre 450 et 460' },
      { text: '449 < 450 (trop petit)' },
      { text: '461 > 460 (trop grand)' },
      { text: '440 < 450 (trop petit)' },
      { text: '455 est bien entre 450 et 460' },
    ],
    explanation: 'Intercaler = trouver un nombre qui se situe entre deux autres ! 🔢',
    difficulty: 2,
    xp: 15,
  },
  {
    id: '1Obs-num-15',
    level: '1Obs',
    topic: 'numbers',
    title: 'Comparer des milliers',
    emoji: '⚖️',
    question: 'Quel est le plus petit : 2 500, 3 000 ou 1 999 ?',
    options: ['2 500', '3 000', '1 999', 'Ils sont égaux'],
    correctAnswer: '1 999',
    steps: [
      { text: 'On compare les milliers d\'abord' },
      { text: '2 500 a 2 milliers' },
      { text: '3 000 a 3 milliers' },
      { text: '1 999 a 1 millier' },
      { text: '1 < 2 < 3, donc 1 999 est le plus petit' },
    ],
    explanation: 'On compare d\'abord le nombre de chiffres, puis les milliers ! 📊',
    difficulty: 2,
    xp: 15,
  },

  // ==================== 1PHASE - GÉOMÉTRIE ====================
  {
    id: '1phase-geo-1',
    level: '1phase',
    topic: 'geometry',
    title: 'Aire du triangle',
    emoji: '🔺',
    question: 'Un triangle a une base de 10 cm et une hauteur de 6 cm. Quelle est son aire ?',
    options: ['30 cm²', '60 cm²', '16 cm²', '20 cm²'],
    correctAnswer: '30 cm²',
    steps: [
      { text: 'L\'aire d\'un triangle = (base × hauteur) ÷ 2', formula: 'A = (b × h) / 2' },
      { text: 'On remplace : A = (10 × 6) / 2', formula: 'A = 60 / 2' },
      { text: 'Résultat', formula: 'A = 30 cm²' },
    ],
    explanation: 'Un triangle, c\'est la moitié d\'un rectangle ! On n\'oublie pas le ÷ 2. 📏',
    visual: { type: 'triangle', width: 120, height: 100, labels: [{ text: '10 cm', x: 60, y: 110 }, { text: '6 cm', x: -10, y: 50 }] },
    difficulty: 2,
    xp: 15,
  },
  {
    id: '1phase-geo-2',
    level: '1phase',
    topic: 'geometry',
    title: 'Somme des angles',
    emoji: '📐',
    question: 'Combien mesure la somme des angles d\'un triangle ?',
    options: ['90°', '180°', '270°', '360°'],
    correctAnswer: '180°',
    steps: [
      { text: 'Propriété fondamentale d\'un triangle' },
      { text: 'Quel que soit le triangle (équilatéral, isocèle, rectangle...)' },
      { text: 'La somme des 3 angles = 180°' },
    ],
    explanation: 'C\'est une règle d\'or en géométrie ! Toujours 180°. ⭐',
    difficulty: 1,
    xp: 10,
  },
  {
    id: '1phase-geo-3',
    level: '1phase',
    topic: 'geometry',
    title: 'Symétrie axiale',
    emoji: '🦋',
    question: 'Une symétrie axiale est une symétrie par rapport à :',
    options: ['un point', 'une droite', 'un cercle', 'un angle'],
    correctAnswer: 'une droite',
    steps: [
      { text: 'La symétrie axiale s\'appuie sur un axe' },
      { text: 'Cet axe est une droite' },
      { text: 'Chaque point a son symétrique de l\'autre côté de la droite' },
    ],
    explanation: 'L\'axe de symétrie, c\'est la "ligne miroir" ! 🪞',
    difficulty: 2,
    xp: 15,
  },
  {
    id: '1phase-geo-4',
    level: '1phase',
    topic: 'geometry',
    title: 'Périmètre du cercle',
    emoji: '⭕',
    question: 'Le périmètre d\'un cercle de rayon 5 cm est (π ≈ 3,14) :',
    options: ['15,7 cm', '31,4 cm', '78,5 cm', '10 cm'],
    correctAnswer: '31,4 cm',
    steps: [
      { text: 'Formule : Périmètre = 2 × π × r', formula: 'P = 2 × π × r' },
      { text: 'On remplace : P = 2 × 3,14 × 5', formula: 'P = 6,28 × 5' },
      { text: 'Résultat', formula: 'P = 31,4 cm' },
    ],
    explanation: 'Le périmètre du cercle s\'appelle aussi la circonférence ! 🌐',
    difficulty: 3,
    xp: 20,
  },

  // ==================== 1PHASE - FRACTIONS ====================
  {
    id: '1phase-frac-1',
    level: '1phase',
    topic: 'fractions',
    title: 'Multiplication de fractions',
    emoji: '🍰',
    question: 'Calcule : 2/3 × 4/5 = ?',
    options: ['6/8', '8/15', '6/15', '8/8'],
    correctAnswer: '8/15',
    steps: [
      { text: 'On multiplie les numérateurs entre eux', formula: '2 × 4 = 8' },
      { text: 'On multiplie les dénominateurs entre eux', formula: '3 × 5 = 15' },
      { text: 'Résultat : 8/15 (irréductible)' },
    ],
    explanation: 'Multiplier des fractions : numérateur × numérateur et dénominateur × dénominateur ! 🎯',
    difficulty: 3,
    xp: 20,
  },
  {
    id: '1phase-frac-2',
    level: '1phase',
    topic: 'fractions',
    title: 'Simplifier une fraction',
    emoji: '✂️',
    question: 'Simplifie la fraction 6/9 :',
    options: ['1/3', '2/3', '3/4', '6/3'],
    correctAnswer: '2/3',
    steps: [
      { text: 'On cherche le PGCD de 6 et 9 : c\'est 3' },
      { text: 'On divise le numérateur et le dénominateur par 3', formula: '6 ÷ 3 = 2 ; 9 ÷ 3 = 3' },
      { text: 'Résultat : 2/3' },
    ],
    explanation: 'Simplifier rend les fractions plus faciles à manipuler ! ✨',
    difficulty: 2,
    xp: 15,
  },
  {
    id: '1phase-frac-3',
    level: '1phase',
    topic: 'fractions',
    title: 'Fractions et nombres décimaux',
    emoji: '🔢',
    question: 'Convertis 3/4 en nombre décimal :',
    options: ['0,34', '0,75', '0,50', '0,25'],
    correctAnswer: '0,75',
    steps: [
      { text: 'Pour convertir, on divise le numérateur par le dénominateur', formula: '3 ÷ 4' },
      { text: '3 ÷ 4 = 0,75' },
      { text: 'Donc 3/4 = 0,75' },
    ],
    explanation: 'Astuce : 3/4 = 75/100 = 0,75 ! 💡',
    difficulty: 2,
    xp: 15,
  },
  {
    id: '1phase-frac-4',
    level: '1phase',
    topic: 'fractions',
    title: 'Addition de fractions différentes',
    emoji: '🥧',
    question: 'Calcule : 1/2 + 1/4 = ?',
    options: ['2/6', '3/4', '2/4', '1/6'],
    correctAnswer: '3/4',
    steps: [
      { text: 'Les dénominateurs sont différents : 2 et 4' },
      { text: 'On met au même dénominateur : 1/2 = 2/4', formula: '1/2 = 2/4' },
      { text: 'On additionne : 2/4 + 1/4 = 3/4' },
    ],
    explanation: 'Pour additionner, il faut le même dénominateur ! 🎯',
    visual: { type: 'fraction-bar', numerator: 3, denominator: 4 },
    difficulty: 3,
    xp: 20,
  },

  // ==================== 1PHASE - CALCUL MENTAL ====================
  {
    id: '1phase-men-1',
    level: '1phase',
    topic: 'mental',
    title: 'Priorités opératoires',
    emoji: '🔢',
    question: 'Calcule : 2 + 3 × 4 = ?',
    options: ['20', '14', '24', '11'],
    correctAnswer: '14',
    steps: [
      { text: 'La multiplication est prioritaire sur l\'addition' },
      { text: 'On calcule d\'abord : 3 × 4 = 12', formula: '3 × 4 = 12' },
      { text: 'Puis : 2 + 12 = 14' },
    ],
    explanation: 'Règle : × et ÷ avant + et − . Toujours ! ⚡',
    difficulty: 2,
    xp: 15,
  },
  {
    id: '1phase-men-2',
    level: '1phase',
    topic: 'mental',
    title: 'Multiplication astucieuse',
    emoji: '✨',
    question: 'Calcule astucieusement : 25 × 8 = ?',
    options: ['100', '200', '150', '125'],
    correctAnswer: '200',
    steps: [
      { text: 'Astuce : 25 × 8 = 25 × (4 × 2)' },
      { text: '25 × 4 = 100' },
      { text: '100 × 2 = 200' },
    ],
    explanation: 'Décomposer pour simplifier, c\'est la clé du calcul mental ! 🔑',
    difficulty: 2,
    xp: 15,
  },
  {
    id: '1phase-men-3',
    level: '1phase',
    topic: 'mental',
    title: 'Nombres décimaux',
    emoji: '💯',
    question: 'Combien font 0,5 + 0,25 ?',
    options: ['0,30', '0,75', '0,55', '0,80'],
    correctAnswer: '0,75',
    steps: [
      { text: '0,5 = 0,50 (même nombre de chiffres après la virgule)' },
      { text: '0,50 + 0,25 = 0,75' },
    ],
    explanation: 'On aligne bien les virgules pour additionner ! 📊',
    difficulty: 1,
    xp: 10,
  },
  {
    id: '1phase-men-4',
    level: '1phase',
    topic: 'mental',
    title: 'Pourcentages simples',
    emoji: '💯',
    question: '10% de 80 = ?',
    options: ['8', '10', '18', '80'],
    correctAnswer: '8',
    steps: [
      { text: '10% d\'un nombre = ce nombre ÷ 10' },
      { text: '80 ÷ 10 = 8' },
      { text: 'Donc 10% de 80 = 8' },
    ],
    explanation: 'Astuce : 10%, c\'est diviser par 10. Comme 50% c\'est diviser par 2 ! 🎯',
    difficulty: 2,
    xp: 15,
  },

  // ==================== 1PHASE - NOMBRES ====================
  {
    id: '1phase-num-1',
    level: '1phase',
    topic: 'numbers',
    title: 'Comparaison de nombres décimaux',
    emoji: '⚖️',
    question: 'Quel est le plus grand : 3,45 ou 3,54 ?',
    options: ['3,54', '3,45', 'Ils sont égaux', 'On ne peut pas savoir'],
    correctAnswer: '3,54',
    steps: [
      { text: 'On compare les unités : 3 = 3' },
      { text: 'Puis les dixièmes : 4 < 5' },
      { text: 'Donc 3,54 > 3,45' },
    ],
    explanation: 'On compare d’abord les dixièmes : 5 dixièmes est plus grand que 4. ✨',
    difficulty: 1,
    xp: 10,
  },
  {
    id: '1phase-num-2',
    level: '1phase',
    topic: 'numbers',
    title: 'Écriture décimale',
    emoji: '📝',
    question: 'Comment écrit-on 6 unités et 7 dixièmes ?',
    options: ['6,7', '6,07', '0,67', '67'],
    correctAnswer: '6,7',
    steps: [
      { text: '6 unités = 6' },
      { text: '7 dixièmes = 0,7' },
      { text: 'Donc 6 + 0,7 = 6,7' },
    ],
    explanation: '7 dixièmes s’écrit 0,7. On met donc 6,7. 🎯',
    difficulty: 1,
    xp: 10,
  },
  {
    id: '1phase-num-3',
    level: '1phase',
    topic: 'numbers',
    title: 'Valeur d’un chiffre',
    emoji: '🔍',
    question: 'Dans 12,34, quelle est la valeur du chiffre 3 ?',
    options: ['0,3', '3', '0,03', '30'],
    correctAnswer: '0,3',
    steps: [
      { text: 'Le chiffre 3 est à la position des dixièmes' },
      { text: 'Donc il représente 3 dixièmes' },
      { text: '3 dixièmes = 0,3' },
    ],
    explanation: 'Le 3 est au rang des dixièmes, il vaut 3 × 0,1 = 0,3. 💡',
    difficulty: 2,
    xp: 15,
  },
  {
    id: '1phase-num-4',
    level: '1phase',
    topic: 'numbers',
    title: 'Décomposition décimale',
    emoji: '➕',
    question: 'Quelle est la décomposition de 5,67 ?',
    options: ['5 + 0,6 + 0,07', '5 + 0,6 + 0,7', '5 + 6 + 7', '5 + 0,67'],
    correctAnswer: '5 + 0,6 + 0,07',
    steps: [
      { text: '5 unités = 5' },
      { text: '6 dixièmes = 0,6' },
      { text: '7 centièmes = 0,07' },
      { text: 'Donc 5,67 = 5 + 0,6 + 0,07' },
    ],
    explanation: 'On sépare unités, dixièmes et centièmes. ✨',
    difficulty: 2,
    xp: 15,
  },
  {
    id: '1phase-num-5',
    level: '1phase',
    topic: 'numbers',
    title: 'Addition de décimaux',
    emoji: '➕',
    question: 'Calcule : 1,2 + 0,35',
    options: ['1,55', '1,37', '1,7', '0,47'],
    correctAnswer: '1,55',
    steps: [
      { text: '1,2 = 1,20' },
      { text: 'On aligne : 1,20 + 0,35' },
      { text: '1,20 + 0,35 = 1,55' },
    ],
    explanation: 'On aligne les virgules : 1,20 + 0,35 = 1,55. 📊',
    difficulty: 2,
    xp: 15,
  },

  // ==================== 5ÈME - GÉOMÉTRIE ====================
  {
    id: '5eme-geo-1',
    level: '5eme',
    topic: 'geometry',
    title: 'Théorème de Pythagore',
    emoji: '📐',
    question: 'Un triangle rectangle a des côtés 3, 4 et x. Trouve x (hypoténuse) :',
    options: ['5', '6', '7', '1'],
    correctAnswer: '5',
    steps: [
      { text: 'Théorème : a² + b² = c² (c = hypoténuse)', formula: 'a² + b² = c²' },
      { text: 'On applique : 3² + 4² = c²', formula: '9 + 16 = c²' },
      { text: '25 = c², donc c = √25 = 5' },
    ],
    explanation: '3, 4, 5 : le triplet pythagoricien le plus célèbre ! 🏛️',
    visual: { type: 'triangle', width: 100, height: 80, labels: [{ text: '3', x: -10, y: 40 }, { text: '4', x: 50, y: 90 }, { text: 'x', x: 50, y: 40 }] },
    difficulty: 3,
    xp: 20,
  },
  {
    id: '5eme-geo-2',
    level: '5eme',
    topic: 'geometry',
    title: 'Aire du parallélogramme',
    emoji: '▱',
    question: 'Aire d\'un parallélogramme de base 8 cm et hauteur 5 cm :',
    options: ['40 cm²', '13 cm²', '26 cm²', '30 cm²'],
    correctAnswer: '40 cm²',
    steps: [
      { text: 'Formule : Aire = base × hauteur', formula: 'A = b × h' },
      { text: 'A = 8 × 5', formula: 'A = 40 cm²' },
    ],
    explanation: 'Un parallélogramme, c\'est un rectangle "penché" ! La hauteur est perpendiculaire à la base. 📏',
    difficulty: 2,
    xp: 15,
  },
  {
    id: '5eme-geo-3',
    level: '5eme',
    topic: 'geometry',
    title: 'Angles et triangles',
    emoji: '📐',
    question: 'Dans un triangle isocèle, les angles à la base sont :',
    options: ['égaux', 'complémentaires', 'supplémentaires', 'droits'],
    correctAnswer: 'égaux',
    steps: [
      { text: 'Un triangle isocèle a 2 côtés égaux' },
      { text: 'Les angles opposés à ces côtés égaux' },
      { text: 'Sont eux aussi égaux !' },
    ],
    explanation: 'C\'est la propriété fondamentale des triangles isocèles ! 📚',
    difficulty: 2,
    xp: 15,
  },
  {
    id: '5eme-geo-4',
    level: '5eme',
    topic: 'geometry',
    title: 'Volume du pavé',
    emoji: '📦',
    question: 'Volume d\'un pavé 5×3×2 cm :',
    options: ['10 cm³', '30 cm³', '15 cm³', '25 cm³'],
    correctAnswer: '30 cm³',
    steps: [
      { text: 'Formule : V = Longueur × largeur × hauteur', formula: 'V = L × l × h' },
      { text: 'V = 5 × 3 × 2', formula: 'V = 30 cm³' },
    ],
    explanation: 'Imagine empiler des petits cubes de 1 cm³ ! 📦',
    difficulty: 2,
    xp: 15,
  },

  // ==================== 5ÈME - FRACTIONS ====================
  {
    id: '5eme-frac-1',
    level: '5eme',
    topic: 'fractions',
    title: 'Division de fractions',
    emoji: '➗',
    question: 'Calcule : 2/3 ÷ 4/5 = ?',
    options: ['8/15', '10/12', '5/6', '15/8'],
    correctAnswer: '5/6',
    steps: [
      { text: 'Diviser par une fraction = multiplier par son inverse' },
      { text: '2/3 ÷ 4/5 = 2/3 × 5/4', formula: '2/3 × 5/4' },
      { text: '= 10/12 = 5/6 (après simplification)' },
    ],
    explanation: 'Le secret : "diviser = multiplier par l\'inverse" ! 🔄',
    difficulty: 3,
    xp: 20,
  },
  {
    id: '5eme-frac-2',
    level: '5eme',
    topic: 'fractions',
    title: 'Addition complexe',
    emoji: '🔢',
    question: 'Calcule : 2/3 + 1/6 = ?',
    options: ['3/9', '5/6', '4/6', '1/2'],
    correctAnswer: '5/6',
    steps: [
      { text: 'Dénominateur commun : PPCM(3, 6) = 6' },
      { text: '2/3 = 4/6', formula: '2/3 = 4/6' },
      { text: '4/6 + 1/6 = 5/6' },
    ],
    explanation: 'On met tout au même dénominateur avant d\'additionner ! 🎯',
    difficulty: 3,
    xp: 20,
  },
  {
    id: '5eme-frac-3',
    level: '5eme',
    topic: 'fractions',
    title: 'Pourcentages',
    emoji: '💯',
    question: 'Calcule 25% de 60 :',
    options: ['12', '15', '20', '25'],
    correctAnswer: '15',
    steps: [
      { text: '25% = 25/100 = 1/4' },
      { text: 'Donc 25% de 60 = 60 ÷ 4', formula: '60 / 4 = 15' },
    ],
    explanation: '25% c\'est le quart ! Divise par 4. 💡',
    difficulty: 2,
    xp: 15,
  },
  {
    id: '5eme-frac-4',
    level: '5eme',
    topic: 'fractions',
    title: 'Fractions et proportionnalité',
    emoji: '⚖️',
    question: 'Si 3 cahiers coûtent 6€, combien coûtent 5 cahiers ?',
    options: ['9€', '10€', '12€', '15€'],
    correctAnswer: '10€',
    steps: [
      { text: 'C\'est de la proportionnalité' },
      { text: 'Prix d\'un cahier : 6 ÷ 3 = 2€' },
      { text: '5 cahiers : 5 × 2 = 10€' },
    ],
    explanation: 'Le prix par cahier est constant, c\'est la proportionnalité ! ⚖️',
    difficulty: 3,
    xp: 20,
  },

  // ==================== 5ÈME - CALCUL MENTAL ====================
  {
    id: '5eme-men-1',
    level: '5eme',
    topic: 'mental',
    title: 'Nombres relatifs',
    emoji: '🌡️',
    question: 'Calcule : (-5) + 8 = ?',
    options: ['-13', '3', '13', '-3'],
    correctAnswer: '3',
    steps: [
      { text: 'On additionne des nombres relatifs' },
      { text: '8 et -5 : on prend le signe du plus grand (positif)' },
      { text: 'On fait la différence : 8 - 5 = 3' },
    ],
    explanation: 'Astuce : le signe du plus grand nombre l\'emporte ! 🎯',
    difficulty: 2,
    xp: 15,
  },
  {
    id: '5eme-men-2',
    level: '5eme',
    topic: 'mental',
    title: 'Puissances',
    emoji: '⚡',
    question: 'Combien font 2³ ?',
    options: ['6', '8', '9', '12'],
    correctAnswer: '8',
    steps: [
      { text: '2³ = 2 × 2 × 2' },
      { text: '2 × 2 = 4' },
      { text: '4 × 2 = 8' },
    ],
    explanation: 'Les puissances : 2⁴ = 16, 2⁵ = 32... à connaître ! 📚',
    difficulty: 2,
    xp: 15,
  },
  {
    id: '5eme-men-3',
    level: '5eme',
    topic: 'mental',
    title: 'Multiplications astucieuses',
    emoji: '🧠',
    question: 'Calcule : 99 × 7 = ?',
    options: ['693', '700', '6930', '703'],
    correctAnswer: '693',
    steps: [
      { text: 'Astuce : 99 × 7 = (100 - 1) × 7' },
      { text: '= 700 - 7', formula: '700 - 7' },
      { text: '= 693' },
    ],
    explanation: 'Multiplier par 99 = multiplier par 100 puis soustraire ! ✨',
    difficulty: 3,
    xp: 20,
  },
  {
    id: '5eme-men-4',
    level: '5eme',
    topic: 'mental',
    title: 'Calcul de durée',
    emoji: '⏰',
    question: 'Si il est 14h35 et on ajoute 1h45, quelle heure est-il ?',
    options: ['15h80', '16h20', '15h20', '16h80'],
    correctAnswer: '16h20',
    steps: [
      { text: 'On additionne les heures : 14h + 1h = 15h' },
      { text: 'On additionne les minutes : 35 + 45 = 80 minutes' },
      { text: '80 minutes = 1h20 → 15h + 1h20 = 16h20' },
    ],
    explanation: 'N\'oublie pas : 60 minutes = 1 heure ! ⏰',
    difficulty: 3,
    xp: 20,
  },
];

// ==================== GÉNÉRATEURS D'EXERCICES ====================

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

function makeId(topic: Topic, level: Level): string {
  return `generated-${topic}-${level}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function makeOptions(correct: string, distractors: string[]): string[] {
  const unique = new Set([correct, ...distractors]);
  return shuffle(Array.from(unique)).slice(0, 4);
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

// ---------- GÉOMÉTRIE ----------
function generateGeometryExercise(level: Level): Exercise {
  const id = makeId('geometry', level);

  if (level === '1Obs') {
    const side = generateRandomNumber(3, 12);
    const perimeter = side * 4;
    const correct = `${perimeter} cm`;
    return {
      id,
      level,
      topic: 'geometry',
      title: 'Périmètre du carré',
      emoji: '⬜',
      question: `Un carré a un côté de ${side} cm. Quel est son périmètre ?`,
      options: makeOptions(correct, [`${side * 2} cm`, `${side * 3} cm`, `${side * 5} cm`]),
      correctAnswer: correct,
      steps: [
        { text: 'Le périmètre d\'un carré = côté × 4', formula: 'P = c × 4' },
        { text: `On remplace : P = ${side} × 4`, formula: `P = ${side} × 4` },
        { text: 'On calcule le produit', formula: `P = ${perimeter} cm` },
      ],
      explanation: `Un carré a 4 côtés égaux. Donc ${side} × 4 = ${perimeter} cm. Bravo ! 🎉`,
      visual: { type: 'rectangle', width: 100, height: 100, labels: [{ text: `${side} cm`, x: 50, y: -8 }] },
      difficulty: 1,
      xp: 10,
    };
  }

  if (level === '1phase') {
    const base = generateRandomNumber(6, 20);
    const height = generateRandomNumber(3, 15);
    const area = (base * height) / 2;
    const correct = `${area} cm²`;
    return {
      id,
      level,
      topic: 'geometry',
      title: 'Aire du triangle',
      emoji: '🔺',
      question: `Un triangle a une base de ${base} cm et une hauteur de ${height} cm. Quelle est son aire ?`,
      options: makeOptions(correct, [`${base * height} cm²`, `${base + height} cm²`, `${(base + height) / 2} cm²`]),
      correctAnswer: correct,
      steps: [
        { text: 'L\'aire d\'un triangle = (base × hauteur) ÷ 2', formula: 'A = (b × h) / 2' },
        { text: `On remplace : A = (${base} × ${height}) / 2`, formula: `A = ${base * height} / 2` },
        { text: 'Résultat', formula: `A = ${area} cm²` },
      ],
      explanation: `Un triangle, c'est la moitié d'un rectangle ! (${base} × ${height}) ÷ 2 = ${area} cm². 📏`,
      visual: { type: 'triangle', width: 120, height: 100, labels: [{ text: `${base} cm`, x: 60, y: 110 }, { text: `${height} cm`, x: -10, y: 50 }] },
      difficulty: 2,
      xp: 15,
    };
  }

  // 5ème
  const triples = [
    [3, 4, 5],
    [5, 12, 13],
    [6, 8, 10],
    [8, 15, 17],
    [7, 24, 25],
    [9, 12, 15],
  ];
  const [a, b, c] = triples[generateRandomNumber(0, triples.length - 1)];
  const correct = `${c}`;
  return {
    id,
    level,
    topic: 'geometry',
    title: 'Théorème de Pythagore',
    emoji: '📐',
    question: `Un triangle rectangle a des côtés ${a}, ${b} et x. Trouve x (hypoténuse) :`,
    options: makeOptions(correct, [`${a + b}`, `${Math.abs(a - b)}`, `${a * b}`]),
    correctAnswer: correct,
    steps: [
      { text: 'Théorème : a² + b² = c² (c = hypoténuse)', formula: 'a² + b² = c²' },
      { text: `On applique : ${a}² + ${b}² = c²`, formula: `${a * a} + ${b * b} = c²` },
      { text: `${a * a + b * b} = c², donc c = √${a * a + b * b} = ${c}`, formula: `c = ${c}` },
    ],
    explanation: `${a}, ${b}, ${c} : un triplet pythagoricien ! 🏛️`,
    visual: { type: 'triangle', width: 100, height: 80, labels: [{ text: `${a}`, x: -10, y: 40 }, { text: `${b}`, x: 50, y: 90 }, { text: 'x', x: 50, y: 40 }] },
    difficulty: 3,
    xp: 20,
  };
}

// ---------- FRACTIONS ----------
function generateFractionsExercise(level: Level): Exercise {
  const id = makeId('fractions', level);

  if (level === '1Obs') {
    const denominator = generateRandomNumber(2, 6);
    const a = generateRandomNumber(1, denominator - 1);
    const b = generateRandomNumber(1, denominator - 1);
    const sum = a + b;
    const correct = `${sum}/${denominator}`;
    return {
      id,
      level,
      topic: 'fractions',
      title: 'Addition de fractions',
      emoji: '🥧',
      question: `Calcule : ${a}/${denominator} + ${b}/${denominator} = ?`,
      options: makeOptions(correct, [`${sum}/${denominator * 2}`, `${a + b}/${denominator + denominator}`, `${sum}/${Math.max(1, denominator - 1)}`]),
      correctAnswer: correct,
      steps: [
        { text: `Les dénominateurs sont identiques (${denominator})` },
        { text: 'On additionne les numérateurs', formula: `${a} + ${b} = ${sum}` },
        { text: 'Résultat', formula: `${a}/${denominator} + ${b}/${denominator} = ${sum}/${denominator}` },
      ],
      explanation: `Comme les parts ont la même taille, on ajoute juste les numérateurs : ${sum}/${denominator} ! 👍`,
      visual: { type: 'fraction-bar', numerator: sum, denominator: denominator },
      difficulty: 2,
      xp: 15,
    };
  }

  if (level === '1phase') {
    const a = generateRandomNumber(2, 5);
    const b = generateRandomNumber(2, 5);
    const c = generateRandomNumber(2, 5);
    const d = generateRandomNumber(2, 5);
    const num = a * c;
    const den = b * d;
    const correct = `${num}/${den}`;
    return {
      id,
      level,
      topic: 'fractions',
      title: 'Multiplication de fractions',
      emoji: '🍰',
      question: `Calcule : ${a}/${b} × ${c}/${d} = ?`,
      options: makeOptions(correct, [`${a + c}/${b + d}`, `${a * d}/${b * c}`, `${a + b}/${c + d}`]),
      correctAnswer: correct,
      steps: [
        { text: 'On multiplie les numérateurs entre eux', formula: `${a} × ${c} = ${num}` },
        { text: 'On multiplie les dénominateurs entre eux', formula: `${b} × ${d} = ${den}` },
        { text: 'Résultat', formula: `${a}/${b} × ${c}/${d} = ${num}/${den}` },
      ],
      explanation: `Multiplier des fractions : numérateur × numérateur et dénominateur × dénominateur ! ${num}/${den}. 🎯`,
      difficulty: 3,
      xp: 20,
    };
  }

  // 5ème
  const a = generateRandomNumber(2, 6);
  const b = generateRandomNumber(2, 6);
  const c = generateRandomNumber(2, 6);
  const d = generateRandomNumber(2, 6);
  const num = a * d;
  const den = b * c;
  const divisor = gcd(num, den);
  const simpleNum = num / divisor;
  const simpleDen = den / divisor;
  const correct = `${simpleNum}/${simpleDen}`;
  return {
    id,
    level,
    topic: 'fractions',
    title: 'Division de fractions',
    emoji: '➗',
    question: `Calcule : ${a}/${b} ÷ ${c}/${d} = ?`,
    options: makeOptions(correct, [`${a * c}/${b * d}`, `${a}/${d} × ${c}/${b}`, `${a + c}/${b + d}`]),
    correctAnswer: correct,
    steps: [
      { text: 'Diviser par une fraction = multiplier par son inverse' },
      { text: `On retourne la deuxième fraction : ${a}/${b} × ${d}/${c}`, formula: `${a}/${b} × ${d}/${c}` },
      { text: 'Résultat', formula: `${a}/${b} ÷ ${c}/${d} = ${simpleNum}/${simpleDen}` },
    ],
    explanation: `Le secret : "diviser = multiplier par l'inverse" ! ${a}/${b} ÷ ${c}/${d} = ${simpleNum}/${simpleDen}. 🔄`,
    difficulty: 3,
    xp: 20,
  };
}

// ---------- CALCUL MENTAL ----------
function generateMentalExercise(level: Level): Exercise {
  const id = makeId('mental', level);

  if (level === '1Obs') {
    const ops = ['add', 'mul', 'sub', 'div'] as const;
    const op = ops[generateRandomNumber(0, ops.length - 1)];

    if (op === 'add') {
      const a = generateRandomNumber(10, 80);
      const b = generateRandomNumber(10, 80);
      const correct = `${a + b}`;
      return {
        id,
        level,
        topic: 'mental',
        title: 'Addition rapide',
        emoji: '➕',
        question: `Combien font ${a} + ${b} ?`,
        options: makeOptions(correct, [`${a + b + 10}`, `${a + b - 10}`, `${a + b + 1}`]),
        correctAnswer: correct,
        steps: [
          { text: `On additionne les deux nombres`, formula: `${a} + ${b} = ${a + b}` },
        ],
        explanation: `${a} + ${b} = ${a + b}. Astuce : décompose en dizaines et unités ! ⚡`,
        difficulty: 1,
        xp: 10,
      };
    }

    if (op === 'mul') {
      const a = generateRandomNumber(2, 9);
      const b = generateRandomNumber(2, 9);
      const correct = `${a * b}`;
      return {
        id,
        level,
        topic: 'mental',
        title: 'Multiplication',
        emoji: '✖️',
        question: `Combien font ${a} × ${b} ?`,
        options: makeOptions(correct, [`${a * b + a}`, `${a * b - a}`, `${a + b}`]),
        correctAnswer: correct,
        steps: [
          { text: `On connaît cette table`, formula: `${a} × ${b} = ${a * b}` },
        ],
        explanation: `${a} × ${b} = ${a * b}. À connaître par cœur ! 🎯`,
        difficulty: 1,
        xp: 10,
      };
    }

    if (op === 'sub') {
      const a = generateRandomNumber(20, 80);
      const correct = `${100 - a}`;
      return {
        id,
        level,
        topic: 'mental',
        title: 'Soustraction',
        emoji: '➖',
        question: `Combien font 100 - ${a} ?`,
        options: makeOptions(correct, [`${100 - a - 10}`, `${100 - a + 10}`, `${a}`]),
        correctAnswer: correct,
        steps: [
          { text: `100 - ${a} = ${100 - a}`, formula: `100 - ${a} = ${100 - a}` },
        ],
        explanation: `100 - ${a} = ${100 - a}. Soustraire un nombre rond puis ajuster ! 💡`,
        difficulty: 2,
        xp: 15,
      };
    }

    // div
    const b = generateRandomNumber(2, 9);
    const c = generateRandomNumber(2, 9);
    const a = b * c;
    const correct = `${c}`;
    return {
      id,
      level,
      topic: 'mental',
      title: 'Division',
      emoji: '➗',
      question: `Combien font ${a} ÷ ${b} ?`,
      options: makeOptions(correct, [`${c + 1}`, `${c - 1}`, `${b}`]),
      correctAnswer: correct,
      steps: [
        { text: `On cherche combien de fois ${b} dans ${a}` },
        { text: `${b} × ${c} = ${a}`, formula: `${b} × ${c} = ${a}` },
      ],
      explanation: `${a} ÷ ${b} = ${c}. La division est l'inverse de la multiplication. 🎉`,
      difficulty: 2,
      xp: 15,
    };
  }

  if (level === '1phase') {
    const ops = ['prio', 'trick', 'percent'] as const;
    const op = ops[generateRandomNumber(0, ops.length - 1)];

    if (op === 'prio') {
      const a = generateRandomNumber(2, 20);
      const b = generateRandomNumber(2, 9);
      const c = generateRandomNumber(2, 9);
      const correct = `${a + b * c}`;
      return {
        id,
        level,
        topic: 'mental',
        title: 'Priorités opératoires',
        emoji: '🔢',
        question: `Calcule : ${a} + ${b} × ${c} = ?`,
        options: makeOptions(correct, [`${(a + b) * c}`, `${a * b + c}`, `${a + b + c}`]),
        correctAnswer: correct,
        steps: [
          { text: 'La multiplication est prioritaire sur l\'addition' },
          { text: `On calcule d'abord : ${b} × ${c} = ${b * c}`, formula: `${b} × ${c} = ${b * c}` },
          { text: `Puis : ${a} + ${b * c} = ${a + b * c}`, formula: `${a} + ${b * c} = ${a + b * c}` },
        ],
        explanation: `Règle : × avant +. Donc ${a} + ${b} × ${c} = ${a + b * c}. ⚡`,
        difficulty: 2,
        xp: 15,
      };
    }

    if (op === 'trick') {
      const a = generateRandomNumber(2, 9);
      const correct = `${25 * a}`;
      return {
        id,
        level,
        topic: 'mental',
        title: 'Multiplication astucieuse',
        emoji: '✨',
        question: `Calcule astucieusement : 25 × ${a} = ?`,
        options: makeOptions(correct, [`${25 + a}`, `${100 + a * 25}`, `${100 - 25 + a}`]),
        correctAnswer: correct,
        steps: [
          { text: 'Astuce : 25 × 4 = 100' },
          { text: `25 × ${a} = 25 × (4 × ${a / 4 > 0 ? a / 4 : a})`, formula: `25 × ${a} = ${25 * a}` },
        ],
        explanation: `25 × ${a} = ${25 * a}. Décomposer pour simplifier ! 🔑`,
        difficulty: 2,
        xp: 15,
      };
    }

    const x = generateRandomNumber(10, 100);
    const correct = `${x / 10}`;
    return {
      id,
      level,
      topic: 'mental',
      title: 'Pourcentages simples',
      emoji: '💯',
      question: `10% de ${x} = ?`,
      options: makeOptions(correct, [`${x / 100}`, `${x / 5}`, `${x}`]),
      correctAnswer: correct,
      steps: [
        { text: '10% d\'un nombre = ce nombre ÷ 10', formula: `${x} ÷ 10 = ${x / 10}` },
      ],
      explanation: `10% de ${x} = ${x / 10}. Diviser par 10 suffit ! 🎯`,
      difficulty: 2,
      xp: 15,
    };
  }

  // 5ème
  const ops = ['signed', 'power', 'trick99'] as const;
  const op = ops[generateRandomNumber(0, ops.length - 1)];

  if (op === 'signed') {
    const a = generateRandomNumber(2, 10);
    const b = generateRandomNumber(2, 15);
    const correct = `${b - a}`;
    return {
      id,
      level,
      topic: 'mental',
      title: 'Nombres relatifs',
      emoji: '🌡️',
      question: `Calcule : (-${a}) + ${b} = ?`,
      options: makeOptions(correct, [`${b + a}`, `-${b - a}`, `${a - b}`]),
      correctAnswer: correct,
      steps: [
        { text: `(-${a}) + ${b} revient à faire ${b} - ${a}` },
        { text: `${b} - ${a} = ${b - a}`, formula: `${b} - ${a} = ${b - a}` },
      ],
      explanation: `(-${a}) + ${b} = ${b - a}. Le signe du plus grand l'emporte ! 🎯`,
      difficulty: 2,
      xp: 15,
    };
  }

  if (op === 'power') {
    const a = generateRandomNumber(2, 5);
    const b = generateRandomNumber(2, 4);
    const correct = `${Math.pow(a, b)}`;
    return {
      id,
      level,
      topic: 'mental',
      title: 'Puissances',
      emoji: '⚡',
      question: `Combien font ${a}⁽${b}⁾ ?`,
      options: makeOptions(correct, [`${a * b}`, `${a + b}`, `${Math.pow(a, b) + 1}`]),
      correctAnswer: correct,
      steps: [
        { text: `${a}⁽${b}⁾ = ${Array(b).fill(a).join(' × ')}`, formula: `${a}⁽${b}⁾ = ${Math.pow(a, b)}` },
      ],
      explanation: `${a}⁽${b}⁾ = ${Math.pow(a, b)}. Une puissance, c'est une multiplication répétée. 📚`,
      difficulty: 2,
      xp: 15,
    };
  }

  const a = generateRandomNumber(2, 9);
  const correct = `${99 * a}`;
  return {
    id,
    level,
    topic: 'mental',
    title: 'Multiplications astucieuses',
    emoji: '🧠',
    question: `Calcule : 99 × ${a} = ?`,
    options: makeOptions(correct, [`${100 * a}`, `${100 * a - a - 1}`, `${100 * a + a}`]),
    correctAnswer: correct,
    steps: [
      { text: `Astuce : 99 × ${a} = (100 - 1) × ${a}`, formula: `${100 * a} - ${a} = ${99 * a}` },
    ],
    explanation: `99 × ${a} = ${99 * a}. Multiplier par 100 puis soustraire ! ✨`,
    difficulty: 3,
    xp: 20,
  };
}

// ---------- NOMBRES ----------
function generateAbacusExercise(): Exercise {
  const number = generateRandomNumber(0, 999999);
  const millions = Math.floor(number / 1000000);
  const milliers = Math.floor((number % 1000000) / 1000);
  const centaines = Math.floor((number % 1000) / 100);
  const dizaines = Math.floor((number % 100) / 10);
  const unites = number % 10;

  const components: string[] = [];
  if (millions > 0) components.push(`${millions} million${millions > 1 ? 's' : ''}`);
  if (milliers > 0) components.push(`${milliers} millier${milliers > 1 ? 's' : ''}`);
  if (centaines > 0) components.push(`${centaines} centaine${centaines > 1 ? 's' : ''}`);
  if (dizaines > 0) components.push(`${dizaines} dizaine${dizaines > 1 ? 's' : ''}`);
  if (unites > 0) components.push(`${unites} unité${unites > 1 ? 's' : ''}`);
  const abacusDescription = components.length === 0 ? '0 unité' : components.join(', ');
  const formattedNumber = number.toLocaleString('fr-FR');
  const correctAnswer = formattedNumber;

  const optionsSet = new Set([correctAnswer]);
  while (optionsSet.size < 4) {
    const variation = number + generateRandomNumber(-100, 100);
    if (variation >= 0 && variation <= 999999 && variation !== number) {
      optionsSet.add(variation.toLocaleString('fr-FR'));
    }
  }
  const options = shuffle(Array.from(optionsSet));

  const steps: ExerciseStep[] = [
    { text: 'L\'abaque montre les colonnes : millions, milliers, centaines, dizaines, unités' },
  ];
  if (millions > 0) steps.push({ text: `${millions} million${millions > 1 ? 's' : ''} = ${millions * 1000000}`, formula: `${millions} × 1 000 000 = ${millions * 1000000}` });
  if (milliers > 0) steps.push({ text: `${milliers} millier${milliers > 1 ? 's' : ''} = ${milliers * 1000}`, formula: `${milliers} × 1 000 = ${milliers * 1000}` });
  if (centaines > 0) steps.push({ text: `${centaines} centaine${centaines > 1 ? 's' : ''} = ${centaines * 100}`, formula: `${centaines} × 100 = ${centaines * 100}` });
  if (dizaines > 0) steps.push({ text: `${dizaines} dizaine${dizaines > 1 ? 's' : ''} = ${dizaines * 10}`, formula: `${dizaines} × 10 = ${dizaines * 10}` });
  if (unites > 0) steps.push({ text: `${unites} unité${unites > 1 ? 's' : ''} = ${unites}` });
  steps.push({ text: `Total : ${formattedNumber}`, formula: `= ${formattedNumber}` });

  let difficulty = 1;
  if (number >= 1000) difficulty = 2;
  if (number >= 100000) difficulty = 3;

  return {
    id: `generated-abacus-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    level: '1Obs',
    topic: 'numbers',
    title: 'Lire un nombre sur un abaque',
    emoji: '🔢',
    question: `Sur un abaque, tu as : ${abacusDescription}. Quel est le nombre ?`,
    options,
    correctAnswer,
    steps,
    explanation: `On additionne toutes les valeurs : ${formattedNumber} ! 🎯`,
    difficulty,
    xp: difficulty === 1 ? 10 : difficulty === 2 ? 15 : 20,
  };
}

function generateDecimalExercise(level: Level, id: string): Exercise {
  const sub = generateRandomNumber(0, 4);

  if (sub === 0) {
    const n = generateRandomNumber(10, 99);
    const d = generateRandomNumber(1, 99);
    const decimal = parseFloat(`${n}.${d.toString().padStart(2, '0')}`);
    let d2 = d;
    while (d2 === d) {
      d2 = generateRandomNumber(1, 99);
    }
    const otherDecimal = parseFloat(`${n}.${d2.toString().padStart(2, '0')}`);
    const bigger = Math.max(decimal, otherDecimal);
    const smaller = Math.min(decimal, otherDecimal);
    const correct = bigger.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return {
      id,
      level,
      topic: 'numbers',
      title: 'Nombres décimaux',
      emoji: '🔢',
      question: `Quel est le plus grand : ${decimal.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ou ${otherDecimal.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ?`,
      options: makeOptions(correct, [
        smaller.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        'Ils sont égaux',
        'On ne peut pas savoir',
      ]),
      correctAnswer: correct,
      steps: [
        { text: 'On compare les unités, puis les dixièmes, puis les centièmes' },
        { text: `${bigger} est plus grand que ${smaller}`, formula: `${bigger} > ${smaller}` },
      ],
      explanation: `Le plus grand est ${correct}. On compare chaque rang décimal ! 🎯`,
      difficulty: 2,
      xp: 15,
    };
  }

  if (sub === 1) {
    const n = generateRandomNumber(1, 99);
    const d = generateRandomNumber(1, 9);
    const number = parseFloat(`${n}.${d}`);
    const correct = number.toLocaleString('fr-FR', { minimumFractionDigits: 1 });
    return {
      id,
      level,
      topic: 'numbers',
      title: 'Nombres décimaux',
      emoji: '🔢',
      question: `Comment écrit-on : ${n} unités et ${d} dixièmes ?`,
      options: makeOptions(correct, [
        `${n},0${d}`,
        `${d},${n}`,
        `${n}${d}`,
      ]),
      correctAnswer: correct,
      steps: [
        { text: `${n} unités = ${n}` },
        { text: `${d} dixièmes = 0,${d}` },
        { text: `On ajoute : ${n} + 0,${d} = ${correct}` },
      ],
      explanation: `${n} unités et ${d} dixièmes s'écrivent ${correct}. ✨`,
      difficulty: 1,
      xp: 10,
    };
  }

  if (sub === 2) {
    const n = generateRandomNumber(1, 99);
    const c = generateRandomNumber(1, 9);
    const d = generateRandomNumber(1, 9);
    const number = parseFloat(`${n}.${c}${d}`);
    const correct = `0,0${d}`;
    return {
      id,
      level,
      topic: 'numbers',
      title: 'Nombres décimaux',
      emoji: '🔢',
      question: `Dans le nombre ${number.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}, quelle est la valeur du chiffre ${d} ?`,
      options: makeOptions(correct, [`0,${d}`, `${d}`, `${d} centièmes`, `${n}`]),
      correctAnswer: correct,
      steps: [
        { text: `Le chiffre ${d} est à la position des centièmes` },
        { text: `Donc il représente ${d} centièmes` },
        { text: `${d} centièmes = 0,0${d}` },
      ],
      explanation: `En position des centièmes, ${d} vaut 0,0${d}. 🎯`,
      difficulty: 2,
      xp: 15,
    };
  }

  if (sub === 3) {
    const a = generateRandomNumber(1, 20);
    const b = generateRandomNumber(1, 20);
    const number = parseFloat(`${a}.${b.toString().padStart(2, '0')}`);
    const n = Math.floor(number);
    const d = number - n;
    const dFormatted = d.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const formatted = number.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return {
      id,
      level,
      topic: 'numbers',
      title: 'Nombres décimaux',
      emoji: '🔢',
      question: `Quelle est la décomposition de ${formatted} ?`,
      options: makeOptions(`${n} + ${dFormatted} = ${formatted}`, [
        `${n} + ${b} = ${n + b}`,
        `${a} + 0,${b}`,
        `${n} + 0,0${b}`,
      ]),
      correctAnswer: `${n} + ${dFormatted} = ${formatted}`,
      steps: [
        { text: `La partie entière est ${n}` },
        { text: `La partie décimale est ${dFormatted}` },
        { text: `Donc ${formatted} = ${n} + ${dFormatted}` },
      ],
      explanation: `${formatted} se décompose en ${n} + ${dFormatted} = ${formatted}. ✨`,
      difficulty: 2,
      xp: 15,
    };
  }

  const a = generateRandomNumber(1, 9) / 10;
  const b = generateRandomNumber(1, 9) / 100;
  const sum = a + b;
  const aFormatted = a.toLocaleString('fr-FR', { minimumFractionDigits: 2 });
  const bFormatted = b.toLocaleString('fr-FR', { minimumFractionDigits: 2 });
  const correct = sum.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return {
    id,
    level,
    topic: 'numbers',
    title: 'Nombres décimaux',
    emoji: '🔢',
    question: `Calcule : ${aFormatted} + ${bFormatted}`,
    options: makeOptions(correct, [
      (a + b / 10).toLocaleString('fr-FR', { minimumFractionDigits: 2 }),
      (sum + 0.1).toLocaleString('fr-FR', { minimumFractionDigits: 2 }),
      (sum - 0.01).toLocaleString('fr-FR', { minimumFractionDigits: 2 }),
    ]),
    correctAnswer: correct,
    steps: [
      { text: 'On additionne les dixièmes et les centièmes' },
      { text: `Aligne bien les virgules :`, formula: `${aFormatted} + ${bFormatted}` },
      { text: `Résultat : ${correct}` },
    ],
    explanation: `${aFormatted} + ${bFormatted} = ${correct}. ✨`,
    difficulty: 2,
    xp: 15,
  };
}

function generateNumbersExercise(level: Level): Exercise {
  const id = makeId('numbers', level);

  if (level === '1Obs') {
    const sub = generateRandomNumber(0, 2);

    if (sub === 0) {
      return generateAbacusExercise();
    }

    if (sub === 1) {
      const n = generateRandomNumber(100, 999);
      const hundreds = Math.floor(n / 100);
      const tens = Math.floor((n % 100) / 10);
      const units = n % 10;
      const correct = `${hundreds * 100} + ${tens * 10} + ${units}`;
      return {
        id,
        level,
        topic: 'numbers',
        title: 'Décomposition additive',
        emoji: '➕',
        question: `Quelle est la décomposition additive de ${n} ?`,
        options: makeOptions(correct, [`${hundreds} + ${tens} + ${units}`, `${hundreds * 100} + ${units}`, `${n}`]),
        correctAnswer: correct,
        steps: [
          { text: `${n} se décompose en centaines, dizaines et unités` },
          { text: `${hundreds} centaines = ${hundreds * 100}`, formula: `${hundreds} × 100 = ${hundreds * 100}` },
          { text: `${tens} dizaines = ${tens * 10}`, formula: `${tens} × 10 = ${tens * 10}` },
          { text: `${units} unité${units > 1 ? 's' : ''} = ${units}` },
        ],
        explanation: `La décomposition additive de ${n} est : ${hundreds * 100} + ${tens * 10} + ${units}. ✨`,
        difficulty: 1,
        xp: 10,
      };
    }

    let a = generateRandomNumber(100, 999);
    let b = generateRandomNumber(100, 999);
    if (a === b) b += 1;
    const max = Math.max(a, b);
    const min = Math.min(a, b);
    const correct = max.toLocaleString('fr-FR');
    return {
      id,
      level,
      topic: 'numbers',
      title: 'Comparaison de nombres',
      emoji: '⚖️',
      question: `Quel est le plus grand : ${a.toLocaleString('fr-FR')} ou ${b.toLocaleString('fr-FR')} ?`,
      options: makeOptions(correct, [min.toLocaleString('fr-FR'), 'Ils sont égaux', 'On ne peut pas savoir']),
      correctAnswer: correct,
      steps: [
        { text: 'On compare chiffre par chiffre de gauche à droite' },
        { text: `${max} est plus grand que ${min}`, formula: `${max} > ${min}` },
      ],
      explanation: `Le plus grand est ${max}. On compare position par position ! 🎯`,
      difficulty: 1,
      xp: 10,
    };
  }

  // 1phase : nombres décimaux
  if (level === '1phase') {
    return generateDecimalExercise(level, id);
  }

  // 5ème : comparaison de grands nombres
  const digits = 6;
  const max = Math.pow(10, digits) - 1;
  const min = Math.pow(10, digits - 1);
  let a = generateRandomNumber(min, max);
  let b = generateRandomNumber(min, max);
  if (a === b) b += 1;
  const biggest = Math.max(a, b);
  const smallest = Math.min(a, b);
  const correct = biggest.toLocaleString('fr-FR');
  return {
    id,
    level,
    topic: 'numbers',
    title: 'Comparaison de grands nombres',
    emoji: '⚖️',
    question: `Quel est le plus grand : ${a.toLocaleString('fr-FR')} ou ${b.toLocaleString('fr-FR')} ?`,
    options: makeOptions(correct, [smallest.toLocaleString('fr-FR'), 'Ils sont égaux', 'On ne peut pas savoir']),
    correctAnswer: correct,
    steps: [
      { text: 'On compare les chiffres de gauche à droite' },
      { text: `${biggest} est plus grand que ${smallest}`, formula: `${biggest} > ${smallest}` },
    ],
    explanation: `Le plus grand nombre est ${biggest.toLocaleString('fr-FR')}. Compare chaque position ! 🎯`,
    difficulty: 3,
    xp: 20,
  };
}

// ---------- DISPATCH ----------
const GENERATORS: Record<Topic, (level: Level) => Exercise> = {
  geometry: generateGeometryExercise,
  fractions: generateFractionsExercise,
  mental: generateMentalExercise,
  numbers: generateNumbersExercise,
};

export function generateGeneratedExercises(level: Level, topic: Topic, count: number = 5): Exercise[] {
  const generate = GENERATORS[topic];
  const exercises: Exercise[] = [];
  for (let i = 0; i < count; i++) {
    exercises.push({ ...generate(level), id: makeId(topic, level) });
  }
  return exercises;
}

export function generateSameExercise(level: Level, topic: Topic, title: string, count: number = 1): Exercise[] {
  const generate = GENERATORS[topic];
  const exercises: Exercise[] = [];
  let attempts = 0;
  while (exercises.length < count && attempts < 100) {
    attempts++;
    const ex = { ...generate(level), id: makeId(topic, level) };
    if (ex.title === title) {
      exercises.push(ex);
    }
  }
  while (exercises.length < count) {
    exercises.push({ ...generate(level), id: makeId(topic, level) });
  }
  return exercises;
}

export function getExercisesByLevelAndTopic(level: Level, topic: Topic): Exercise[] {
  const staticExercises = EXERCISES.filter(e => e.level === level && e.topic === topic);
  return staticExercises;
}

export function getExerciseById(id: string): Exercise | undefined {
  const staticExercise = EXERCISES.find(e => e.id === id);
  if (staticExercise) return staticExercise;
  return undefined;
}

export function getDailyChallengeExercises(): Exercise[] {
  const all = [...EXERCISES];
  const shuffled = all.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

export const TOTAL_EXERCISES = EXERCISES.length;