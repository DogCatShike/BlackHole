cc.Class({
    extends: cc.Component,

    properties: 
    {
        prefabs: 
        {
            default: [],
            type: [cc.Prefab]
        },

        spawnTime: 0,
    },

    onLoad ()
    {
        this.schedule(this.SpawnPrefab, this.spawnTime);
        this.schedule(this.DestroyPrefab, this.spawnTime);
    },

    // start ()
    // {

    // },

    // update (dt)
    // {
        
    // },
    
    SetCameraZoom(scaleNum)
    {
        var camera = cc.find("Player/Main Camera");

        camera = camera.getComponent("cc.Camera");
        camera.zoomRatio -= scaleNum;
    },

    SpawnPrefab()
    {
        var playerPos = cc.find("Player").position;

        const randomIndex = Math.floor(Math.random() * this.prefabs.length);
        const prefab = cc.instantiate(this.prefabs[randomIndex]);
        
        const XPos = Math.floor(Math.random() * (800 - playerPos.x)) + playerPos.x;
        const YPos = Math.floor(Math.random() * (600 - playerPos.y)) + playerPos.y;
        const pos = cc.v2(XPos, YPos);

        this.node.addChild(prefab);
        prefab.setPosition(pos);
    },

    DestroyPrefab()
    {
        var playerPos = cc.find("Player").position;

        const maxX = playerPos.x + 800;
        const minX = playerPos.x - 800;
        const maxY = playerPos.y + 600;
        const minY = playerPos.y - 600;

        for(let i = this.node.children.length - 1; i >= 0; i--)
        {
            const prefab = this.node.children[i];
            const pos = prefab.position;

            if (pos.x < minX || pos.x > maxX || pos.y < minY || pos.y > maxY)
            {
                prefab.destroy();
            }
        }
    }
});
