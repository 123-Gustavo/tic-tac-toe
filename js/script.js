'use strict';

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var window_height = window.innerHeight
var window_width = window.innerWidth


canvas.width = window_width;
canvas.height = window_height;
context.translate(0.5, 0.5);


class Game {
    constructor() {
        this.map = [
            {
                x: [0,200],
                y: [0,200],
                ballPos: {
                    x: 100,
                    y: 100,
                    raio: 90
                },
                xPos: {
                    line1: {
                        x: [0,200],
                        y: [0,200]
                    },
                    line2: {
                        x: [200,0],
                        y: [0,200]
                    }
                },
                contain: false,
                space: "ns"
            },
            {
                x: [210,410],
                y: [0,200],
                ballPos: {
                    x: 310,
                    y: 100,
                    raio: 90
                },
                xPos: {
                    line1: {
                        x: [210,410],
                        y: [0,200]
                    },
                    line2: {
                        x: [410,210],
                        y: [0,200]
                    }
                },
                contain: false,
                space: "ns"
            },
            {
                x: [420,600],
                y: [0,200],
                ballPos: {
                    x: 520,
                    y: 100,
                    raio: 90
                },
                xPos: {
                    line1: {
                        x: [420,600],
                        y: [0,200]
                    },
                    line2: {
                        x: [600,420],
                        y: [0,200]
                    }
                },
                contain: false,
                space: "ns"
            },
            {
                x: [0,200],
                y: [210,410],
                ballPos: {
                    x: 100,
                    y: 310,
                    raio: 90
                },
                xPos: {
                    line1: {
                        x: [0,200],
                        y: [210,410]
                    },
                    line2: {
                        x: [200,0],
                        y: [210,410]
                    }
                },
                contain: false,
                space: "ns"
            },
            {
                x: [210,410],
                y: [210,410],
                ballPos: {
                    x: 310,
                    y: 310,
                    raio: 90
                },
                xPos: {
                    line1: {
                        x: [210,410],
                        y: [210,410]
                    },
                    line2: {
                        x: [410,210],
                        y: [210,410]
                    }
                },
                contain: false,
                space: "ns"
            },
            {
                x: [420,600],
                y: [210,410],
                ballPos: {
                    x: 520,
                    y: 310,
                    raio: 90
                },
                xPos: {
                    line1: {
                        x: [420,600],
                        y: [210,410]
                    },
                    line2: {
                        x: [600,420],
                        y: [210,410]
                    }
                },
                contain: false,
                space: "ns"
            },
            {
                x: [0,200],
                y: [420,600],
                ballPos: {
                    x: 100,
                    y: 520,
                    raio: 90
                },
                xPos: {
                    line1: {
                        x: [0,200],
                        y: [420,600]
                    },
                    line2: {
                        x: [200,0],
                        y: [420,600]
                    }
                },
                contain: false,
                space: "ns"
            },
            {
                x: [210,410],
                y: [420,600],
                ballPos: {
                    x: 310,
                    y: 520,
                    raio: 90
                },
                xPos: {
                    line1: {
                        x: [210,410],
                        y: [420,600]
                    },
                    line2: {
                        x: [410,210],
                        y: [420,600]
                    }
                },
                contain: false,
                space: "ns"
            },
            {
                x: [420,600],
                y: [420,600],
                ballPos: {
                    x: 520,
                    y: 520,
                    raio: 90
                },
                xPos: {
                    line1: {
                        x: [420,600],
                        y: [420,600]
                    },
                    line2: {
                        x: [600,420],
                        y: [420,600]
                    }
                },
                contain: false,
                space: "ns"
            }
        ]
        this.vez = 1
    }

    draw(){
        context.lineWidth = 10
        context.strokeStyle = "#000"

        // 200,200
        context.moveTo(200,0)
        context.lineTo(200,(200 + 10)*3)

        context.moveTo(400+10,0)
        context.lineTo(400+10,(200 + 10)*3)

        context.moveTo(0,200)
        context.lineTo((200 + 10)*3,200)

        context.moveTo(0,400+10)
        context.lineTo((200 + 10)*3,400+10)

        context.stroke()
    }

