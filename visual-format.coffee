jison = (require 'jison')#.Jison
#lexer = 

console.log jison
#lexData=
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
    'visualFormatString': ['orientation left_connection_to_superview view more_connections']
    'orientation': ['', 'H:', 'V:']
    'superview': ['|']
    'view': ['[ viewName predicateListWithParens ]']
    'more_connections': ['EOF', 'right_connection_to_superview', 'connection_to_view']
    'left_connection_to_superview' : ['', 'superview connection']
    'right_connection_to_superview' : ['connection superview EOF']
    'connection_to_view': ['connection view EOF', 'connection view connection_to_view']
    'connection': ['','-','- predicateList -'] 
    
    'predicateList': ['simplePredicate','predicateListWithParens']
    'simplePredicate': ['metricName','number']
    'predicateListWithParens': ['', '( predicate more_predicates )']
    'more_predicates':['', ', predicate more_predicates']
    'predicate': ['objectOfPredicate','relation objectOfPredicate', 'objectOfPredicate @ priority', 'relation objectOfPredicate @priority']
    
    'relation': ['==','<=','>=']
    'objectOfPredicate': ['constant','viewName']
    'priority': ['metricName', 'number']
    'constant': ['metricName', 'number']
    'viewName': ['IDENTIFIER', "$$ = 'yytext';"]
    'viewName': ['IDENTIFIER', "$$ = 'yytext';"]
    'number'  : ['NUMBER']

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
parser.parse('[button]')
parser.parse '[button]-[textfield]'
parser.parse '|-[button]-|'
parser.parse '|-[button (>= 50) ]-|'
parser.parse '|-50-[orchidbox]-50-|'
parser.parse 'V:[topField]-10-[bottomField]'
parser.parse '[maroonView][oceanView]'
parser.parse '[button(100@20)]'
parser.parse '[button1(==button2)]'
parser.parse '[flexibleButton(>=70,<=100)]'
parser.parse '|-[find]-[findNext]-[findField(>=20)]'

#parser.lexer = new Lexer(lexData);
