const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Player{
    constructor(){
        this.position = {
            x:200,
            y:200
        }
    }
}
export default function SpaceInvader(){
    return (
        <canvas></canvas>
    )
}