    verifyClick(posX,posY){

        let lineWidth = 10


        this.map.forEach((el)=>{
            if((posX >= el.x[0] && posX <= el.x[1]) && (posY >= el.y[0] && posY <= el.y[1])){
                if(el.contain == false){
                    if(this.vez == 1){
                        context.beginPath()
                        context.lineWidth = lineWidth   
                        context.strokeStyle = "RED"
                        context.arc(el.ballPos.x,el.ballPos.y,el.ballPos.raio,0,(Math.PI/180)*360,true)
                        context.stroke()
                        context.closePath()
                    }else if(this.vez == -1){
                        context.beginPath()

                        context.lineWidth = lineWidth
                        context.strokeStyle = "GREEN"

                        context.moveTo(el.xPos.line1.x[0],el.xPos.line1.y[0])
                        context.lineTo(el.xPos.line1.x[1],el.xPos.line1.y[1])

                        context.moveTo(el.xPos.line2.x[0],el.xPos.line2.y[0])
                        context.lineTo(el.xPos.line2.x[1],el.xPos.line2.y[1])

                        context.stroke()

                        context.closePath()
                        
                    }
                }else return alert("[ERRO] Esse espaço já está ocupado!")
                el.contain = true

                let jogador = (this.vez == -1) ? 2 : 1
                el.space = jogador
                this.vez*=-1
                setTimeout(() => {
                    this.verifyWin()
                }, 250);
            }
        })

        
    }

    verifyWin(){
        
        let win = {
            ganhou: false,
            empatou: false,
            ganhador: 0,
        }

        for (let i = 0; i < 9; i+=3) {
            let red = Number(this.map[i].space) + Number(this.map[i+1].space) + Number(this.map[i+2].space);
            if(isNaN(Number(red)) == false && (red == 3 || red == 6)){
                win.ganhou = true
                win.ganhador = (red == 3) ? 1 : 2
            }
        }

        for (let i = 0; i < 3; i++) {
            let red = Number(this.map[i].space) + Number(this.map[i+3].space) + Number(this.map[i+6].space);
            if(isNaN(Number(red)) == false && (red == 3 || red == 6)){
                win.ganhou = true
                win.ganhador = (red == 3) ? 1 : 2
            }
        }

        let dia1 = Number(this.map[2].space) + Number(this.map[4].space) + Number(this.map[6].space) 
        let dia2 = Number(this.map[0].space) + Number(this.map[4].space) + Number(this.map[8].space) 

        if((isNaN(Number(dia1)) == false && (dia1 == 3 || dia1 == 6)) || (isNaN(Number(dia2)) == false && (dia2 == 3 || dia2 == 6))){
            win.ganhou = true
            if(dia1 == 3 || dia1 == 6){
                win.ganhador = (dia1 == 3) ? 1 : 2
            }else if(dia2 == 3 || dia2 == 6){
                win.ganhador = (dia2 == 3) ? 1 : 2
            }
        }

        let arrE = []

        this.map.forEach((e)=>{
            arrE.push(e.space)
        })

        let reduE = arrE.reduce((prev,cur)=>prev+cur)

        if(isNaN(Number(reduE)) == false){
            if(Number(reduE) == 13){
                win.empatou = true
            }
        }

        if(win.ganhou){
            alert("O jogador " + win.ganhador + ". Ganhou o jogo, parabéns!!")
            document.location.reload()
        }else if(win.empatou == true && win.ganhou == false){
            alert("Empate!!")
            document.location.reload()
        }

    }

}
  
let game = new Game()
game.draw()


canvas.addEventListener("mousedown",(e)=>{
    game.verifyClick(e.offsetX,e.offsetY)
})