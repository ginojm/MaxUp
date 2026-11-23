CREATE TABLE modules (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(160) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  audience VARCHAR(160) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  level VARCHAR(100) NOT NULL,
  symbol VARCHAR(20) NOT NULL,
  curriculum JSONB NOT NULL DEFAULT '[]'::jsonb,
  benefits JSONB NOT NULL DEFAULT '[]'::jsonb,
  sort_order INTEGER NOT NULL UNIQUE
);

CREATE TABLE inquiries (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(254) NOT NULL,
  message TEXT NOT NULL,
  module_id INTEGER REFERENCES modules(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO modules
  (slug, title, category, description, audience, duration, level, symbol, curriculum, benefits, sort_order)
VALUES
  (
    'mathematiques', 'Mathématiques', 'Soutien scolaire',
    'Reprenez confiance, comprenez chaque notion et adoptez des méthodes efficaces pour réussir vos contrôles, examens et concours.',
    'Collégiens & lycéens', 'Selon vos objectifs', 'Débutant à avancé', '∑',
    '[{"title":"Les fondamentaux","description":"Calcul, fractions, puissances, priorités opératoires et nombres relatifs."},{"title":"Algèbre et fonctions","description":"Équations, inéquations, expressions littérales, fonctions et représentations graphiques."},{"title":"Géométrie et mesures","description":"Figures, transformations, théorèmes, trigonométrie, volumes et grandeurs."},{"title":"Méthode et préparation","description":"Organisation du raisonnement, résolution de problèmes et entraînement aux examens."}]',
    '[{"title":"Diagnostic initial","description":"Nous identifions vos difficultés précises."},{"title":"Progression visible","description":"Des objectifs courts pour mesurer vos progrès."},{"title":"Confiance durable","description":"Une méthodologie applicable seul."}]',
    1
  ),
  (
    'francais', 'Français', 'Soutien scolaire',
    'Renforcez vos bases, développez votre esprit critique et rédigez des textes clairs, structurés et convaincants.',
    'Collégiens & lycéens', 'Selon vos objectifs', 'Tous niveaux', 'Aa',
    '[{"title":"Maîtriser la langue","description":"Orthographe, grammaire, conjugaison, vocabulaire et syntaxe."},{"title":"Lire et comprendre","description":"Identifier les informations, analyser un texte et interpréter les intentions de l’auteur."},{"title":"Améliorer l’écriture","description":"Organiser ses idées, construire des paragraphes, argumenter et employer un registre adapté."},{"title":"Réussir les examens","description":"Préparation aux travaux écrits, commentaires, dissertations et épreuves orales."}]',
    '[{"title":"Langage précis","description":"Exprimez vos idées sans ambiguïté."},{"title":"Lecture active","description":"Comprenez les textes en profondeur."},{"title":"Écriture structurée","description":"Produisez des textes clairs et cohérents."}]',
    2
  ),
  (
    'physique-chimie', 'Physique-Chimie', 'Soutien scolaire',
    'Comprenez les phénomènes qui vous entourent, maîtrisez les modèles scientifiques et progressez dans les exercices et les TP.',
    'Collégiens & lycéens', 'Selon vos objectifs', 'Tous niveaux', '⚗',
    '[{"title":"Mécanique et énergie","description":"Mouvements, forces, énergie, puissance et interactions fondamentales."},{"title":"Électricité et ondes","description":"Circuits électriques, tensions, intensité, résistances, sons et lumières."},{"title":"Chimie et transformations","description":"Atomes, molécules, réactions chimiques, solutions et concentrations."},{"title":"Expérience et raisonnement","description":"Exploitation de données, protocole expérimental et rédaction scientifique."}]',
    '[{"title":"Concret","description":"Reliez chaque formule à un phénomène réel."},{"title":"Calcul maîtrisé","description":"Utilisez les unités avec méthode."},{"title":"Autonomie","description":"Adoptez une méthode fiable pour résoudre les exercices."}]',
    3
  ),
  (
    'reseaux', 'Administration réseau', 'Formation informatique',
    'Apprenez à concevoir, déployer et sécuriser les infrastructures qui font communiquer les systèmes et les utilisateurs.',
    'Adultes & débutants motivés', 'Selon vos objectifs', 'Bases informatiques recommandées', '⌘',
    '[{"title":"Fondamentaux réseaux","description":"Modèles OSI/TCP-IP, adressage, sous-réseaux, commutation et routage."},{"title":"Services d’entreprise","description":"DNS, DHCP, partage de fichiers, virtualisation et administration centralisée."},{"title":"Sécurité informatique","description":"Gestion des droits, pare-feu, sauvegardes, mises à jour et bonnes pratiques."},{"title":"Supervision et dépannage","description":"Analyse du trafic, journaux, diagnostics et résolution méthodique des incidents."}]',
    '[{"title":"Projets réels","description":"Travaillez sur des scénarios représentatifs."},{"title":"Mise en pratique","description":"Administrez avec des outils adaptés."},{"title":"Réflexe sécurité","description":"Appliquez les bonnes pratiques dès le départ."}]',
    4
  ),
  (
    'developpement', 'Développement d’applications', 'Formation informatique',
    'Passez de l’idée à une application fonctionnelle grâce à des projets guidés, des bases solides et une pratique régulière du code.',
    'Débutants & personnes en reconversion', 'Selon vos objectifs', 'Aucun prérequis', '</>',
    '[{"title":"Logique et langage","description":"Variables, conditions, boucles, fonctions, types et structures de données."},{"title":"Interfaces utilisateur","description":"HTML, CSS, design adaptatif, accessibilité et interactions dynamiques."},{"title":"Données et services","description":"Manipulation des données, API, stockage et gestion des erreurs."},{"title":"Projet professionnel","description":"Organisation du code, tests, documentation, déploiement et présentation."}]',
    '[{"title":"Apprendre en codant","description":"Construisez des fonctionnalités réelles."},{"title":"Projet concret","description":"Terminez avec une application présentable."},{"title":"Bonnes pratiques","description":"Structurez et vérifiez votre code."}]',
    5
  );
