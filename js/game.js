class Game extends Phaser.Scene 
{    
    competidor = "";
    oponente = "";
    competidorSprite = "";
    oponenteSprite = "";

    constructor()
    {
        super("Game");
    }

    init(data)
    {
        this.competidor = data.competidor;
        this.oponente = data.oponente;
    }

    preload()
    {
        this.criarCarregando();
        this.load.svg("background","img/cenario.svg");
        this.load.spritesheet('torcedora1', 'img/sprites/torcedora1.svg', { frameWidth: 185, frameHeight: 300})
        this.load.spritesheet('torcedora2', 'img/sprites/torcedora2.svg', { frameWidth: 185, frameHeight: 300})
        this.load.spritesheet('nadador', 'img/sprites/nadador.svg', { frameWidth: 500, frameHeight: 180})
        this.load.spritesheet('nadadora', 'img/sprites/nadadora.svg', { frameWidth: 500, frameHeight: 180})
    }

    create() 
    {        
        this.carregando.destroy();                

        this.criarBackground();
        this.criarTorcedora1();
        this.criarTorcedora2();
        this.criarAmimacoesNadando();
        this.criarOponente();
        this.criarCompetidor();
        this.criarAnimacaoDePreparacao();
    }

    criarCarregando()
    {
        this.carregando = this.add.text(
            0,0,"Carregando...",
            { fontSize:'25px',color:'#000000', fontFamily: "Arial" }
        );

        var xCentro = (this.scale.width - this.carregando.width) / 2;
        var yCentro = (this.scale.height - this.carregando.height) / 2;
        
        this.carregando.x = xCentro;
        this.carregando.y = yCentro;

        this.load.on('complete', function () {
            this.carregando.destroy();
        }.bind(this));
    }    

    criarBackground()
    {
        var background = this.add.image(0,0,"background");
        background.setOrigin(0,0);
    }

    criarTorcedora1()
    {
        this.anims.create({
            key: "torcer",
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNames('torcedora1', {start: 0, end:1})
        });

        var torcedora1 = this.add.sprite(300,740,"torcedora1");
        torcedora1.setOrigin(0,0);
        torcedora1.play("torcer");
    }

    criarTorcedora2()
    {
        this.anims.create({
            key: "torcer2",
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNames('torcedora2', {start: 0, end:1})
        });

        var torcedora2 = this.add.sprite(1200,740,"torcedora2");
        torcedora2.setOrigin(0,0);
        torcedora2.play("torcer2");
    }

    criarAmimacoesNadando()
    {
        this.anims.create({
            key: "nadadorNadando",
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNames('nadador', {start: 0, end:1})
        });

        this.anims.create({
            key: 'nadadorParado',
            frames: [ { key: 'nadador', frame: 0 } ],
            frameRate: 1
        });

        this.anims.create({
            key: 'nadadorBracada',
            frames: [ { key: 'nadador', frame: 1 } ],
            frameRate: 1
        });

        this.anims.create({
            key: "nadadoraNadando",
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNames('nadadora', {start: 0, end:1})
        });

        this.anims.create({
            key: 'nadadoraParado',
            frames: [ { key: 'nadadora', frame: 0 } ],
            frameRate: 2
        });

        this.anims.create({
            key: 'nadadoraBracada',
            frames: [ { key: 'nadadora', frame: 1 } ],
            frameRate: 1
        });
    }

    criarOponente()
    {
        this.oponenteSprite = this.add.sprite(1800,150,this.oponente);
        this.oponenteSprite.setOrigin(0,0);
    }

    criarCompetidor()
    {
        this.competidorSprite = this.add.sprite(1800,450,this.competidor);
        this.competidorSprite.setOrigin(0,0);
    }

    criarAnimacaoDePreparacao()
    {
        var preparacao = this.add.text(
            650, 5, 
            'EM SUAS MARCAS', 
            { font: "50px Arial Black", fill: "#ffff00", align: 'center'}
        );
        preparacao.setStroke('#666', 5);
        preparacao.setAlpha(0);

        var animacao = this.tweens.createTimeline();

        animacao.add({
            targets: preparacao,
            alpha: 1,
            duration: 500,
            repeat: 0,
            delay: 200
        });        

        animacao.add({
            targets: preparacao,
            alpha: 0,
            duration: 500,
            repeat: 0,
            delay: 200
            ,onComplete: function(){ 
                preparacao.text = "PREPARAR" 
            }
        });

        animacao.add({
            targets: preparacao,
            alpha: 1,
            duration: 500,
            repeat: 0,
            delay: 200
        });  

        animacao.add({
            targets: preparacao,
            alpha: 0,
            duration: 500,
            repeat: 0,
            delay: 200
            ,onComplete: function(){ 
                preparacao.text = "COMEÇAR!!!"                 
            }
        });

        animacao.add({
            targets: preparacao,
            alpha: 1,
            duration: 500,
            repeat: 0,
            delay: 200
        });  

        animacao.add({
            targets: preparacao,
            alpha: 0,
            duration: 500,
            repeat: 0,
            delay: 200
            ,onComplete: function(){ 
                this.iniciarCorrida();                 
            }.bind(this)
        });

        animacao.play();
    }

    iniciarCorrida()
    {
        this.competidorSprite.setInteractive({ useHandCursor: true });
        this.competidorSprite.on('pointerdown', function()
        {
            this.x -= 80;
        });

        this.tweens.add({
            targets: this.oponenteSprite
            ,x: -500
            ,duration: 5000
            ,onStart: function(){ this.oponenteSprite.play(this.oponente + "Nadando"); }.bind(this)
            ,onComplete: function(){ console.log("acabou"); }
        });
    }
}