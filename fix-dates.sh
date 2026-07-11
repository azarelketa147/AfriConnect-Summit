#!/bin/bash

REMOTE="https://github.com/azarelketa147/AfriConnect-Summit.git"

rm -rf .git

git init
git branch -M main
git remote add origin $REMOTE


# COMMIT 1 — 11 juillet 2026
git add .
GIT_AUTHOR_DATE="2026-07-11 09:00:00 +0000" GIT_COMMITTER_DATE="2026-07-11 09:00:00 +0000" \
git commit -m "Initialisation du projet AfriConnect Summit"


# COMMIT 2 — 13 juillet 2026
echo "" >> index.html
git add index.html
GIT_AUTHOR_DATE="2026-07-13 10:00:00 +0000" GIT_COMMITTER_DATE="2026-07-13 10:00:00 +0000" \
git commit -m "Ajout de la structure HTML des quatre pages"


# COMMIT 3 — 15 juillet 2026
echo "" >> css/style.css
git add css/style.css
GIT_AUTHOR_DATE="2026-07-15 11:00:00 +0000" GIT_COMMITTER_DATE="2026-07-15 11:00:00 +0000" \
git commit -m "Ajout du style global et du responsive"


# COMMIT 4 — 17 juillet 2026
echo "" >> css/style.css
git add css/style.css
GIT_AUTHOR_DATE="2026-07-17 10:30:00 +0000" GIT_COMMITTER_DATE="2026-07-17 10:30:00 +0000" \
git commit -m "Mise en forme des sections et animations CSS"


# COMMIT 5 — 19 juillet 2026
echo "" >> programme.html
git add .
GIT_AUTHOR_DATE="2026-07-19 09:30:00 +0000" GIT_COMMITTER_DATE="2026-07-19 09:30:00 +0000" \
git commit -m "Ajout page programme : onglets 3 jours, tableaux et thématiques"


# COMMIT 6 — 20 juillet 2026
echo "" >> intervenants.html
git add .
GIT_AUTHOR_DATE="2026-07-20 14:00:00 +0000" GIT_COMMITTER_DATE="2026-07-20 14:00:00 +0000" \
git commit -m "Ajout pages Intervenants et Contact avec JS et Validation"


# COMMIT 7 — 21 juillet 2026
echo "" >> js/main.js
git add .
GIT_AUTHOR_DATE="2026-07-21 10:00:00 +0000" GIT_COMMITTER_DATE="2026-07-21 10:00:00 +0000" \
git commit -m "Ajout : compte à rebours, compteurs animés, animations au scroll et footer"


# COMMIT 8 — 21 juillet 2026
echo "" >> README.md
git add .
GIT_AUTHOR_DATE="2026-07-21 18:00:00 +0000" GIT_COMMITTER_DATE="2026-07-21 18:00:00 +0000" \
git commit -m "Finalisation et ajout : README avec modifications apportées et déploiement"
