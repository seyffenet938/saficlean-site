# saficlean-site — règles de développement

Code de production du site **saficlean.fr** (Next.js App Router + Tailwind, hébergé sur Vercel).
Repo jumeau : **`../SafiClean-Docs`** (base de connaissance). Les deux vivent côte à côte dans `~/SafiClean/`.

**Langue : français.** Ton terse, action-first.

---

## 0. ⚠️ Le pont avec la doc — CONTRAINTES, pas habitudes

Ces règles priment sur toute demande ponctuelle. Elles ne se négocient pas.

1. **Les prix font autorité dans `../SafiClean-Docs/05-tarifs/30_TARIFS.md`.**
   - **Ne jamais inventer un prix.** Ne jamais le modifier sur le site sans l'avoir lu et vérifié là-bas d'abord.
   - Si un prix du site diffère de la fiche → **la fiche gagne**, on corrige le site.
   - La fiche est la source ; le site est un affichage de cette source.

2. **Toute modification du site est journalisée dans `../SafiClean-Docs/04-site-web/site-reference.md`.**
   - Une ligne datée en bas de la fiche : ce qui a changé, pourquoi. Grammaire : 🔄 mise à jour · ✨ ajout · 🔧 correctif · 📝 note · ⚠️ périmé.
   - Pas de commit de site sans la ligne de changelog correspondante.

3. **Ne jamais promettre un service non réalisé.**
   - Interdits tant qu'ils ne sont pas confirmés opérationnels : **cuir**, **rideaux**.
   - Ne pas les ajouter dans les pages, le tunnel de réservation, les métadonnées ou les données structurées.

4. **Le crédit d'impôt reste DÉSACTIVÉ.**
   - Aucune mention de crédit d'impôt / -50 % / avantage fiscal tant que l'**agrément Services à la Personne (SAP)** n'est pas obtenu.
   - Ne pas réactiver de mention existante ni en créer, même sur demande, sans confirmation explicite que l'agrément est en main.

---

## 1. Workflow

- **Édition → `git push` → Vercel redéploie** saficlean.fr automatiquement. Pas de manip côté Seyffe.
- Source de vérité du code = ce repo GitHub (`seyffenet938/saficlean-site`). v0 n'est plus utilisé pour l'édition.
- Un changement à la fois, validé avant d'enchaîner.

## 2. Contraintes techniques

- **Mobile-first.** Variables CSS globales, **aucune couleur en dur** (palette dans `tailwind.config.ts` / `globals.css`).
- Composants réutilisables. Ne pas dupliquer (des doublons `components/sections/*` vs `components/sections/<service>/*` existent déjà — à assainir, ne pas en recréer).
- TypeScript, Server Components par défaut.

## 3. Rappel proactif

En fin de tâche, signaler ce qui mérite d'être consigné dans la doc (décision, info de référence, thème nouveau). Proposer, ne pas décider seul — la validation revient à Seyffe.
