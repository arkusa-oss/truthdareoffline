Lyra's Orb — Spanish Voice Clips (audiofiles/es/)
=================================================

Drop the 53 Spanish MP3s here. The game plays these automatically when the
player selects Español (GAME_LANG === "es"); English clips in ../ are used for
English. Same clip IDs in both languages — only the folder differs.

HOW TO PRODUCE (Revoicr)
------------------------
1. Open lyra_es_script.txt in this folder. It lists all 53 clips as:

       L01.mp3
       <Spanish line to speak>

2. In Revoicr, pick a female Spanish (Latin-American) voice — mysterious,
   sensual, unhurried. Lyra treats one player as "tú", the group as "ustedes".
   Ellipses (...) are deliberate pauses — let them breathe.
3. Generate each line and export with the EXACT filename shown (L01.mp3 …
   L52.mp3, L55.mp3 — note: the set skips L53/L54, ends at L55).
4. Save all 53 files into this folder (audiofiles/es/).

NEW CLIP — L56 (welcome splash)
-------------------------------
L56 is the line Lyra speaks on the first tap of the cover:
  EN: "Welcome, humans... prepare to be initiated."
  ES: "Bienvenidos, humanos... prepárense para ser iniciados."
This one is NEW, so it needs recording in BOTH languages: English as
../L56.mp3 (repo audiofiles/) and Spanish as ./L56.mp3 (this folder).
Until both exist, the welcome line is silent (no breakage).

CHECK
-----
- 54 files: L01–L52 plus L55 and L56. Filenames must match exactly (case-sensitive).
- Make them world-readable (chmod 644) so the browser can load them; the
  English clips shipped as 0400 owner-only, which would 404 in the browser.
- Then run ./deploy-sync.sh — it rsyncs audiofiles/ (including es/) into
  site/play/audiofiles/, and Cloudflare serves them. Commit + push.

The full source script (character notes, EN reference, ES lines) is in the
repo root: Lyra_Voz_Espanol.rtf.
