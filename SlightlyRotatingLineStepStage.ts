const w : number = window.innerWidth, h : number = window.innerHeight
const nodes : number = 5
const k = 4
const divideScale = (scale : number, i : number) => Math.min(0.5, Math.max(0, scale - 0.5 * i)) * 2
const drawSRLNode = (context : CanvasRenderingContext2D, i : number, scale : number) => {
    context.lineWidth = Math.min(w, h) / 60
    context.lineCap = 'round'
    context.strokeStyle = '#673AB7'
    const gap : number = w / (nodes + 1)
    context.save()
    context.translate(i * gap + gap, h/2)
    for (var j = 0; j < (k/2); j++) {
        const sc : number = divideScale(scale, j)
        context.save()
        context.scale(1, 1 - 2 * j)
        for (var p = 0; p < (k/2); p++) {
            const scp : number = divideScale(scale, p)
            context.save()
            context.rotate(Math.PI/2 * (1 - 2 * p) * scp)
            context.beginPath()
            context.moveTo(0, 0)
            context.lineTo(0, gap/3)
            context.stroke()
            context.restore()
        }
        context.restore()
    }
    context.restore()
}

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

class State {
    scale : number = 0
    prevScale : number = 0
    dir : number = 0

    update(cb : Function) {
        this.scale += (0.1 / k) * this.dir
        if (Math.abs(this.scale - this.prevScale) > 1) {
            this.scale = this.prevScale + this.dir
            this.dir = 0
            this.prevScale = this.scale
            cb()
        }
    }

    startUpdating(cb : Function) {
        if (this.dir == 0) {
            this.dir = 1 - 2 * this.prevScale
            cb()
        }
    }
}

class Animator {
    animated : boolean = false
    interval : number

    start(cb : Function) {
        if (!this.animated) {
            this.animated = true
            this.interval = setInterval(cb, 50)
        }
    }

    stop() {
        if (this.animated) {
            this.animated = false
            clearInterval(this.interval)
        }
    }
}
