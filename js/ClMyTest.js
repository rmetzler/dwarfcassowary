(function() {
  var d, t, tests;
  var print = console.log;
  
  tests = {
    A_plus_B_plus_C: (function(){
      var width = new ClVariable("width",100);
      var a = new ClVariable("a",50);
      var b = new ClVariable("b",50);
      var c = new ClVariable("c",50);

      var solver = new ClSimplexSolver();
      solver.addEditVar(width, ClStrength.required);

      // width = a + b + c
      var eq = new ClLinearEquation(width, CL.Plus(a,CL.Plus(b,c)));
      solver.addConstraint(eq);
      // a = b
      solver.addConstraint(new ClLinearEquation(a, b));
      // b = c
      solver.addConstraint(new ClLinearEquation(b, c));

      return (width.value() == 100) && 
             (a.value() + b.value() + c.value() == 100) && 
             (Math.abs(a.value() - c.value()) < 0.01 );
    }),
    
    margin_A_plus_B_plus_C: (function() {
      var width = new ClVariable(100);
      var a = {}, b = {}, c = {};
      a.width = new ClVariable("a.width",50);
      b.width = new ClVariable("b.width",50);
      c.width = new ClVariable("c.width",50);

      a.x = new ClVariable("a.x");
      b.x = new ClVariable("b.x");
      c.x = new ClVariable("c.x");

      var margin = 5;

      var solver = new ClSimplexSolver();
      solver.addStay(width);
      solver.addEditVar(width);

      // b.x = a.x + a.width + margin
      solver.addConstraint(new ClLinearEquation( margin, a.x) );
      solver.addConstraint(new ClLinearEquation(CL.Plus(CL.Plus(a.x, a.width), margin), b.x) );
      solver.addConstraint(new ClLinearEquation(CL.Plus(CL.Plus(b.x, b.width), margin), c.x) );
      solver.addConstraint(new ClLinearEquation(CL.Plus(CL.Plus(c.x, c.width), margin), width) );

      solver.addConstraint(new ClLinearEquation(a.width, b.width));
      solver.addConstraint(new ClLinearEquation(b.width, c.width));

      
      console.log("vor edit");
      console.log(width.value());
      console.log(a.x.value() + " - " + a.width.value());
      console.log(b.x.value() + " - " + b.width.value());
      console.log(c.x.value() + " - " + c.width.value());
      
      solver.beginEdit();
      console.log("edit: width = 170");
      solver.suggestValue(width, 170);
      solver.endEdit();
      
      console.log("nach edit");
      console.log(width.value());
      console.log(a.x.value() + " - " + a.width.value());
      console.log(b.x.value() + " - " + b.width.value());
      console.log(c.x.value() + " - " + c.width.value());
      
      return true;
    }),
    
    constraint_layout: (function() {
      
      var layout = new ConstraintLayout($morph('constraintbox'));
      $morph('constraintbox').setLayouter(layout);
      
      var a = new ConstraintLayoutInfo($morph('a'));
      var b = new ConstraintLayoutInfo($morph('b'));
      var c = new ConstraintLayoutInfo($morph('c'));
      
      var margin = 5;
      
      layout.addConstraint(new ClLinearEquation(a.position.y, margin) );
      layout.addConstraint(new ClLinearEquation(CL.Plus(CL.Plus(a.position.y, a.extent.y), margin*2), layout.extent.y) );



      // b.x = a.x + a.width + margin
      layout.addConstraint(new ClLinearEquation( margin, a.position.x) );
      layout.addConstraint(new ClLinearEquation(CL.Plus(CL.Plus(a.position.x, a.extent.x), margin), b.position.x) );
      layout.addConstraint(new ClLinearEquation(CL.Plus(CL.Plus(b.position.x, b.extent.x), margin), c.position.x) );
      layout.addConstraint(new ClLinearEquation(CL.Plus(CL.Plus(c.position.x, c.extent.x), margin), layout.extent.x) );

      layout.addConstraint(new ClLinearEquation(a.extent.x, b.extent.x));
      layout.addConstraint(new ClLinearEquation(b.extent.x, c.extent.x));

      console.log("Rectangle.width: " + layout.extent.x.value());
      console.log(a.position.x.value() + " - " + a.extent.x.value());
      console.log(b.position.x.value() + " - " + b.extent.x.value());
      console.log(c.position.x.value() + " - " + c.extent.x.value());
      
      return true;
    }),
  };

  for (d in tests) {
    t = tests[d];
    console.log(t() ? d + ' ok' : "\n" + d + " FAILED\n");
  }

}).call(this);
