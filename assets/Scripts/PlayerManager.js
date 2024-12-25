cc.Class({
    extends: cc.Component,

    properties: 
    {
        moveSpeed: 0,
        holeLevel: 0,

        level1: false,
        level2: false,
        level3: false,
    },

    onLoad ()
    {
        //Move
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onkeydown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onkeyup, this);
    
        this.moveDir = cc.v2(0, 0);

        //Collision
        var collision = cc.director.getCollisionManager();
        collision.enabled = true;
    },

    start () 
    {
        
    },

    update (dt) 
    {
        this.Move(dt);
    },

    //#region 移动
    onkeydown(event)
    {
        switch(event.keyCode)
        {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.moveDir.x = -1;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.moveDir.x = 1;
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                this.moveDir.y = 1;
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.moveDir.y = -1;
                break;
            default:
                break;
        }
    },

    onkeyup(event)
    {
        switch(event.keyCode)
        {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.moveDir.x = 0;
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.moveDir.y = 0;
                break;
            default:
                break;
        }
    },

    Move(dt)
    {
        if (!this.moveDir.equals(cc.v2(0, 0)))
        {
            this.node.position = this.node.position.add(this.moveDir.normalize().mul(this.moveSpeed * dt));
        }
    },
    //#endregion

    //#region 碰撞
    onCollisionEnter: function (other, self)
    {
        const entity = other.node.getComponent("EntityManager");
        var scaleNum = 0;

        if(this.holeLevel >= entity.entityID)
        {
            other.node.destroy();

            if(other.node.name == "People")
            {
                scaleNum = 0.02;
            }
            else if(other.node.name == "Car")
            {
                scaleNum = 0.03;
            }
            else if(other.node.name == "Tree")
            {
                scaleNum = 0.05;
            }
            else if(other.node.name == "Build")
            {
                scaleNum = 0.1;
            }

            this.node.scale += scaleNum;
            cc.find("GameManager").getComponent("GameManager").SetCameraZoom(scaleNum / 10);
            let uiManager = cc.find("Canvas/UIManager").getComponent("UIManager");

            //#region 升级
            if(this.node.scale >= 4 && this.level3 == false)
            {
                this.holeLevel++;
                this.level3 = true;
                uiManager.NextLevel(3);
            }
            if(this.node.scale >= 2 && this.level2 == false)
            {
                this.holeLevel++;
                this.level2 = true;
                uiManager.NextLevel(2);
            }
            if(this.node.scale >= 1.3 && this.level1 == false)
            {
                this.holeLevel++;
                this.level1 = true;
                uiManager.NextLevel(1);
            }

            cc.log(this.node.scale);
            cc.log(this.holeLevel);
            //#endregion
        }
    },
    //#endregion

    onDestroy()
    {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onkeydown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onkeyup, this);
    }
});
