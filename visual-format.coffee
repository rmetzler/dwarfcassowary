jison = (require 'jison')


grammar=
  lex: 
    "rules": [
       ["\\s+",                     "/* skip whitespace */"],
       ["H:",                       "return 'H:';"],
       ["V:",                       "return 'V:';"],
       ["@",                        "return '@';"],
       ["-",                        "return '-';"],
       ["\\|",                      "return '|';"],
       ["\\[",                      "return '[';"],
       ["]",                        "return ']';"],
       ["\\(",                      "return '(';"],
       ["\\)",                      "return ')';"],
       ["==",                       "return '==';"],
       [">=",                       "return '>=';"],
       ["<=",                       "return '<=';"],
       [",",                        "return ',';"],
       ["$",                        "return 'EOF';"]
       ["[0-9]+(?:\\.[0-9]+)?\\b",  "return 'NUMBER';"],
       ["[_A-Za-z][_A-Za-z0-9]*\\b","return 'IDENTIFIER';"],
    ]
  startSymbol: "visualFormatString", 
  bnf:
    'visualFormatString': [
      ['orientation left_connection_to_superview view more_connections', 
            """
            /* create Solver */
            $$ = [$1,$2,$3,$4 ];
            //console.log($$);
            return $$;
            """
      ]
    ]
    'orientation': [
      ['',  """
            /* x and width */
            $$ = ['orientation', 'x'];
            """] 
      ['H:',"""
            /* x and width */
            $$ = ['orientation', 'x'];
            """] 
      ['V:',"""
            /* y and height */
            $$ = ['orientation', 'y'];
            """]
    ]
    'view': [
      ['[ viewName predicateListWithParens ]', 
            """
            /* find morph viewName and add Constraints */
            //console.log('viewName = ' + $2);
            //console.log('predicates = ' + $3);
            $$ = ['view',$2,$3];
            """]
    ]
    
    'left_connection_to_superview' : [
      ['', """
           /* no constraint */
           $$ = 'no_left_superview_connect';
           """]
      ['| connection', 
           """
           /* connect to superview */
           $$ = ['left_superview_connect', $2];
           """]
    ]
    
    'more_connections': [
      ['EOF', """
              $$ = ['no more connections'];
              """],
      ['right_connection_to_superview',
              """
              $$ = $1;
              """]
      ['connection_to_view',
              """
              //console.log('connection_to_view = ' + $1);
              $$ = $1;
              """]
    ]
    
    'right_connection_to_superview' : [
      ['connection | EOF', """
                           /* connect to superview */
                           $$ = ['right_superview_connect', $1];
                           """]
    ]
    
    'connection_to_view': [
      ['connection view ', 
                """
                /* should add both, connection and view constraints */
                $$ = ['connection_to_view', $1, $2];
                """]
      ['connection view more_connections', 
                """
                /* should add both, connection and view constraints */
                $$ = ['connection_to_view', $1, $2, $3];
                """]
    ]

    'connection': [
      ['', """
           /* space equals 0 */
           $$ = ['connection_no_space']; 
           """]
      ['-', """
            /* default space constraints */
            $$ = ['connection_default'];
            """]
      ['- predicateList -', 
            """
            /* connection has predicateList constraints */
            $$ = ['connection_with_predicates', $2];
            """]
    ] 
    
    'predicateList': [
      ['simplePredicate',
          """
          $$ = [$1];
          """]
      ['predicateListWithParens',
          """
          $$ = [$1];
          """]
    ]
    'simplePredicate': [
      ['metricName',
          """
          $$ = [$1];
          """]
      ['number',
          """
          $$ = [$1];
          """] 
    ]
    'predicateListWithParens': [
      ['', """
           /* no predicates */
           $$ = ['predicates_no'];
           """] 
      ['( predicate more_predicates )', 
           """
           /* predicate */
           $$ = ['predicate',$2, $3];
           """]
    ]
    'more_predicates':[
      ['', 
          """
          $$ = '.';
          """]
      [', predicate more_predicates', 
          """
          $$ = $2;
          """]
    ]
    'predicate': [
      ['objectOfPredicate', 
                """
                $$ = ['obj_of_predicate', $1];
                """]
      ['relation objectOfPredicate', 
                """
                $$ = ['rel_and_obj', $1, $2];
                """] 
      ['objectOfPredicate @ priority',
                """
                $$ = ['obj_at_priority',$1,$3];
                """] 
      ['relation objectOfPredicate @ priority',
                """
                $$ = ['rel_and_obj_at_priority', $1, $2, $4];
                """]
    ]
    
    'relation': [
      ['==',"""
            /* equal*/
            $$ = '==';
            """]
      ['<=',"""
            /* greater or equal*/
            $$ = '<=';
            """]

      ['>=',"""
            /* greater or equal*/
            $$ = '>='; 
            """]
    ]

    'objectOfPredicate': [
      ['constant',""" $$ = ['obj_of_predicate', 'constant', $1]; """]
      ['viewName',""" $$ = ['obj_of_predicate', 'viewname', $1]; """]
    ]
    'priority': [
      ['metricName',""" $$ = [$1]; """]
      ['number', """ $$ = [$1]; """]
    ]
    'constant': [
      ['metricName',""" $$ = [$1]; """] 
      ['number',""" $$ = [$1]; """]
    ]
    'viewName': [
      ['IDENTIFIER', """
                      $$ = yytext;
                      //console.log(yytext);
                      """]
    ]
    'number'  : [
      ['NUMBER', 
                """
                $$ = yytext; /*number*/
                //console.log(yytext);
                """]
    ]

