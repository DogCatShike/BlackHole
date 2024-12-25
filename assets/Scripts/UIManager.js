cc.Class({
    extends: cc.Component,

    properties: {
        images: 
        {
            default: [],
            type: [cc.Sprite]
        },
    },


    // onLoad () {},

    start () {

    },

    // update (dt) {},

    NextLevel(level)
    {
        let image = this.images[level];
        image.node.active = true;

        let text = cc.find("Canvas/UIManager/LevelText").getComponent("cc.Label");
        text.string = "Level" + (level);
    },

    OnStartButtonClick()
    {
        cc.director.loadScene("GameScene");
    }
});
