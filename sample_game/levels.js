var FirstLevel = function() {
    // create entities
    this.hero = new Hero();
    this.enemy = new Enemy();
    
    // attach to entities array
    this.entities = [this.hero, this.enemy];
}