const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 553,
    physics: {
        default: 'arcade'
    },
    scene: { preload, create, update }
};

function preload() {
    this.load.image('player', './img/balloon.png');
    this.load.image('piece', './img/piece.png');
    this.load.image('background', './img/background.png');
}
function create() {
    const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
    bg.setDisplaySize(800, 553);
    this.scoreText = this.add.text(10, 10, "score :", { fontSize: '24px', fill: '#fff' })
    this.nbPieces = Phaser.Math.Between(1, 10);
    this.pieces = this.physics.add.group();
    for (let i = 0; i < this.nbPieces; i++) {
        let piece = this.pieces.create(Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 553), 'piece');
        piece.setScale(0.1);
        //  this.pieces.create(piece);
    }

    /*  */

    /*   this.piece = this.physics.add.sprite(200, 200, 'piece');
       this.piece.setScale(0.1);
       this.piece.x = Phaser.Math.Between(0, 800);
       this.piece.y = Phaser.Math.Between(0, 553);*/
    this.score = 0;
    this.player = this.physics.add.sprite(50, 50, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.5);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.overlap(this.player, this.pieces, (player, piece) => {
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
           piece.x = Phaser.Math.Between(0, 800);
          piece.y = Phaser.Math.Between(0, 553);
    });
}

function update() {
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-50);
        this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(50);
        this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
        this.player.setVelocityY(-50);
        this.player.anims.play('up');
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(50);
        this.player.anims.play('down');
    }
}

const game = new Phaser.Game(config);