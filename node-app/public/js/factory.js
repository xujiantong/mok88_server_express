let Plane = function(){
  this.blood = 100;
  this.attackLevel = 1;
  this.defenseLevel = 1;
  let b = 100;
  this.test = function(){
      let c =" 21930921---321-312";
      console.log(c);
      console.log(b);
  };
};

let plane = new Plane();
plane.blood = 500;
plane.attackLevel = 10;
plane.defenseLevel = 7;

let clonePlane = Object.create(plane);


console.log(Object.prototype);
