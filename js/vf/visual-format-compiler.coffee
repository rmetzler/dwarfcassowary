#VFParser = require? 'visual-format-parser.js'
class VFCompiler
  compile: (string) ->
    @translateAST(VFParser.parse string, '\n')
    
  translateAST: (ast, seperator='') ->
    #console.log 'JSON.stringify ast'
    #console.log (JSON.stringify ast) + '\n'

    ctx = {}
    buffer = []
    
    for node in ast
      buffer.push @translateNode node, ctx
    
    buffer.join(seperator)
  
  translateNode: (node, ctx) ->
    #console.log "current node: ", JSON.stringify node
    if node instanceof Array
      translated = @[node[0]](node, ctx)
      ###
      console.log """
      input: #{JSON.stringify node}
      translated: #{translated}
      """
      ###
      return translated
    else
      "translateNode: #{node}"
      #@[node](node, ctx)

  orientation: (node, ctx) ->
    """
    var axis = '#{node[1]}';
    """
  
  left_superview_connect: (node) ->
    """
    /* left_superview_connect */
    var margin = margin || 12;
    layout.addConstraint(new ClLinearEquation( current.position[axis] , margin) );
    """
  
  right_superview_connect: (node) ->
    """
    #{@translateNode node[1]}
    layout.addConstraint(new ClLinearEquation(CL.Plus(CL.Plus(current.position[axis], current.extent[axis]), margin), layout.extent[axis]) );    
    """

  view: (node, ctx) ->
    #console.log "view", node[1], node[2]
    viewname = node[1]
    """
    var morph = $morph('#{viewname}');
    var current = morph.getLayoutConstraintInfo() || new ConstraintLayoutInfo(morph); 
    #{@translateNode node[2], ctx}
    """
    
  connection_to_view: (node) ->
    buffer = """
      /* connection_to_view start */
      var prev = current;
      #{@translateNode node[1]}
      #{@translateNode node[2]}
      
      layout.addConstraint(new ClLinearEquation(CL.Plus(CL.Plus(prev.position[axis], prev.extent[axis]), margin), current.position[axis]) );    
    """
    
    if node[3]
      buffer += """
        #{@translateNode node[3]} 
      """

    buffer += """
    
      /* connection_to_view end */
    """

    buffer
    
  connection_default: ->
    """
    
    var margin = 12;
    """
    
  predicates_no: () ->
    "/* no more predicates for current view */"

  predicate: (node) ->
    """
    predicate = #{@translateNode(node[1])}
    /* current.extent.x == predicate.c_info.extent.x */
    /* TODO enable LEQ and GEQ */
    layout.addConstraint(
      new ClLinearEquation(
        current.extent[axis], 
        new ClLinearExpression(
          predicate.c_info.extent[axis]
        )
      )
    );
    """
  rel_and_obj: (node) ->
    rel = @relation_map[node[1]]
    morph = @translateNode node[2]   
    """
    {
      rel:#{rel},
      morph: #{morph},
      c_info: #{morph}.getLayoutConstraintInfo() || new ConstraintLayoutInfo(#{morph})
    }
    """  
  
  relation_map:
    "==": "CL.EQ"
    "<=": "CL.LEQ"
    "=>": "CL.GEQ"

  obj_of_predicate: (node) ->
    """
    $morph('#{node[2]}')
    """
