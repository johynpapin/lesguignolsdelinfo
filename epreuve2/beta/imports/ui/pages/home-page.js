import './home-page.html';

# General Variables
sketch = Sketch.create()
particles = []
particleCount = 750
sketch.mouse.x = sketch.width / 2
sketch.mouse.y = sketch.height / 2
sketch.strokeStyle = 'hsla(200, 50%, 50%, .4)'
sketch.globalCompositeOperation = 'lighter'
  
# Particle Constructor
Particle = ->
  this.x = random( sketch.width ) 
  this.y = random( sketch.height, sketch.height * 2 )
  this.vx = 0
  this.vy = -random( 1, 10 ) / 5
  this.radius = this.baseRadius = 1
  this.maxRadius = 50  
  this.threshold = 150
  this.hue = random( 180, 240 )

# Particle Prototype
Particle.prototype =
  update: ->
    # Determine Distance From Mouse
    distx = this.x - sketch.mouse.x
    disty = this.y - sketch.mouse.y
    dist = sqrt( distx * distx + disty * disty )
    
    # Set Radius
    if dist < this.threshold
      radius = this.baseRadius + ( ( this.threshold - dist ) / this.threshold ) * this.maxRadius
      this.radius = if radius > this.maxRadius then this.maxRadius else radius
    else
      this.radius = this.baseRadius
        
    # Adjust Velocity
    this.vx += ( random( 100 ) - 50 ) / 1000
    this.vy -= random( 1, 20 ) / 10000
      
    # Apply Velocity
    this.x += this.vx
    this.y += this.vy
      
    # Check Bounds   
    if this.x < - this.maxRadius || this.x > sketch.width + this.maxRadius || this.y < - this.maxRadius
      this.x = random( sketch.width )      
      this.y = random( sketch.height + this.maxRadius, sketch.height * 2 )
      this.vx = 0
      this.vy = -random( 1, 10 ) / 5
  render: ->
    sketch.beginPath()
    sketch.arc( this.x, this.y, this.radius, 0, TWO_PI )
    sketch.closePath()
    sketch.fillStyle = 'hsla(' + this.hue + ', 60%, 40%, .35)'
    sketch.fill()
    sketch.stroke()

# Create Particles
z = particleCount
while z--
  particles.push( new Particle() )

# Sketch Clear
sketch.clear = ->
  sketch.clearRect( 0, 0, sketch.width, sketch.height )
  
# Sketch Update
sketch.update = ->
  i = particles.length
  particles[ i ].update() while i--

# Sketch Draw
sketch.draw = ->  
  i = particles.length
  particles[ i ].render() while i--
