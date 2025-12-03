# Miserere Mei - The Precarious Trails to the Library of Preachers v.1.0.3

[![Build](https://img.shields.io/github/actions/workflow/status/APorkolab/Miserere-Mei/ci.yml?branch=main)](../../actions)
[![License](https://img.shields.io/badge/license-MIT-informational.svg)](LICENSE)
[![Issues](https://img.shields.io/github/issues/APorkolab/Miserere-Mei.svg)](../../issues)


# Documentation

## **0. History of the game**

The idea of a program called „Miserere Mei - The Precarious Trails to the Library of Preachers” grew out of an interesting thought experiment: is it possible to use modern tools to create a type of game, namely a text-based adventure game, once popular in the early days of computing that's enhanced with some of the features of video games published in the new millennium? "Miserere Mei" is an adventure game written in Java that I developed between September 2020 and late October 2020.

I developed the software as a thesis project fo the software developer NQR course organized by OKTÁV PLC.

The game is set in the postapocalyptic world of the 2050's, in the Land of Desolation. The player controls a mercenary called Cantus Planus who gets a task from an old priest, Gregorio. According to the brief the soldier has to escort five youngsters: Altus, Tenor, Bassus and the Superia sisters to the Library of Preachers so that the librarians can record for posterity the music living in them and through them.

We follow their mission through a wild desert full of dangers, while Falsetto, the evil and ruthless warlord, learns about their task and wants to foil their plan. So the goal of the player is to lead the main characters safely to the Library of Preachers.

The game also build on the player taking risks: they can take the easier route if they want to, but they also have the choice to take greater risks and reap grater rewards.

The game's stlye is influenced by the tradition of classic flipbooks and text-based adventure games of the early 90's. This means that there is a safe route and that the player has to engage in fights and the player's choices have a cruical role in the gameplay.

## **1. Purpose of the application**

This application **Miserere Mei v.1.0.0** (full name: _Miserere Mei - The Precarious Trails to the Library of Preachers v.1.0.0_) is a text adventure game.
The idea for "Miserere Mei - The Precarious Trails to the Library of Preachers" came from an interesting thought experiment: is it possible to use modern tools to bring some of the features of video games from the millennium to a basically old game type, the text adventure game, which was created in the early days of computing?

In its style, the programme builds on the tradition of classic "page-turners" and text adventure games from the post-changeover era. So: there is a safe route for the software too. In the program, the user has to fight and the player's decisions play an essential role in the gameplay.

The game can be played in about half an hour, though, once the right route has been taken.

The game is set in the post-apocalyptic world of the 2050s, the Land of Destruction. In the game, you control a mercenary, Cantus Planus, who is given a mission by an old priest, Gregorio. The mission is to escort 5 young men - Altus, Tenor, Bassus and the Superia sisters - to the Library of Preachers so that the music they and they "live" can be "recorded" by the librarians for posterity. Their mission takes them through the wild, cruel desert, with countless trials and tribulations, and even the ruthless and unforgiving warlord of the area, Falsetto, learns of the mission and wants to prevent it. The aim of the programme, therefore, is for the player to get the game's protagonists to the Library of Preachers safe and sound.

In addition, the program contains:

- a scene editor,
- user accounts,
- a user editor.

### **1.1. Version history**

#### _v1.0.3_

- Backend ported to SQL database.
- Added Docker contenerization.

#### _v1.0_

- Backend ported to Node.JS + Express.JS platform.
- Frontend rewritten on Angular 14 base.
- Location editor and full form field validation added,
- User accounts and full field validation of user form added,
- Full game space is now playable,
- Side missions completed,
- Inventory completed,
- Location texts are stored in MongoDB Atlas cloud database.
- Objects can be used.
- Combat system is ready.
- Storage and removal of opponents from the battlefield resolved.
- Unified, AI-generated location maps added.

#### _v0.8_

- Only the route of main mission can be played,
- Spring Boot backend completed,
- Angular 12 frontend partially completed.
- Location texts saved to XML file.
- Combat system functional, but buggy.
- One kind of enemy type is available.
- Using only stock photos as location drawings.

## **2. Install the application**

1. If you do not have the Git version control software installed, download and install the version for your operating system from https://git-scm.com.

2. If you do not have the NodeJS runtime environment installed, download and install the version marked "LTS" from https://nodejs.org/en/.

3. If you do not have the Angular framework installed on your system, do so by issuing the `npm i -g @angular/cli` command in PowerShell.

4. clone the contents of the GitHub repository. So in PowerShell, issue the following command:

   `git clone https://github.com/APorkolab/Nyelvszo-v.2.0.git`

5. Install the application dependencies:

   - Backend

     - In the terminal, go to the /backend folder (`cd backend`) and run `npm i`.

   - frontend
     - On the terminal, go to the /frontend folder and run `npm i`.\*

6.1. For manual installation:

- In the terminal, issue the `ng build` command.

- The contents of the /frontend/dist/frontend folder must be copied to the /backend/public folder.

OR

6.2. For automatic installation:

- In the terminal, go to the /backend folder and run `npm run build`.
- It is important to install using only one of the methods.

## **2. Configure the application**

- In the _/frontend/environments_ folder, configure the API endpoint path:

  - _environment.ts_ file: http://127.0.0.1:3000/
  - _environment.prod.ts_ file: http://localhost:3000/

## **3. Start the application**

- Both the backend and the frontend can be started with the `npm start` command.

## **4. Description of roles**

|                                      | User                                                                                           | Editor                                                                                          | Administrator                                                    |
| ------------------------------------ | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Their value ("role") in the database | 1                                                                                              | 2                                                                                               | 3                                                                |
| Rights                               | You can view everything except the user table, but you cannot create, edit or delete entities. | You can view all tables and edit, create or delete entities in any table except the user table. | You can view all tables and create, edit or delete any entities. |

## **5. Contact information**

Dr. Ádám Porkoláb (ap@aporkolab.com)

## **6. Technologies used**

- _Graphics, design:_ Midjourney AI ([https://www.midjourney.com/home/](https://www.midjourney.com/home/)),
- _Initial HTML template:_ Creative Tim ([https://www.creative-tim.com/product/soft-ui-dashboard](https://www.creative-tim.com/product/soft-ui-dashboard)),
- _HTML template:_ Baris Senkal ([https://github.com/barissenkal/Short-Story-HTML-Template](https://github.com/barissenkal/Short-Story-HTML-Template)),
- _HTML template used for Forbidden (403) error:_ Blissful Lemon ([https://codepen.io/ablissfullemon/pen/zJepap](https://codepen.io/ablissfullemon/pen/zJepap))

## **7. Legal informations**

Written,developed, hosted by Ádám Dr. Porkoláb - Hootie in Bootee Studio

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.

## **8. Plans for the next version:**

- Built-in sounds,
- More opponents and objects,
- Alternative endings,
- Continuation?

# Dokumentáció -- Miserere Mei - The Precarious Trails to the Library of Preachers v.1.0.0

## **1. Az alkalmazás célja**

Jelen alkalmazás a **Miserere Mei v.1.0.0** (teljes nevén: _Miserere Mei - The Precarious Trails to the Library of Preachers v.1.0.0_) egy szöveges kalandjáték.
A „Miserere Mei - The Precarious Trails to the Library of Preachers” című program ötlete egy érdekes gondolatkísérletből indult ki: lehetséges-e modern eszközökkel, az ezredforduló után megjelent videojátékok néhány jellemzőjével felvértezni egy alapvetően régi, a számítástechnika őskorában megjelent játéktípust, a szöveges kalandjátékot?

A program stílusában a klasszikus „lapozgatós könyvek” és a rendszerváltás utáni szöveges kalandjátékok hagyományaira épít. Tehát: a szoftver esetében is van egy biztonságos útvonal. A programban a felhasználónak harcolnia is kell és a játékmenet tekintetében lényegi szerepe van a játékos döntéseinek.

A játék – a megfelelő útvonalat bejárva – bár körülbelül fél óra alatt kijátszható.

A játék helyszíne a 2050-es évek posztapokaliptikus világa, a Pusztulás Földje. A játék-ban egy zsoldost, Cantus Planust irányíthatjuk, aki feladatot kap egy öreg paptól, Gregoriótól. A megbízás szerint a katonának el kell kísérnie 5 fiatal embert: Altust, Tenort, Bassust és a Superia-nővéreket a Prédikátorok Könyvtárába azért, hogy az általuk és bennük "élő" zenét a könyvtárosok „lejegyezhessék” az utókornak. A küldetésük a vad, kegyetlen sivatagon vezet keresztül számtalan megpróbáltatással, s emellett még a környék könyörtelen és kíméletlen hadura, Falsetto is tudomást szerez a megbízásról és meg akarja akadályozni azt. A program célja tehát, hogy a játékos a játék főszereplőit épen és egészségesen eljuttassa a Prédikátorok Könyvtárába.

A program ezen felül:

- helyszínszerkesztőt,
- felhasználói fiókokat,
- felhasználószerkesztőt is tartalmaz.

### **1.1. Verziótörténet**

#### _v1.0_

- Backend Node.JS + Express.JS platformra átportolva.
- Frontend Angular 14-es alapon újraírva.
- Helyszínszerkesztő és a form teljes mezővalidációja hozzáadva,
- Felhasználói fiókok és a user form teljes mezővalidációja hozzáadva,
- Teljes játéktér immár végigjátszható,
- Mellékküldetések elkészültek,
- Leltár elkészült,
- Helyszínszövegek MongoDB Atlas felhőadatbázisban vannak eltárolva.
- Tárgyak használata lehetséges.
- Harcrendszer elkészült.
- Ellenfelek tárolása és harctérről való kivonása megoldott.
- Egységes, AI generált helyszínrajzok.

#### _v0.8_

- Főküldetés útvonala végigjátszható,
- Spring Boot backend elkészült,
- Angular 12-es frontend részben elkészült.
- Helyszínszövegek XML fájlba mentve.
- Harcrendszer működőképes, de bugos.
- Egyfajta, végleges ellenféltípus van.
- Stockfotók használata helyszínrajzként.

## **2. Az alkalmazás telepítése**

1. Ha nincs telepítve a Git verziókezelő szoftver, akkor a https://git-scm.com weboldalról töltsük le és telepítsük fel a főoldalon megtalálható változatok közül az operációs rendszerünknek megfelelőt.

2. Ha nincs telepítve a NodeJS futtatókörnyezet, akkor a https://nodejs.org/en/ weboldalról töltsük le és telepítsük fel a főoldalon található, "LTS" megjelölésű változatot.

3. Ha nincs telepítve az Angular keretrendszer a rendszeren, akkor azt a PowerShell-ben kiadott `npm i -g @angular/cli` paranccsal ezt tegyük meg.

4. Le kell klónozni az adott GitHub repository tartalmát. Tehát a PowerShell-ben a következő parancsot kell kiadni:

   `git clone https://github.com/APorkolab/Nyelvszo-v.2.0.git`

5. Telepíteni kell az alkalmazás függőségeit:

   - Backend

     - A terminálon be kell lépni a /backend mappába (`cd backend`) és futtatni az `npm i` parancsot.

   - Frontend
     - A terminálon be kell lépni a /frontend mappába és futtatni az `npm i` parancsot.\*

6.1. Manuális telepítés esetén:

- A terminálban ki kell adni az `ng build` parancsot.

- A /frontend/dist/frontend mappa tartalmát be kell másolni a /backend/public mappába.

VAGY

6.2. Automatikus telepítés esetén:

- A terminálon be kell lépni a /backend mappába és futtatni az `npm run build` parancsot.
- Fontos, hogy csak az egyik módszer szerint kell telepíteni.

## **2. Az alkalmazás konfigurálása**

- A _/frontend/environments_ mappában be kell állítani az API végpont elérési útvonalát:

  - _environment.ts_ állomány: http://127.0.0.1:3000/
  - _environment.prod.ts_ állomány: http://localhost:3000/

## **3. Az alkalmazás indítása**

- Mind a backend, mind a frontend az `npm start` paranccsal indítható.

## **4. A szerepkörök leírása**

|                                         | Felhasználó                                                                                                            | Szerkesztő                                                                                                                                 | Adminisztrátor                                                                               |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Adatbázisban rögzített értékük ("role") | 1                                                                                                                      | 2                                                                                                                                          | 3                                                                                            |
| Jogaik                                  | A felhasználói táblázat kivételével mindent megtekinthet, de nem hozhat létre, szerkeszthet vagy törölhet entitásokat. | A minden táblázatot megtekinthet, és a felhasználói táblázat kivételével bármelyiket szerkesztheti, létrehozhat vagy törölhet entitásokat. | Minden táblázatot megtekinthet, és bármely entitást létrehozhat, szerkeszthet vagy törölhet. |

## **5. Kapcsolattartási információ**

##### Webfejlesztés, design: Dr. Porkoláb Ádám

- **A weboldallal és általános kérdésekkel, észrevételekkel kapcsolatban:**
  Dr. Porkoláb Ádám (ap@aporkolab.com)

## **6. Felhasznált technológiák**

- _Grafika, design:_ Midjourney AI ([https://www.midjourney.com/home/](https://www.midjourney.com/home/)),
- _Kiindulásási HTML template:_ Creative Tim ([https://www.creative-tim.com/product/soft-ui-dashboard](https://www.creative-tim.com/product/soft-ui-dashboard)),
- _Szövegekhez használt HTML template:_ Baris Senkal ([https://github.com/barissenkal/Short-Story-HTML-Template](https://github.com/barissenkal/Short-Story-HTML-Template)),
- _Forbidden (403) hibához használt HTML template:_ Blissful Lemon ([https://codepen.io/ablissfullemon/pen/zJepap](https://codepen.io/ablissfullemon/pen/zJepap))

## **7. Jogi információk**

Írta, programozta, hostolja: Dr. Porkoláb Ádám - Hootie in Bootee Studio

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons Licenc" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />Ez a Mű a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Nevezd meg! - Ne add el! - Ne változtasd! 4.0 Nemzetközi Licenc</a> feltételeinek megfelelően felhasználható.

## **8. Tervek a következő verzióhoz:**

- Beépített hangok,
- Több ellenfél és tárgy,
- Alternatív befejezések,
- Folytatás?
