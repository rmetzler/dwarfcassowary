(function() {
  var d, t, tests;

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
      var width = new ClVariable("width",100);
      var a = {}, b = {}, c = {};
      a.width = new ClVariable("a.width",50);
      b.width = new ClVariable("b.width",50);
      c.width = new ClVariable("c.width",50);

      a.x = new ClVariable("a.x");
      b.x = new ClVariable("b.x");
      c.x = new ClVariable("c.x");

      var margin = 5;

      var solver = new ClSimplexSolver();
      solver.addEditVar(width, ClStrength.required);

      // b.x = a.x + a.width + margin
      solver.addConstraint(new ClLinearEquation( margin, a.x) );
      solver.addConstraint(new ClLinearEquation(CL.Plus(CL.Plus(a.x, a.width), margin), b.x) );
      solver.addConstraint(new ClLinearEquation(CL.Plus(CL.Plus(b.x, b.width), margin), c.x) );
      solver.addConstraint(new ClLinearEquation(CL.Plus(CL.Plus(c.x, c.width), margin), width) );

      solver.addConstraint(new ClLinearEquation(a.width, b.width));
      solver.addConstraint(new ClLinearEquation(b.width, c.width));

      width.value();
      a.width.value();
      b.width.value();
      c.width.value();
      return true;
    }),
  };

  for (d in tests) {
    t = tests[d];
    console.log(t() ? '.' : "\n" + d + " FAILED\n");
  }

}).call(this);
