class Main
{
    phaserGame = null;

    constructor()
    {
        var config = {
            type: Phaser.AUTO,
            backgroundColor: 0xe6e6e6,
            parent: 'natacao',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width: 1920,
                height: 1080,
            },
            dom: {
                createContainer: true
            },
            scene: [Titulo,Game,Fim]
        };
    
        this.phaserGame = new Phaser.Game(config);
    }
}