class Bedroom extends Phaser.Scene {


    constructor() {
        super({key: "Example1"})
    }

    preload() {
        this.load.image('gameTiles1', 'assets/aye_kitchen.png');
        this.load.image('gameTiles2', 'assets/aye_tile_c.png');
        this.load.image('gameTiles3', 'assets/interior.png');
        this.load.image('gameTiles4', 'assets/tiles.png');
        this.load.image('gameTiles5', 'assets/tv.png');
        this.load.image('gameTiles6', 'assets/pc.png');
        this.load.tilemapTiledJSON('bedroom', 'assets/bma-mapC.json');
        this.load.spritesheet('player1',
            'assets/playerSpriteGreen.png',
            {frameWidth: 32, frameHeight: 36}
        );


    }


    create() {
        this.map = this.add.tilemap('bedroom');
        var tileset1 = this.map.addTilesetImage('int3', 'gameTiles1');
        var tileset2 = this.map.addTilesetImage('interieor2', 'gameTiles2');
        var tileset3 = this.map.addTilesetImage('interior', 'gameTiles3');
        var tileset4 = this.map.addTilesetImage('BMA-Game', 'gameTiles4');
        var tileset5 = this.map.addTilesetImage('tv', 'gameTiles5');
        var tileset6 = this.map.addTilesetImage('pc', 'gameTiles6');
        this.bottomLayer = this.map.createStaticLayer('Floor layer', [tileset4, tileset2, tileset3, tileset1]);
        this.middleLayer1 = this.map.createStaticLayer('carpet', [tileset4, tileset2, tileset3, tileset1, tileset6]);
        this.middleLayer2 = this.map.createDynamicLayer('edge', [tileset4, tileset2, tileset3, tileset1]);
        this.topLayer = this.map.createDynamicLayer('blocked', [tileset4, tileset2, tileset3, tileset1, tileset5, tileset6]);
        // Character
        this.player = this.physics.add.sprite(325, 325, "player1", "assets/playerSpriteGreen.png");
        //collision with wall & Objects
        this.topLayer.setCollisionByProperty({ collides: true });
        this.topLayer.setCollisionBetween(1,9999);
        this.physics.add.collider(this.player, this.topLayer);
        this.middleLayer2.setCollisionBetween(1,9999);
        this.physics.add.collider(this.player, this.middleLayer2);

        this.player.body.collideWorldBounds = true;

        this.moveKeys = this.input.keyboard.addKeys('W,S,A,D,UP,DOWN,LEFT,RIGHT,cursor');
        this.interactionKey = this.input.keyboard.addKeys('SPACE');
    }

    update() {
        //charactermovment
        this.player.body.velocity.y = 0;
        this.player.body.velocity.x = 0;

        //
        if (this.moveKeys.W.isDown || this.moveKeys.UP.isDown) {
            this.player.body.velocity.y -= 150;
        }
        if (this.moveKeys.S.isDown || this.moveKeys.DOWN.isDown) {
            this.player.body.velocity.y += 150;
        }
        if (this.moveKeys.A.isDown || this.moveKeys.LEFT.isDown) {
            this.player.body.velocity.x -= 150;
        }
        if (this.moveKeys.D.isDown || this.moveKeys.RIGHT.isDown) {
            this.player.body.velocity.x += 150;
        }

        if (this.interactionKey.SPACE.isDown) {
            //TODO AddAction
        }

    }

}