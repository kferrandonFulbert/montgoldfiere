# 🎮 Mini-Jeu Phaser — TP Étudiants

Ce projet a pour objectif d'apprendre les bases de Phaser 3 : charger des images, afficher un joueur, gérer les déplacements, détecter des collisions et incrémenter un score.

## ⚙️ 1 — Préparation

Créez un dossier contenant :

- index.html
- script.js
- balloon.webp
- pieces.webp

Installez l’extension Live Server (VS Code).

Ajoutez Phaser dans le fichier index.html (dans le <head>):

<script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.js"></script>

## 🧩 2 — Configurer le jeu (10 min)

Dans script.js, commencez par créer la configuration Phaser :
```
const config = {
  type: Phaser.AUTO,
  width: ?,    // largeur du jeu
  height: ?,   // hauteur du jeu
  physics: {
    default: "arcade"
  },
  scene: { preload, create, update }
};
```

Créez ensuite les 3 fonctions nécessaires :

- function preload() {}
- function create() {}
- function update() {}

## 🖼️ 3 — Charger les images (5 min)

Dans preload(), chargez les images :
```
this.load.image("player", "balloon.webp");
this.load.image("coin", "pieces.webp");
this.load.image("background", "background.webp");
```

## 🎨 4 — Ajouter le joueur, la pièce et le background (10 min)

Dans create() :

- Ajoutez le joueur :
```
this.player = this.physics.add.sprite(x, y, "player");
this.player.setCollideWorldBounds(true);
```

- Ajoutez la pièce :
```
this.coin = this.physics.add.sprite(x, y, "coin");
```

- Ajustez leur taille :
```
this.player.setScale(0.5);
```

- Ajoutez un background qui couvre toute la scène :
```
const bg = this.add.image(0, 0, "background").setOrigin(0, 0);
bg.setDisplaySize(this.scale.width, this.scale.height);
```

## 🕹️ 5 — Déplacements du joueur (10 min)

Dans create() :
```
this.cursors = this.input.keyboard.createCursorKeys();
```

Dans update() :
```
if (this.cursors.left.isDown) {
  this.player.x -= 5;
}
if (this.cursors.right.isDown) {
  this.player.x += 5;
}
if (this.cursors.up.isDown) {
  this.player.y -= 5;
}
if (this.cursors.down.isDown) {
  this.player.y += 5;
}
```
## 💰 Étape 5 — Collision et score (10 min)

Dans create() :

Créez un score :
```
this.score = 0;
this.scoreText = this.add.text(10, 10, "Score : 0", {
  fontSize: "24px",
  fill: "#fff"
});
```

Ajoutez une collision entre joueur et pièce :
```
this.physics.add.overlap(this.player, this.coin, collectCoin, null, this);
```

Définissez la fonction collectCoin() :
```
function collectCoin() {
  this.score++;
  this.scoreText.setText(`Score : ${this.score}`);

  // Nouvelle position aléatoire
  this.coin.x = Phaser.Math.Between(0, this.scale.width);
  this.coin.y = Phaser.Math.Between(0, this.scale.height);
}
```
## ⭐ Bonus (facultatif)

- Ajouter plusieurs pièces (tableau de sprites).
- Ajouter un ennemi qui réduit le score lors d’une collision.
- Déplacer automatiquement la pièce sur l'écran.