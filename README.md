# Générateur, promesse et calcul asynchrone en JS

club des devs @CREATIS `12 Janv 2018`

## Installation

Installer `node.js` et `npm`, télécharger les sources et installer les dépendances.

~~~
git clone git@github.com:elcerdo/cdd_janv_2018.git
npm install
~~~

## Présentation

* **async_intro.js** Exemples code asynchrone, bluebird et promesses
* **generator.js** Générateur `function*()` et mot clé `yield`
* **coroutine.js** Utilisation du mot clé yield pour résoudre les promesses
* **parallel.js** Exemples _multithread_
* **test_wiseau** Exemple code asynchrone avec `Promise.coroutine`

`async` <--> `Promise.coroutine(function*())`

`await` <--> `yield`