###
    <viewName>
    Parsed as a C identifier.
    This must be a key mapping to an instance of NSView in the passed views dictionary.

    <metricName>
    Parsed as a C identifier. This must be a key mapping to an instance of NSNumber in the passed metrics dictionary.

    <number>
    As parsed by strtod_l, with the C locale.
###


class ASTWalker
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
    var morph = $morph('#{viewname}')
    var current = morph.getConstraintInfo || new ConstraintInfo(morph); 
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
    layout.addConstraint(new ClLinearEquation( current.extent[axis] , predicate.c_info.extent[axis]) );
    """
  rel_and_obj: (node) ->
    rel = @relation_map[node[1]]
    morph = @translateNode node[2]   
    """
    {
      rel:#{rel},
      morph: #{morph},
      c_info: this.morph.getConstraintInfo() || new ConstraintInfo(this.morph)
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
fs = require('fs')

parser = new jison.Parser(grammar)
parserSource = parser.generate()
fs.writeFileSync('visual-format-parser.js',parserSource, encoding='utf8')
#console.log parserSource

#console.log parser
#parser.parse '[button]'
#parser.parse '[button]-[textfield]'
#parser.parse '|-[button]-|'
#parser.parse '|[button]|'
#parser.parse '|-[button (>= 50) ]-|'
#parser.parse '|-50-[orchidbox]-50-|'
#parser.parse 'V:[topField]-10-[bottomField]'
#parser.parse '[maroonView][oceanView]'
#parser.parse '[button(100@20)]'
#parser.parse '[button1(==button2)]'
#parser.parse '[flexibleButton(>=70,<=100)]'
#parser.parse '|-[find]-[findNext]-[findField(>=20)]'
#parser.parse '|-[a]-[b]-[c]-|'
#eval parserSource
#parser.lexer = new Lexer(lexData);

#console.log parser.parse('|-[a]-[b(==a)]-|')

"""
var a = new ConstraintLayoutInfo($morph('a'));
var b = new ConstraintLayoutInfo($morph('b'));
var c = new ConstraintLayoutInfo($morph('c'));

var margin = 12;

layout.addConstraint(new ClLinearEquation(a.position.y, margin) );
layout.addConstraint(new ClLinearEquation(CL.Plus(CL.Plus(a.position.y, a.extent.y), margin*2), layout.extent.y) );

// b.x = a.x + a.width + margin
layout.addConstraint(new ClLinearEquation( margin, a.position.x) );
layout.addConstraint(new ClLinearEquation(CL.Plus(CL.Plus(a.position.x, a.extent.x), margin), b.position.x) );
layout.addConstraint(new ClLinearEquation(CL.Plus(CL.Plus(b.position.x, b.extent.x), margin), c.position.x) );
layout.addConstraint(new ClLinearEquation(CL.Plus(CL.Plus(c.position.x, c.extent.x), margin), layout.extent.x) );
"""


ast = parser.parse('|-[a]-[b(==a)]-|')
fs.writeFileSync('./js/example.json',(JSON.stringify ast), encoding='utf8')

compiled = new ASTWalker().translateAST(ast, '\n')

console.log """
----------

#{compiled}
"""