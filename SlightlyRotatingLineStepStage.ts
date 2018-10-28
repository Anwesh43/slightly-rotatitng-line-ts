const w : number = window.innerWidth, h : number = window.innerHeight
const nodes : number = 5
class SlightlyRotatingStepStage {
    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D
    initCanvas() {
        this.canvas.width = w
        this.canvas.height = h
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    render() {
        this.context.fillStyle = '#BDBDBD'
        this.context.fillRect(0, 0, w, h)
    }

    static init() {
        const stage : SlightlyRotatingStepStage = new SlightlyRotatingStepStage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}
