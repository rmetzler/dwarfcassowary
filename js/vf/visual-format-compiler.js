var VFCompiler;

VFCompiler = (function() {

  function VFCompiler() {}

  VFCompiler.prototype.compile = function(string) {
    return this.translateAST(VFParser.parse(string, '\n'));
  };

  VFCompiler.prototype.translateAST = function(ast, seperator) {
    var buffer, ctx, node, _i, _len;
    if (seperator == null) seperator = '';
    ctx = {};
    buffer = [];
    for (_i = 0, _len = ast.length; _i < _len; _i++) {
      node = ast[_i];
      buffer.push(this.translateNode(node, ctx));
    }
    return buffer.join(seperator);
  };

  VFCompiler.prototype.translateNode = function(node, ctx) {
    var translated;
    if (node instanceof Array) {
      translated = this[node[0]](node, ctx);
      /*
            console.log """
            input: #{JSON.stringify node}
            translated: #{translated}
            """
      */
      return translated;
    } else {
      return "translateNode: " + node;
    }
  };

  VFCompiler.prototype.orientation = function(node, ctx) {
    return "var axis = '" + node[1] + "';";
  };

  VFCompiler.prototype.left_superview_connect = function(node) {
    return "/* left_superview_connect */\nvar margin = margin || 12;\nlayout.addConstraint(new ClLinearEquation( current.position[axis] , margin) );";
  };

  VFCompiler.prototype.right_superview_connect = function(node) {
    return "" + (this.translateNode(node[1])) + "\nlayout.addConstraint(new ClLinearEquation(CL.Plus(CL.Plus(current.position[axis], current.extent[axis]), margin), layout.extent[axis]) );    ";
  };

  VFCompiler.prototype.view = function(node, ctx) {
    var viewname;
    viewname = node[1];
    return "var morph = $morph('" + viewname + "');\nvar current = morph.getLayoutConstraintInfo() || new ConstraintLayoutInfo(morph); \n" + (this.translateNode(node[2], ctx));
  };

  VFCompiler.prototype.connection_to_view = function(node) {
    var buffer;
    buffer = "/* connection_to_view start */\nvar prev = current;\n" + (this.translateNode(node[1])) + "\n" + (this.translateNode(node[2])) + "\n\nlayout.addConstraint(new ClLinearEquation(CL.Plus(CL.Plus(prev.position[axis], prev.extent[axis]), margin), current.position[axis]) );    ";
    if (node[3]) buffer += "" + (this.translateNode(node[3])) + " ";
    buffer += "\n  /* connection_to_view end */";
    return buffer;
  };

  VFCompiler.prototype.connection_default = function() {
    return "\nvar margin = 12;";
  };

  VFCompiler.prototype.predicates_no = function() {
    return "/* no more predicates for current view */";
  };

  VFCompiler.prototype.predicate = function(node) {
    return "predicate = " + (this.translateNode(node[1])) + "\n/* current.extent.x == predicate.c_info.extent.x */\n/* TODO enable LEQ and GEQ */\nlayout.addConstraint(\n  new ClLinearEquation(\n    current.extent[axis], \n    new ClLinearExpression(\n      predicate.c_info.extent[axis]\n    )\n  )\n);";
  };

  VFCompiler.prototype.rel_and_obj = function(node) {
    var morph, rel;
    rel = this.relation_map[node[1]];
    morph = this.translateNode(node[2]);
    return "{\n  rel:" + rel + ",\n  morph: " + morph + ",\n  c_info: " + morph + ".getLayoutConstraintInfo() || new ConstraintLayoutInfo(" + morph + ")\n}";
  };

  VFCompiler.prototype.relation_map = {
    "==": "CL.EQ",
    "<=": "CL.LEQ",
    "=>": "CL.GEQ"
  };

  VFCompiler.prototype.obj_of_predicate = function(node) {
    return "$morph('" + node[2] + "')";
  };

  return VFCompiler;

})();
