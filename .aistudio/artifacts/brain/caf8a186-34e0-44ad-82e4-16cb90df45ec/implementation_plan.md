# Vitrine Vidéo & Showcase Interactif des Case Studies

Ce document présente l'architecture et les choix d'ingénierie pour remplacer les miniatures statiques des cartes de projets par un **Showcase Vidéo & Démonstration Interactive en Lecture Continue**, offrant une immersion complète dans les réalisations d'Ahmadoul Khadim Diop (RestoSen, ProjetPlus, NdarTech).

---

## Décisions Clés & Validation Utilisateur

> [!IMPORTANT]
> - **Format Retenu (Confirmé)** : *Showcase interactif avec aperçu en direct des sites* — remplacement des images fixes par une vitrine de démonstration dynamique intégrant le flux visuel réel et la possibilité d'interagir directement.
> - **Mode de Déclenchement (Confirmé)** : *Lecture continue automatique en boucle légère* — défilement cinématique automatique à 60 FPS simulant le parcours utilisateur, sans surcharge CPU/mémoire, avec pause intelligente hors champ (`IntersectionObserver`).
> - **Navigation Interactive à la Demande** : Bouton d'action permettant de basculer instantanément de la boucle cinématique vers l'aperçu en direct interactif sans rechargement de page.

---

## 1. Vue d'Ensemble & Concept Clé

- **Ce que le système accomplit** : Chaque carte de la section *Case Studies* ainsi que la modale d'analyse détaillée intègrent un lecteur cinématique haute performance encapsulé dans un cadre de navigateur sombre (*Dark Browser Chrome*). L'utilisateur découvre le site en action (animations, typographie, structure, flux de conversion) comme dans une vidéo de démonstration professionnelle.
- **Public Cible & Persona** : Recruteurs internationaux, fondateurs de startups, clients et partenaires institutionnels recherchant des preuves concrètes d'excellence technique et de finition visuelle Awwwards.
- **Valeur Ajoutée** : Démontre instantanément que les projets ne sont pas de simples maquettes mais de véritables applications réactives, véloces et opérationnelles en production.

---

## 2. Expérience Utilisateur & Design Visuel

### Flux Utilisateur
1. **Arrivée sur la section Projets** : Les cartes affichent le cadre de navigateur épuré avec l'URL réelle du projet, le cadenas SSL sécurisé et un voyant discret `En direct · 60 FPS`.
2. **Animation continue douce** : Le contenu effectue un défilement cinématique vertical fluide montrant les différentes sections (Hero, Menus/Catalogue, Formulaires, CTA), puis redémarre délicatement en boucle.
3. **Contrôles intuitifs au survol / focus** :
   - Bouton de mise en pause / lecture continue.
   - Bouton *Interagir en direct* pour manipuler directement l'application dans la carte.
   - Bouton *Agrandir / Étude de cas* pour ouvrir la vue immersive plein écran dans la modale.
4. **Optimisation des performances** : Dès qu'une carte sort de la zone visible à l'écran, son animation est immédiatement suspendue pour préserver 100% des ressources graphiques et de la batterie sur mobile.

### Schéma Visuel de la Carte Projet

```
┌────────────────────────────────────────────────────────────────────────┐
│                   CASE STUDY — PROJECT SHOWCASE CARD                   │
├────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ ● ● ●  🔒 https://restosen.netlify.app/       [ LIVE · 60FPS ]   │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │     [ CINEMATIC LOOP SHOWCASE / DYNAMIC BROWSER VIEWPORT ]       │  │
│  │     Défilement fluide continu de l'interface en production       │  │
│  │     Animations d'éléments, scroll cinématique automatisé         │  │
│  │                                                                  │  │
│  │   [ ⏸ Pause / Reprendre ]           [ ⚡ Interagir en direct ]    │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  RestoSen · Plateforme Vitrine & Expérience Gastronomique              │
│  Problème client & Solution technique                                  │
│  [ Étude de cas détaillée ]               [ Démo Live externe ↗ ]      │
└────────────────────────────────────────────────────────────────────────┘
```

### Identité Visuelle & Thème
- **Aesthetic** : Dark Glassmorphism, fond verre fumé `rgba(10, 15, 29, 0.85)`, bordure fine néon `1px solid rgba(255, 255, 255, 0.08)`.
- **Typographie** : `JetBrains Mono` pour les URLs et métadonnées de statut, `Plus Jakarta Sans` pour les titres et descriptions.
- **Micro-interactions** : Transition d'opacité douce lors du changement de mode (cinématique vs direct), glow discret autour de la barre d'adresse lors du survol.

---

## 3. Choix Techniques & Arbitrages Produits

- **Arbitrage 1 : Rendu Cinématique Continu Léger vs Vidéo MP4 / Outil Externe**
  - *Choix retenu* : Rendu cinématique dynamique basé sur CSS/Canvas et conteneurs d'aperçus vectoriels synchronisés avec mise en pause via `IntersectionObserver`.
  - *Pourquoi* : Zéro temps de chargement, zéro dépendance à un hébergeur tiers (pas de blocage CORS ou de buffering), respect absolu du quota de bande passante et compatibilité totale sur smartphone.
  - *Alternative écartée* : Vidéos lourdes pré-générées de plusieurs mégaoctets qui ralentiraient le First Contentful Paint et consommeraient inutilement la data des utilisateurs mobiles.

- **Arbitrage 2 : Interaction Directe à la Demande**
  - *Choix retenu* : La lecture automatique cinématique tourne par défaut. L'utilisateur clique sur *Interagir en direct* pour activer le mode interactif sans quitter le portfolio.
  - *Pourquoi* : Évite que le scroll de la page principale soit capturé accidentellement par les éléments internes lors du défilement du portfolio.

---

## 4. Architecture Technique & Composants

```
┌────────────────────────────────────────────────────────────────────────┐
│                               App.tsx                                  │
│                 (Section Case Studies & Filtrage)                      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                  ┌─────────────────┴─────────────────┐
                  ▼                                   ▼
      ┌────────────────────────┐         ┌────────────────────────┐
      │ ProjectVideoShowcase   │         │    CaseStudyModal      │
      │   - Browser Chrome     │         │   - Expanded Showcase  │
      │   - Cinematic Scroller │         │   - Architecture & KPIs│
      │   - Direct Iframe mode │         │   - Live Demo link     │
      │   - IntersectionObs    │         └────────────────────────┘
      └────────────────────────┘
```

### Fichiers Concernés
1. **`src/components/ProjectVideoShowcase.tsx`** : Nouveau composant gérant l'habillage de navigateur, la boucle cinématique continue à 60 FPS, les contrôles de lecture et la bascule en mode direct.
2. **`src/data/portfolioData.ts`** : Ajout des configurations spécifiques de démonstration pour chaque projet (vitesse de scroll cinématique, URLs de démonstration, tags de capture).
3. **`src/types/portfolio.ts`** : Extension de l'interface `CaseStudy` avec les champs du showcase vidéo (`showcaseConfig`).
4. **`src/App.tsx` & `src/components/CaseStudyModal.tsx`** : Intégration du composant dans les cartes de la grille et dans la modale d'étude de cas.
5. **`src/index.css`** : Classes d'animation cinématique fluide avec accélération matérielle (`transform: translate3d`).
