(()=>{"use strict";var e,t={480:(e,t,s)=>{var i=s(440);class a extends Phaser.Scene{constructor(){super({key:"BootScene"})}preload(){this.cameras.main.setBackgroundColor(0),this.createLoadingGraphics(),this.load.on("progress",(e=>{this.progressBar.clear(),this.progressBar.fillStyle(8971347,1),this.progressBar.fillRect(this.cameras.main.width/4,this.cameras.main.height/2-16,this.cameras.main.width/2*e,16)}),this),this.load.on("complete",(()=>{this.progressBar.destroy(),this.loadingBar.destroy()}),this),this.load.pack("preload","./assets/pack.json","preload");const e=new i.GameObjects.Graphics(this,{fillStyle:{color:0}});e.fillRect(0,0,this.scale.width,this.scale.height),e.generateTexture("black",this.scale.width,this.scale.height)}create(){this.anims.create({key:"explosion",frames:[{key:"explosion-01"},{key:"explosion-02"},{key:"explosion-03"},{key:"explosion-04"},{key:"explosion-05"},{key:"explosion-06"},{key:"explosion-07"},{key:"explosion-08"}],frameRate:12,repeat:0}),this.anims.create({key:"flash-a",frames:[{key:"flash-a-01"},{key:"flash-a-02"},{key:"flash-a-03"}],frameRate:12,repeat:0})}update(){this.scene.start("MenuScene")}createLoadingGraphics(){this.loadingBar=this.add.graphics(),this.loadingBar.fillStyle(16777215,1),this.loadingBar.fillRect(this.cameras.main.width/4-2,this.cameras.main.height/2-18,this.cameras.main.width/2+4,20),this.progressBar=this.add.graphics()}}const h=a;class n extends Phaser.GameObjects.Image{constructor(e){super(e.scene,e.x,e.y,e.texture),this.isDestoyed=!1,this.rotation=e.rotation,this.initImage(),this.scene.add.existing(this)}pause(){this.originalVelocity=new Phaser.Math.Vector2(this.body.velocity.x,this.body.velocity.y),this.body.setVelocity(0,0),this.explosionSprite&&this.explosionSprite.anims.pause()}resume(){this.originalVelocity&&this.body.setVelocity(this.originalVelocity.x,this.originalVelocity.y),this.explosionSprite&&this.explosionSprite.anims.isPaused&&this.explosionSprite.anims.resume()}initImage(){this.bulletSpeed=1e3,this.setOrigin(.5,.5),this.setDepth(.5),this.scene.physics.world.enable(this),this.scene.physics.velocityFromRotation(this.rotation-Math.PI/2,this.bulletSpeed,this.body.velocity)}explode(){this.isDestoyed||(this.isDestoyed=!0,this.explosionSprite=this.scene.add.sprite(this.x,this.y,"explosion-01").play("explosion"),this.explosionSprite.setScale(.5),this.explosionSprite.on("animationcomplete",(()=>{var e;null===(e=this.explosionSprite)||void 0===e||e.destroy(),this.explosionSprite=null,this.destroy()})),this.setVisible(!1),this.body.enable=!1)}}const r=n;class o extends Phaser.GameObjects.GameObject{constructor(e,t,s,i,a,h=1e3){super(e,"tireTrack"),this.follow=i,this.emitter=new Phaser.GameObjects.Particles.ParticleEmitter(e,t,s,"tireTrack",{lifespan:h,alpha:{start:1,end:0},follow:i,frequency:a}),this.emitter.onParticleEmit((e=>{e.angle=Phaser.Math.RadToDeg(i.rotation)})),this.scene.add.existing(this.emitter)}setDepth(e){this.emitter.setDepth(e)}start(){this.emitter.start()}stop(){this.emitter.stop()}destroy(e){this.emitter.stop();let t=()=>{0===this.emitter.getAliveParticleCount()?(super.destroy(e),this.emitter.destroy()):this.scene.time.delayedCall(100,t)};t()}}const l=o;class c extends Phaser.GameObjects.Image{getBullets(){return this.bullets}constructor(e){super(e.scene,e.x,e.y,e.texture,e.frame),this.isPaused=!1,this.handleBarrelRotation=e=>{const t=e.positionToCamera(this.scene.cameras.main);this.barrel.rotation=Phaser.Math.Angle.Between(this.barrel.x,this.barrel.y,t.x,t.y)+Math.PI/2},this.initImage(),this.scene.add.existing(this)}pause(){this.body.setVelocity(0,0),this.scene.input.keyboard.disableGlobalCapture(),this.scene.input.off("pointermove",this.handleBarrelRotation),this.scene.input.off("pointerdown",this.handleShooting),this.isPaused=!0}resume(){this.scene.input.keyboard.enableGlobalCapture(),this.scene.input.on("pointermove",this.handleBarrelRotation,this),this.scene.input.on("pointerdown",this.handleShooting,this),this.isPaused=!1}initImage(){this.health=1,this.lastShoot=0,this.speed=300,this.angularSpeed=.03,this.setOrigin(.5,.5),this.setDepth(0),this.angle=180,this.barrel=this.scene.add.image(this.x,this.y,"barrelBlue"),this.barrel.setOrigin(.5,1),this.barrel.setDepth(1),this.barrel.angle=180,this.lifeBar=this.scene.add.graphics(),this.redrawLifebar(),this.bullets=this.scene.add.group({active:!0,maxSize:10,runChildUpdate:!0}),this.cursors=this.scene.input.keyboard.createCursorKeys(),this.wasdKeys={up:this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),down:this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),left:this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),right:this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)},this.scene.input.on("pointermove",this.handleBarrelRotation,this),this.scene.input.on("pointerdown",this.handleShooting,this),this.movementIndicator=this.scene.add.image(0,-50,"lineArrow"),this.movementIndicator.setOrigin(0,.5),this.movementIndicator.setScale(.03),this.movementIndicator.setDepth(0),this.movementIndicator.setRotation(-Math.PI/2),this.movementIndicator.setAlpha(.8),this.tireTracks=new l(this.scene,0,0,this,80),this.tankContainer=this.scene.add.container(this.x,this.y,[this.movementIndicator]),this.scene.physics.world.enable(this)}update(){this.isPaused||(this.active?(this.barrel.x=this.x,this.barrel.y=this.y,this.lifeBar.x=this.x,this.lifeBar.y=this.y,this.handleInput()):this.destroy())}destroy(){this.barrel.destroy(),this.lifeBar.destroy(),this.tireTracks.destroy(),this.scene.input.off("pointermove",this.handleBarrelRotation),this.scene.input.off("pointerdown",this.handleShooting),super.destroy()}handleInput(){this.cursors.up.isDown||this.wasdKeys.up.isDown?this.scene.physics.velocityFromRotation(this.rotation-Math.PI/2,this.speed,this.body.velocity):this.cursors.down.isDown||this.wasdKeys.down.isDown?this.scene.physics.velocityFromRotation(this.rotation-Math.PI/2,-this.speed,this.body.velocity):this.body.setVelocity(0,0),this.cursors.left.isDown||this.wasdKeys.left.isDown?this.rotation-=this.angularSpeed:(this.cursors.right.isDown||this.wasdKeys.right.isDown)&&(this.rotation+=this.angularSpeed),this.tankContainer.setPosition(this.x,this.y),this.tankContainer.setRotation(this.rotation)}handleShooting(e){if(e.leftButtonDown()&&this.scene.time.now>this.lastShoot){this.scene.cameras.main.shake(20,.005),this.scene.tweens.add({targets:this,props:{alpha:.8},delay:0,duration:5,ease:"Power1",easeParams:null,hold:0,repeat:0,repeatDelay:0,yoyo:!0,paused:!1});let e=this.barrel.x+58*Math.sin(this.barrel.rotation),t=this.barrel.y-58*Math.cos(this.barrel.rotation);this.bullets.getLength()<10&&(this.bullets.add(new r({scene:this.scene,rotation:this.barrel.rotation,x:e,y:t,texture:"bulletBlue"})),this.lastShoot=this.scene.time.now+80)}}redrawLifebar(){this.lifeBar.clear(),this.lifeBar.fillStyle(15100456,1),this.lifeBar.fillRect(-this.width/2,this.height/2,this.width*this.health,15),this.lifeBar.lineStyle(2,16777215),this.lifeBar.strokeRect(-this.width/2,this.height/2,this.width,15),this.lifeBar.setDepth(1)}updateHealth(){this.health>0?(this.health-=.025,this.redrawLifebar()):(this.health=0,this.active=!1,this.scene.scene.start("MenuScene"))}}const d=c;class p extends Phaser.GameObjects.Image{getBarrel(){return this.barrel}getBullets(){return this.bullets}constructor(e){super(e.scene,e.x,e.y,e.texture,e.frame),this.originalVelocity=new Phaser.Math.Vector2(0,0),this.isPaused=!1,this.initContainer(),this.scene.add.existing(this)}pause(){this.isPaused||(this.originalVelocity.x=this.body.velocity.x,this.originalVelocity.y=this.body.velocity.y,this.body.setVelocity(0,0),this.moveTween.pause(),this.isPaused=!0)}resume(){this.isPaused&&(this.body.setVelocity(this.originalVelocity.x,this.originalVelocity.y),this.moveTween.resume(),this.isPaused=!1)}initContainer(){this.health=1,this.lastShoot=0,this.speed=100,this.setDepth(0),this.barrel=this.scene.add.image(0,0,"barrelRed"),this.barrel.setOrigin(.5,1),this.barrel.setDepth(1),this.lifeBar=this.scene.add.graphics(),this.redrawLifebar(),this.bullets=this.scene.add.group({active:!0,maxSize:10,runChildUpdate:!0}),this.moveTween=this.scene.tweens.add({targets:this,props:{y:this.y-200},delay:0,duration:2e3,ease:"Linear",easeParams:null,hold:0,repeat:-1,repeatDelay:0,yoyo:!0}),this.tireTracks=new l(this.scene,0,0,this,200,1500),this.scene.physics.world.enable(this)}update(){this.isPaused||(this.active?(this.barrel.x=this.x,this.barrel.y=this.y,this.lifeBar.x=this.x,this.lifeBar.y=this.y,this.handleShooting()):this.destroy())}destroy(e){this.barrel.destroy(),this.lifeBar.destroy(),this.tireTracks.destroy(),super.destroy(e)}handleShooting(){this.scene.time.now>this.lastShoot&&this.bullets.getLength()<10&&(this.bullets.add(new r({scene:this.scene,rotation:this.barrel.rotation,x:this.barrel.x,y:this.barrel.y,texture:"bulletRed"})),this.lastShoot=this.scene.time.now+400)}redrawLifebar(){this.lifeBar.clear(),this.lifeBar.fillStyle(15100456,1),this.lifeBar.fillRect(-this.width/2,this.height/2,this.width*this.health,15),this.lifeBar.lineStyle(2,16777215),this.lifeBar.strokeRect(-this.width/2,this.height/2,this.width,15),this.lifeBar.setDepth(1)}updateHealth(){this.health>0?(this.health-=.15,this.redrawLifebar()):(this.health=0,this.active=!1)}}const u=p;class y extends Phaser.GameObjects.Image{constructor(e){super(e.scene,e.x,e.y,e.texture),this.initImage(),this.scene.add.existing(this)}initImage(){this.setOrigin(0,0),this.scene.physics.world.enable(this),this.body.setImmovable(!0)}update(){}}const T=y,m=class{constructor(e,t){this.objects=[],this.scene=e,this.objects=t}setObjectFromScene(e){const t=e.sys.updateList.getActive().filter((e=>"pause"in e&&"function"==typeof e.pause&&"resume"in e&&"function"==typeof e.resume)),s=e.sys.displayList.list.filter((e=>"pause"in e&&"function"==typeof e.pause&&"resume"in e&&"function"==typeof e.resume));this.objects=[...t,...s]}pause(){this.objects.forEach((e=>{e.pause()}))}resume(){this.objects.forEach((e=>{e.resume()}))}},g=class{static applyScaleTweens(e,t,s,i=e.scaleX,a=e.scaleY,h=.95,n=100){let r,o=!1,l=null,c=null;const d=()=>{c&&c.complete(),r=new Phaser.Math.Vector2(i,a);const t=r.x*h,s=r.y*h;o=!0,l=e.scene.tweens.add({targets:e,scaleX:t,scaleY:s,duration:n,ease:"Linear",onComplete:()=>{e.setScale(t,s),l=null}})},p=()=>{o&&(l&&l.stop(),o=!1,c=e.scene.tweens.add({targets:e,scaleX:r.x,scaleY:r.y,duration:n,ease:"Linear",onComplete:()=>{e.setScale(r.x,r.y),c=null}}))};"string"==typeof t&&(t=[t]),t.forEach((t=>{e.on(t,d)})),"string"==typeof s&&(s=[s]),s.forEach((t=>{e.on(t,p)}))}static applyDisplaySizeTweens(e,t,s,i=e.displayWidth,a=e.displayHeight,h=.95,n=100){let r,o=!1,l=null,c=null;const d=()=>{c&&c.complete(),r=new Phaser.Math.Vector2(i,a);const t=r.x*h,s=r.y*h;o=!0,l=e.scene.tweens.add({targets:e,displayWidth:t,displayHeight:s,duration:n,ease:"Linear",onComplete:()=>{e.setDisplaySize(t,s),l=null}})},p=()=>{o&&(l&&l.stop(),o=!1,c=e.scene.tweens.add({targets:e,displayWidth:r.x,displayHeight:r.y,duration:n,ease:"Linear",onComplete:()=>{e.setDisplaySize(r.x,r.y),c=null}}))};"string"==typeof t&&(t=[t]),t.forEach((t=>{e.on(t,d)})),"string"==typeof s&&(s=[s]),s.forEach((t=>{e.on(t,p)}))}static applyTintTweens(e,t,s,i=16777215,a=0,h=100){let n=!1,r=null,o=null;const l=()=>{o&&o.complete(),n=!0,r=e.scene.tweens.add({targets:e,tint:{from:i,to:a},duration:h,ease:"Linear",onUpdate:t=>{let s=Phaser.Display.Color.Interpolate.ColorWithColor(Phaser.Display.Color.ValueToColor(i),Phaser.Display.Color.ValueToColor(a),100,100*r.progress);e.setTint(s.r<<16|s.g<<8|s.b)},onComplete:()=>{e.setTint(a),r=null},onStop:()=>{e.setTint(a),r=null}})},c=()=>{n&&(r&&r.stop(),n=!1,o=e.scene.tweens.add({targets:e,tint:{from:a,to:i},duration:h,ease:"Linear",onUpdate:()=>{let t=Phaser.Display.Color.Interpolate.ColorWithColor(Phaser.Display.Color.ValueToColor(a),Phaser.Display.Color.ValueToColor(i),100,100*o.progress);e.setTint(t.r<<16|t.g<<8|t.b)},onComplete:()=>{e.setTint(i),o=null}}))};"string"==typeof t&&(t=[t]),t.forEach((t=>{e.on(t,l)})),"string"==typeof s&&(s=[s]),s.forEach((t=>{e.on(t,c)}))}static applyAlphaTweens(e,t,s,i=1,a=0,h=100){let n=!1,r=null,o=null;const l=()=>{o&&o.complete(),n=!0,r=e.scene.tweens.add({targets:e,alpha:{from:i,to:a},duration:h,ease:"Linear",onUpdate:()=>{e.setAlpha(e.alpha)},onComplete:()=>{e.setAlpha(a),r=null}})},c=()=>{n&&(r&&r.stop(),n=!1,o=e.scene.tweens.add({targets:e,alpha:{from:a,to:i},duration:h,ease:"Linear",onUpdate:()=>{e.setAlpha(e.alpha)},onComplete:()=>{e.setAlpha(i),o=null}}))};"string"==typeof t&&(t=[t]),t.forEach((t=>{e.on(t,l)})),"string"==typeof s&&(s=[s]),s.forEach((t=>{e.on(t,c)}))}};class b extends Phaser.GameObjects.Container{constructor(e,t,s){super(e,t,s),this.scene.add.existing(this),this.setScrollFactor(0,0),this.hitArea=new Phaser.GameObjects.Zone(e,0,0,0,0),this.hitArea.setScrollFactor(0,0),this.add(this.hitArea)}add(e,t="Center",s=0,i=0){if(Array.isArray(e))return e.forEach((e=>{this.add(e,t,s,i)})),this;switch(t){case"TopLeft":Phaser.Display.Align.In.TopLeft(e,this.hitArea,s,i);break;case"TopCenter":Phaser.Display.Align.In.TopCenter(e,this.hitArea,s,i);break;case"TopRight":Phaser.Display.Align.In.TopRight(e,this.hitArea,s,i);break;case"LeftCenter":Phaser.Display.Align.In.LeftCenter(e,this.hitArea,s,i);break;case"Center":Phaser.Display.Align.In.Center(e,this.hitArea,s,i);break;case"RightCenter":Phaser.Display.Align.In.RightCenter(e,this.hitArea,s,i);break;case"BottomLeft":Phaser.Display.Align.In.BottomLeft(e,this.hitArea,s,i);break;case"BottomCenter":Phaser.Display.Align.In.BottomCenter(e,this.hitArea,s,i);break;case"BottomRight":Phaser.Display.Align.In.BottomRight(e,this.hitArea,s,i);break;default:Phaser.Display.Align.In.Center(e,this)}return super.add(e),this}setSize(e,t){return this.hitArea.setSize(e,t),super.setSize(e,t),this}getHitArea(){return this.hitArea}}const E=b;class f extends E{constructor(e,t,s,i,a){super(e,t,s),this.isHovered=!1,this.image=new Phaser.GameObjects.Image(e,0,0,i,a),this.add(this.image),this.setSize(this.image.width,this.image.height)}clearTint(){return this.image.clearTint(),this}setSize(e,t){return this.image.setSize(e,t),super.setSize(e,t),this}setTint(e,t,s,i){this.image.setTint(e,t,s,i);for(let a=0;a<this.list.length;a++){let h=this.list[a];"setTint"in h&&"function"==typeof h.setTint&&h.setTint(e,t,s,i)}return this}setTintFill(e,t,s,i){return this.image.setTintFill(e,t,s,i),this}setTexture(e,t){return this.image.setTexture(e,t),this}setInteractive(e,t,s){return this.hitArea.setInteractive(e,t,s),this.hitArea.on("pointerover",this.enterHoverState,this),this.hitArea.on("pointerout",this.enterRestState,this),super.setInteractive(),this}disableInteractive(){return this.hitArea.off("pointerover",this.enterHoverState,this),this.hitArea.off("pointerout",this.enterRestState,this),this.hitArea.disableInteractive(),super.disableInteractive(),this}enterHoverState(){this.isHovered=!0,this.emit(f.BUTTON_HOVER_EVENT)}enterRestState(){this.isHovered&&(this.isHovered=!1,this.emit(f.BUTTON_REST_EVENT))}}f.BUTTON_HOVER_EVENT="hover",f.BUTTON_REST_EVENT="rest";const w=f;class S extends w{constructor(e,t,s,i,a){super(e,t,s,i,a),this.isClicked=!1,this.setInteractive()}setInteractive(e,t,s){return this.hitArea.setInteractive({useHandCursor:!0}),this.hitArea.on("pointerdown",this.enterPressDownState,this),this.hitArea.on("pointerup",this.enterPressUpState,this),this.hitArea.on("pointerover",this.enterHoverState,this),this.hitArea.on("pointerout",this.enterRestState,this),super.setInteractive(),this}disableInteractive(){return this.hitArea.off("pointerdown",this.enterPressDownState,this),this.hitArea.off("pointerup",this.enterPressUpState,this),this.hitArea.off("pointerover",this.enterHoverState,this),this.hitArea.off("pointerout",this.enterRestState,this),this.hitArea.disableInteractive(),super.disableInteractive(),this}enterRestState(){this.isHovered&&(this.isHovered=!1,this.isClicked&&(this.isClicked=!1),this.emit(w.BUTTON_REST_EVENT))}enterPressDownState(){this.isClicked=!0,this.emit(S.BUTTON_DOWN_EVENT)}enterPressUpState(){this.isClicked&&(this.isClicked=!1,this.emit(S.BUTTON_UP_EVENT))}}S.BUTTON_DOWN_EVENT="buttondown",S.BUTTON_UP_EVENT="buttonup",S.BUTTON_HOVER_EVENT="hover",S.BUTTON_REST_EVENT="rest";const _=S;class B extends w{constructor(e,t,s,i){super(e,0,0,"black"),this.isEnabled=!1,this.setDisplaySize(e.scale.width,e.scale.height),this.setSize(e.scale.width,e.scale.height),this.setPosition(e.scale.width/2,e.scale.height/2),this.setAlpha(0),this.from=t,this.to=s,this.duration=i,this.setInteractive()}setInteractive(){return g.applyAlphaTweens(this,[B.BLACK_UI_IMAGE_ENABLE_EVENT],[B.BLACK_UI_IMAGE_DISABLE_EVENT],this.from,this.to,this.duration),this}disableInteractive(){return this.off(B.BLACK_UI_IMAGE_ENABLE_EVENT),this.off(B.BLACK_UI_IMAGE_DISABLE_EVENT),this}}B.BLACK_UI_IMAGE_ENABLE_EVENT="enable",B.BLACK_UI_IMAGE_DISABLE_EVENT="disable";const U=B;class N extends w{constructor(e,t,s,i,a,h,n,r=1,o=!1,l){super(e,t,s,i,l),this.start=a,this.end=h,this.currentValue=0,this.knob=n,this.mustKnobDrag=o,this.dragSpeed=r,this.add(this.knob),this.bringToTop(this.knob),this.setValue(0),this.setInteractive()}getValue(){return this.currentValue}setValue(e){const t=Phaser.Math.Clamp(e,0,1),s=this.start.lerp(this.end,t);this.knob.setPosition(s.x,s.y),this.updateValue(s)}updateValue(e){const t=this.start.distance(this.end),s=this.start.distance(e)/t;s!==this.currentValue&&(this.emit(N.VALUE_CHANGED_EVENT,this.currentValue,s),this.currentValue=s)}setInteractive(e,t,s){return this.knob?(this.knob.setInteractive({useHandCursor:!0,draggable:!0}),this.knob.getHitArea().on("drag",this.dragKnob,this),this.knob.getHitArea().on("dragstart",this.startDragKnob,this),this.knob.getHitArea().on("dragend",this.endDragKnob,this)):console.error("Knob is not initialized."),this.hitArea.on("pointerdown",this.enterPressDownState,this),this.hitArea.on("pointerup",this.enterPressUpState,this),this.hitArea.on("pointerover",this.enterHoverState,this),this.hitArea.on("pointerout",this.enterRestState,this),this}disableInteractive(){return this.scene.input.setDraggable(this.knob,!1),this.knob.getHitArea().off("drag",this.dragKnob,this),this.knob.getHitArea().off("dragstart",this.startDragKnob,this),this.knob.getHitArea().off("dragend",this.endDragKnob,this),this.hitArea.off("pointerdown",this.enterPressDownState,this),this.hitArea.off("pointerup",this.enterPressUpState,this),this.hitArea.off("pointerover",this.enterHoverState,this),this.hitArea.off("pointerout",this.enterRestState,this),this.hitArea.disableInteractive(),super.disableInteractive(),this}startDragKnob(e,t,s){this.dragPosition=new Phaser.Math.Vector2(this.knob.x,this.knob.y)}endDragKnob(e,t,s){this.dragPosition=new Phaser.Math.Vector2(this.knob.x,this.knob.y)}dragKnob(e,t,s){let i=new Phaser.Math.Vector2(Phaser.Math.Clamp(t*this.dragSpeed+this.dragPosition.x,this.start.x,this.end.x),Phaser.Math.Clamp((s*this.dragSpeed+this.dragPosition.y)*this.dragSpeed,this.start.y,this.end.y));this.knob.setPosition(i.x,i.y),this.updateValue(i)}enterRestState(){this.isHovered&&(this.isHovered=!1,this.isClicked&&(this.isClicked=!1),this.emit(N.BUTTON_REST_EVENT))}enterPressDownState(){this.isClicked=!0,this.emit(N.BUTTON_DOWN_EVENT)}enterPressUpState(){this.isClicked&&(this.isClicked=!1,this.emit(N.BUTTON_UP_EVENT))}}N.BUTTON_DOWN_EVENT="buttondown",N.BUTTON_UP_EVENT="buttonup",N.VALUE_CHANGED_EVENT="valuechanged";const x=N,P=class extends E{constructor(e,t,s,i,a){super(e,t,s),e.add.existing(this),this.onTexture=i,this.offTexture=a;const h=new x(this.scene,0,0,"slim-slider-frame",new Phaser.Math.Vector2(-600,0),new Phaser.Math.Vector2(600,0),new w(this.scene,0,0,"slim-slider-red-button"),3);h.setScale(.7),this.add(h,"Center",100,0),this.slider=h;const n=new w(this.scene,0,0,"slim-slider-background");h.add(n,"Center"),h.sendToBack(n),h.on(x.VALUE_CHANGED_EVENT,((e,t)=>{console.log("Music volume changed to",t),this.musicButton.setTexture(0===t?this.offTexture:this.onTexture)}));const r=new _(this.scene,0,0,i);r.setScale(.7),this.add(r,"Center",-550,0),this.musicButton=r}};class V extends i.GameObjects.Graphics{constructor(e,t,s){super(e),e.add.existing(this),this.createPlayUi(),this.createPauseUi(),this.blackBackground=new U(e,0,.4,200),this.blackBackground.setDepth(999),this.blackSceneTransition=new U(e,1,0,700),this.blackSceneTransition.setDepth(2e3),this.pauseController=new m(e,[]),this.initializeSceneLoad()}createPlayUi(){this.playUi=new E(this.scene,0,0),this.playUi.setSize(this.scene.scale.width,this.scene.scale.height),this.playUi.setPosition(this.scene.scale.width/2,this.scene.scale.height/2),this.playUi.setDepth(1e3);const e=new _(this.scene,100,100,"icon-small-white-outline-pause");e.setScale(.6),e.on(_.BUTTON_UP_EVENT,this.showPauseUi,this),g.applyTintTweens(e,_.BUTTON_DOWN_EVENT,[_.BUTTON_UP_EVENT,_.BUTTON_REST_EVENT],16777215,12105912,200),g.applyScaleTweens(e,_.BUTTON_HOVER_EVENT,_.BUTTON_REST_EVENT,e.scaleX,e.scaleY,1.1,100),this.playUi.add(e,"TopLeft",-30,-30),console.log("playUi",this.playUi,this.playUi.displayWidth,this.playUi.displayHeight,this.playUi.width,this.playUi.height,this.playUi.scaleX,this.playUi.scaleY,this.playUi.x,this.playUi.y),console.log("pauseButton",e,e.displayWidth,e.displayHeight,e.width,e.height,e.scaleX,e.scaleY,e.x,e.y)}createPauseUi(){this.pauseUi=new E(this.scene,0,0),this.pauseUi.setSize(this.scene.scale.width,this.scene.scale.height),this.pauseUi.setPosition(this.scene.scale.width/2,this.scene.scale.height/2),this.pauseUi.setDepth(1e3);const e=new w(this.scene,0,0,"box-white-outline-rounded");e.setScale(.5),this.pauseUi.add(e,"Center");const t=this.scene.add.text(0,0,"PAUSED",{fontFamily:"bold Arial",fontSize:120,color:"#ffffff"});e.add(t,"TopCenter",0,-200);const s=new _(this.scene,0,0,"icon-button-large-red-square");s.setScale(.8),e.add(s,"BottomLeft",-150,-100);const i=this.scene.add.image(0,0,"icon-small-white-outline-home");i.setScale(1.2),s.add(i,"Center"),s.on(_.BUTTON_UP_EVENT,(()=>{this.scene.time.delayedCall(700,(()=>this.scene.scene.start("MenuScene"))),this.blackSceneTransition.emit(U.BLACK_UI_IMAGE_DISABLE_EVENT)})),g.applyTintTweens(s,_.BUTTON_DOWN_EVENT,[_.BUTTON_UP_EVENT,_.BUTTON_REST_EVENT],16777215,12105912,200),g.applyScaleTweens(s,_.BUTTON_HOVER_EVENT,_.BUTTON_REST_EVENT,s.scaleX,s.scaleY,1.1,100);const a=new _(this.scene,0,0,"icon-button-large-blue-square");a.setScale(.8),e.add(a,"BottomCenter",0,-100);const h=this.scene.add.image(0,0,"icon-small-white-outline-return");h.setScale(1.2),a.add(h,"Center"),a.on(_.BUTTON_UP_EVENT,(()=>{this.scene.time.delayedCall(700,(()=>this.scene.scene.start("GameScene"))),this.blackSceneTransition.emit(U.BLACK_UI_IMAGE_DISABLE_EVENT)})),g.applyTintTweens(a,_.BUTTON_DOWN_EVENT,[_.BUTTON_UP_EVENT,_.BUTTON_REST_EVENT],16777215,12105912,200),g.applyScaleTweens(a,_.BUTTON_HOVER_EVENT,_.BUTTON_REST_EVENT,a.scaleX,a.scaleY,1.1,100);const n=new _(this.scene,0,0,"icon-button-large-green-square");n.setScale(.8),e.add(n,"BottomRight",-150,-100);const r=this.scene.add.image(0,0,"icon-small-white-outline-arrow");r.setScale(1.2),n.add(r,"Center"),n.on(_.BUTTON_UP_EVENT,this.hidePauseUi,this),g.applyTintTweens(n,_.BUTTON_DOWN_EVENT,[_.BUTTON_UP_EVENT,_.BUTTON_REST_EVENT],16777215,12105912,200),g.applyScaleTweens(n,_.BUTTON_HOVER_EVENT,_.BUTTON_REST_EVENT,n.scaleX,n.scaleY,1.1,100);let o=new P(this.scene,0,0,"icon-large-music-blank","icon-large-music-off-blank");e.add(o,"BottomCenter",0,-700);let l=new P(this.scene,0,0,"icon-large-audio-blank","icon-large-audio-off-blank");e.add(l,"BottomCenter",0,-1e3)}initializeSceneLoad(){this.playUi.setVisible(!0),this.pauseUi.setVisible(!1),this.blackSceneTransition.emit(U.BLACK_UI_IMAGE_ENABLE_EVENT)}showPauseUi(){this.pauseUi.setVisible(!0),this.playUi.setVisible(!1),this.pauseController.setObjectFromScene(this.scene),this.pauseController.pause(),this.blackBackground.emit(U.BLACK_UI_IMAGE_ENABLE_EVENT)}hidePauseUi(){this.pauseUi.setVisible(!1),this.playUi.setVisible(!0),this.pauseController.resume(),this.blackBackground.emit(U.BLACK_UI_IMAGE_DISABLE_EVENT)}showSettingUi(){this.pauseUi.setVisible(!0)}showLoseUi(){this.playUi.setVisible(!1)}showWinUi(){this.playUi.setVisible(!1)}}const v=V,A=class{constructor(e){this.sounds=[],this.scene=e,this.scene.data.set("audioController",this),this.musicConfig={loop:!0,volume:.5},this.soundConfig={volume:1}}adjustMusicVolume(e){this.musicConfig.volume=e,this.music.isPlaying&&this.music.setVolume(e)}adjustSoundVolume(e){this.soundConfig.volume=e,this.sounds.forEach((t=>{t.isPlaying&&t.setVolume(e)}))}playSound(e){const t=this.scene.sound.add(e,this.soundConfig);t.play(),this.sounds.push(t),t.on("complete",(()=>{const e=this.sounds.indexOf(t);-1!==e&&this.sounds.splice(e,1)}))}stopSound(e){const t=this.sounds.findIndex((t=>t.key===e));-1!==t&&(this.sounds[t].stop(),this.sounds.splice(t,1))}playMusic(e){this.music.isPlaying&&this.music.stop(),this.music=this.scene.sound.add(e,this.musicConfig)}};class C extends Phaser.Scene{constructor(){super({key:"GameScene"})}init(){}create(){this.map=this.make.tilemap({key:"levelMap"}),this.tileset=this.map.addTilesetImage("tiles"),this.layer=this.map.createLayer("tileLayer",this.tileset,0,0),this.layer.setCollisionByProperty({collide:!0}),this.obstacles=this.add.group({runChildUpdate:!0}),this.enemies=this.add.group({}),this.convertObjects(),this.physics.add.collider(this.player,this.layer),this.physics.add.collider(this.player,this.obstacles),console.log(this.layer),this.physics.add.overlap(this.player.getBullets(),this.layer,this.bulletHitLayer,void 0,this),this.physics.add.overlap(this.player.getBullets(),this.obstacles,this.bulletHitObstacles,void 0,this),this.enemies.getChildren().forEach((e=>{let t=e;this.physics.add.overlap(this.player.getBullets(),e,this.playerBulletHitEnemy,void 0,this),this.physics.add.overlap(t.getBullets(),this.player,this.enemyBulletHitPlayer,void 0),this.physics.add.overlap(t.getBullets(),this.obstacles,this.bulletHitObstacles,void 0),this.physics.add.overlap(t.getBullets(),this.layer,this.bulletHitLayer,void 0)}),this),this.cameras.main.startFollow(this.player),new A(this),new v(this,0,0)}update(){this.player.update(),this.enemies.getChildren().forEach((e=>{let t=e;if(t.update(),this.player.active&&t.active){var s=Phaser.Math.Angle.Between(t.body.x,t.body.y,this.player.body.x,this.player.body.y);t.getBarrel().angle=(s+Math.PI/2)*Phaser.Math.RAD_TO_DEG}}),this)}convertObjects(){const e=this.map.getObjectLayer("objects");(e?e.objects:[]).forEach((e=>{if("player"===e.type)this.player=new d({scene:this,x:e.x,y:e.y,texture:"tankBlue"});else if("enemy"===e.type){let t=new u({scene:this,x:e.x,y:e.y,texture:"tankRed"});this.enemies.add(t)}else{let t=new T({scene:this,x:e.x,y:e.y-40,texture:e.type});this.obstacles.add(t)}}))}bulletHitLayer(e,t){e instanceof r&&t instanceof Phaser.Tilemaps.Tile&&t.properties.collide&&e.explode()}bulletHitObstacles(e,t){e instanceof r&&e.explode()}enemyBulletHitPlayer(e,t){t instanceof d&&e instanceof r&&(e.explode(),t.updateHealth())}playerBulletHitEnemy(e,t){t instanceof u&&e instanceof r&&(e.explode(),t.updateHealth())}}const k=C;class O extends i.GameObjects.Graphics{constructor(e){super(e),e.add.existing(this),this.createPlayUi(),this.createBlackBackground(e)}createPlayUi(){this.menuUi=new E(this.scene,0,0),this.menuUi.setSize(this.scene.scale.width,this.scene.scale.height),this.menuUi.setPosition(this.scene.scale.width/2,this.scene.scale.height/2),this.menuUi.setDepth(1e3);const e=new w(this.scene,0,0,"splash-art");e.setDisplaySize(this.scene.scale.width,this.scene.scale.height),this.menuUi.add(e,"Center");const t=new _(this.scene,0,0,"button-text-small-green-round");t.setScale(.8),this.menuUi.add(t,"BottomLeft",-90,-400);const s=this.scene.add.text(0,0,"PLAY",{fontSize:"67px",color:"#ffffff",fontStyle:"bold",fontFamily:"Arial"});t.add(s,"Center"),t.on(_.BUTTON_UP_EVENT,(()=>{this.scene.time.delayedCall(400,(()=>this.scene.scene.start("GameScene"))),this.blackSceneTransition.emit(U.BLACK_UI_IMAGE_DISABLE_EVENT)}));const i=new _(this.scene,0,0,"button-text-small-blue-round");i.setScale(.8),this.menuUi.add(i,"BottomLeft",-90,-100);const a=this.scene.add.text(0,0,"SETTINGS",{fontSize:"67px",color:"#ffffff",fontStyle:"bold",fontFamily:"Arial"});i.add(a,"Center"),i.on(_.BUTTON_UP_EVENT,this.showSettingsUi,this),g.applyTintTweens(t,_.BUTTON_DOWN_EVENT,[_.BUTTON_UP_EVENT,_.BUTTON_REST_EVENT],16777215,12105912,200),g.applyScaleTweens(t,_.BUTTON_HOVER_EVENT,_.BUTTON_REST_EVENT,t.scaleX,t.scaleY,1.1,100),g.applyTintTweens(i,_.BUTTON_DOWN_EVENT,[_.BUTTON_UP_EVENT,_.BUTTON_REST_EVENT],16777215,12105912,200),g.applyScaleTweens(i,_.BUTTON_HOVER_EVENT,_.BUTTON_REST_EVENT,i.scaleX,i.scaleY,1.1,100)}showSettingsUi(){this.settingUi.setVisible(!0),this.menuUi.setVisible(!1)}createBlackBackground(e){this.blackSceneTransition=new U(e,1,0,400),this.blackSceneTransition.setDepth(2e3),this.blackSceneTransition.emit(U.BLACK_UI_IMAGE_ENABLE_EVENT)}}const I=O;class D extends Phaser.Scene{constructor(){super({key:"MenuScene"})}init(){}create(){new I(this),new A(this)}}const L=D,R={title:"Tank",url:"https://github.com/digitsensitive/phaser3-typescript",version:"0.0.1",zoom:.6,scale:{mode:Phaser.Scale.FIT,width:1600,height:1200},type:Phaser.AUTO,autoCenter:Phaser.Scale.CENTER_BOTH,parent:"game",scene:[h,L,k],input:{keyboard:!0},physics:{default:"arcade",arcade:{gravity:{x:0,y:0}}},backgroundColor:"#000000",render:{antialias:!0}};class H extends Phaser.Game{constructor(e){super(e)}}window.addEventListener("load",(()=>{new H(R)}))}},s={};function i(e){var a=s[e];if(void 0!==a)return a.exports;var h=s[e]={exports:{}};return t[e].call(h.exports,h,h.exports,i),h.exports}i.m=t,e=[],i.O=(t,s,a,h)=>{if(!s){var n=1/0;for(c=0;c<e.length;c++){for(var[s,a,h]=e[c],r=!0,o=0;o<s.length;o++)(!1&h||n>=h)&&Object.keys(i.O).every((e=>i.O[e](s[o])))?s.splice(o--,1):(r=!1,h<n&&(n=h));if(r){e.splice(c--,1);var l=a();void 0!==l&&(t=l)}}return t}h=h||0;for(var c=e.length;c>0&&e[c-1][2]>h;c--)e[c]=e[c-1];e[c]=[s,a,h]},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={792:0};i.O.j=t=>0===e[t];var t=(t,s)=>{var a,h,[n,r,o]=s,l=0;if(n.some((t=>0!==e[t]))){for(a in r)i.o(r,a)&&(i.m[a]=r[a]);if(o)var c=o(i)}for(t&&t(s);l<n.length;l++)h=n[l],i.o(e,h)&&e[h]&&e[h][0](),e[h]=0;return i.O(c)},s=self.webpackChunktype_project_template=self.webpackChunktype_project_template||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var a=i.O(void 0,[96],(()=>i(480)));a=i.O(a)})();