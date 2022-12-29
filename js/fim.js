class Fim extends Phaser.Scene 
{
    carregando = null;
    quemGanhou = null;

    constructor()
    {
        super("Fim");
    }

    init(data)
    {
        this.quemGanhou = data.quemGanhou;
    }

    preload()
    {
        this.criarCarregando();

        this.load.svg("inicio","img/botoes/inicio.svg");
        this.load.svg("VencedorNadador","img/VencedorNadador.svg");
        this.load.svg("VencedorNadadora","img/VencedorNadadora.svg");
    }

    create() 
    {
        this.carregando.destroy();
        this.criarBackground();
        this.criarImagemVencedor();
        this.criarBotaoInicio();        
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
    
    criarImagemVencedor()
    {
        var quemGanhou = this.captalizarPrimeiraLetra(this.quemGanhou);
        console.log("Vencedor" + quemGanhou);
        var vencedor = this.add.image(0,0,"Vencedor" + quemGanhou);
        vencedor.setOrigin(0,0);
    }

    captalizarPrimeiraLetra(texto)
    {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    }    

    criarBotaoInicio()
    {
        var inicio = this.add.image(1400,200,"inicio");
        inicio.setOrigin(0,0);
        inicio.setInteractive({ useHandCursor: true });
        inicio.on('pointerdown', function()
        {
            this.scene.start("Titulo");
        }.bind(this));
    }
    
}