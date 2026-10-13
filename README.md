# Ask & Karstad – designforhåndsvisning

[Åpne testsidene](https://leifpeis.github.io/Ask-Karstad-forhandsvisning/)

Dette repoet inneholder bare genererte HTML-, CSS- og bildefiler for en statisk designforhåndsvisning. Ingen WordPress-temakode, PHP, databaseinnhold, innloggingsdata eller kontaktskjema publiseres her.

Kilde, redigerbare Gutenberg-mønstre og tester vedlikeholdes i det private [Ask-Karstad-nettside](https://github.com/leifpeis/Ask-Karstad-nettside)-repoet, gren `setup/wordpress-foundation`, [PR #2](https://github.com/leifpeis/Ask-Karstad-nettside/pull/2). Dette er et publiseringsrepo, ikke en parallell utviklingsgren eller et nytt tema.

Forhåndsvisningen viser fire tjenestesider. Meny, lenker og FAQ kan prøves. WordPress-redigering testes separat. Kontaktlenker åpner den eksisterende nettsiden. Sidene har noindex/nofollow og ingen sporing.

Bygges med `scripts/export-preview.php` og `scripts/build-preview.cjs` i kilderepositoriet. Bare innholdet i `dist/preview/` overføres hit. Bevar denne README-en ved senere oppdateringer.
