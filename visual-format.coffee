jison = (require 'jison')#.Jison
#lexer = 

console.log jison
#lexData=
grammar=
  lex: 
    "rules": [
       ["\\s+",                     "/* skip whitespace */"],
       ["[0-9]+(?:\\.[0-9]+)?\\b",  "return 'NUMBER';"],
       ["[_A-Za-z][_A-Za-z0-9]*\\b","return 'IDENTIFIER';"],
       ["H:",                       "return 'H:';"],
       ["V:",                       "return 'V:';"],
       ["@",                        "return '@';"],
       ["\\|",                      "return '|';"],
       ["\\[",                      "return '[';"],
       ["]",                        "return ']';"],
       ["\\(",                      "return '(';"],
       ["\\)",                      "return ')';"],
       ["==",                       "return '==';"],
       [">=",                       "return '>=';"],
       ["<=",                       "return '<=';"],
       ["-",                        "return '-';"],
       [",",                        "return ',';"],
       ["$",                        "return 'EOF';"]
    ]
  startSymbol: "visualFormatString", 
  bnf:
    'visualFormatString': ['left_connection_to_superview view connection_to_view right_connection_to_superview']
    'orientation': ['', 'H:', 'V:']
    'superview': ['|']
    'view': ['[ viewName predicateListWithParens ]']
    'left_connection_to_superview' : ['', 'superview connection']
    'right_connection_to_superview' : ['', 'connection superview']
    'connection_to_view': ['', 'connection view connection_to_view']
    'connection': ['','-','-predicateList-'] 
    
    'predicateList': ['simplePredicate','predicateListWithParens']
    'simplePredicate': ['metricName','positiveNumber']
    'predicateListWithParens': ['', '(predicate more_predicates)']
    'more_predicates':['', ', predicate']
    'predicate': ['objectOfPredicate','relation objectOfPredicate', 'objectOfPredicate @priority', 'relation objectOfPredicate @priority']
    
    'relation': ['==','<=','>=']
    'objectOfPredicate': ['constant','viewName']
    'priority': ['metricName', 'number']
    'constant': ['metricName', 'number']
    'viewName': ['IDENTIFIER', "$$ = 'yytext';"]
    
###
    <viewName>
    Parsed as a C identifier.
    This must be a key mapping to an instance of NSView in the passed views dictionary.

    <metricName>
    Parsed as a C identifier. This must be a key mapping to an instance of NSNumber in the passed metrics dictionary.

    <number>
    As parsed by strtod_l, with the C locale.
    
    
###



parser = new jison.Parser(grammar);
#console.log parser
parser.parse '|-[button]-|'
parser.parse('[button]')
#parser.lexer = new Lexer(lexData);
