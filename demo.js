JSLoader.loadJs('http://localhost:8888/CL-loads.js'); // einzeln ausführen



layout = new ConstraintLayout($morph('constraintbox'));
$morph('constraintbox').setLayouter(layout);
      
a = new ConstraintLayoutInfo($morph('a'));
b = new ConstraintLayoutInfo($morph('b'));
c = new ConstraintLayoutInfo($morph('c'));
      
margin = 12;

// b.x = a.x + a.width + margin
layout.addConstraint(new ClLinearEquation(a.position.x, margin) );
layout.addConstraint(new ClLinearEquation(CL.Plus(CL.Plus(a.position.x, a.extent.x), margin), b.position.x) );
layout.addConstraint(new ClLinearEquation(CL.Plus(CL.Plus(b.position.x, b.extent.x), margin), c.position.x) );
layout.addConstraint(new ClLinearEquation(CL.Plus(CL.Plus(c.position.x, c.extent.x), margin), layout.extent.x) );

layout.addConstraint(new ClLinearEquation(a.extent.x, b.extent.x));
layout.addConstraint(new ClLinearEquation(b.extent.x, c.extent.x));


layout.addConstraint(new ClLinearEquation(a.position.y, margin) );
layout.addConstraint(new ClLinearEquation(CL.Plus(CL.Plus(a.position.y, a.extent.y), margin*2), layout.extent.y) );

