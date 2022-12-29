class Titulo extends Phaser.Scene 
{
    carregando = null;
    menino = null;
    menina = null;

    constructor()
    {
        super("Titulo");
    }

    preload()
    {
        this.criarCarregando();

        this.load.svg("menino","img/botoes/menino.svg");
        this.load.svg("menina","img/botoes/menina.svg");
        this.load.svg("menino_nadando","img/menino_nadando.svg");
        this.load.svg("menina_nadando","img/menina_nadando.svg");
                
        this.load.on('complete', function () {
            this.carregando.destroy();
        }.bind(this));
    }

    create() 
    {
        this.criarBackground();
        this.criarTituloJogo();
        this.criarCenaTitulo();
        this.criarBotoesIniciar();
        this.criarInstrucoes();
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
    }
    
    criarBackground()
    {
        var background = this.add.graphics();
        background.fillStyle(0xa5dff5, 1);
        background.fillRect(0, 0, 1920, 1080);
        background.setDepth(0);
    }

    criarTituloJogo()
    {
        this.titulo = this.add.text(0, 50, "NATAÇÃO", { font: "74px Arial Black", fill: "#ffffff" });
        this.titulo.setStroke('#000000', 5);
        this.titulo.setShadow(5, 5, "#333333", 10, false, true);
        this.titulo.x = (1920 - this.titulo.width) / 2;
    }

    criarBotoesIniciar()
    {
        this.menino = this.add.image(450,550,"menino");
        this.menino.setOrigin(0,0);
        this.menino.setInteractive({ useHandCursor: true });
        this.menino.on('pointerdown', function()
        {
            this.scene.start("Game",{ competidor: "nadador", oponente: "nadadora" });
        }.bind(this));

        this.menina = this.add.image(1280,550,"menina");
        this.menina.setOrigin(0,0);
        this.menina.setInteractive({ useHandCursor: true });
        this.menina.on('pointerdown', function()
        {
            this.scene.start("Game",{ competidor: "nadadora", oponente: "nadador" });
        }.bind(this));

    }

    criarCenaTitulo()
    {
        var meninoNadando = this.add.image(300,300,"menino_nadando");        
        meninoNadando.setOrigin(0,0);        

        var meninoNadando = this.add.image(1100,300,"menina_nadando");        
        meninoNadando.setOrigin(0,0);
    }

    criarInstrucoes()
    {
        this.instrucoes = this.add.text(
            220, 750, 
            'Para iniciar o jogo, escolha o seu competidor: menino ou menina. Depois, clique o mais rápido que puder em seu competidor para vencer a prova.', 
            { font: "50px Arial Black", fill: "#ffffff", align: 'center', wordWrap: { width: 1500 } }
        );
        this.instrucoes.setStroke('#000000', 5);

        this.instrucoes.x = (1920 - 1500) / 2;
    }
    
}