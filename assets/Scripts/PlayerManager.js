// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: 
    {
        moveSpeed: 0,
        holeLevel: 0,
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

        if(this.holeLevel >= entity.entityID)
        {
            other.node.destroy();

            if(other.node.name == "People")
            {
                this.node.scale += 0.02;
            }
            else if(other.node.name == "Car")
            {
                this.node.scale += 0.03;
            }
            else if(other.node.name == "Tree")
            {
                this.node.scale += 0.05;
            }
            else if(other.node.name == "Build")
            {
                this.node.scale += 0.1;
            }

            cc.find("Canvas/GameManager").getComponent("GameManager").SetCameraZoom(this.node.scale);
        }
    },
    //#endregion

    onDestroy()
    {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onkeydown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onkeyup, this);
    },
});
