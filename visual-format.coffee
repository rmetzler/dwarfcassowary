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
    'orientation': [
      ['',   "/* x and width */"] 
      ['H:', "/* x and width */"] 
      ['V:', "/* y and height */"]
    ]
    'view': [
      ['[ viewName predicateListWithParens ]', "/* find morph viewName and add Constraints */"]
    ]
    'more_connections': ['EOF', 'right_connection_to_superview', 'connection_to_view']
    'left_connection_to_superview' : [
      ['', '/* no constraint */']
      ['| connection', '/* connect to superview */']
    ]
    'right_connection_to_superview' : [
      ['connection | EOF', '/* connect to superview */']
    ]
    'connection_to_view': [
      ['connection view EOF', '/* should add both, connection and view constraints */']
      ['connection view connection_to_view', '/* should add both, connection and view constraints */']
      ]

    'connection': [
      ['', '/* space equals 0 */']
      ['-', '/* default space constraints */']
      ['- predicateList -', '/* space has predicateList constraints */']
    ] 
    
    'predicateList': ['simplePredicate','predicateListWithParens']
    'simplePredicate': ['metricName','number']
    'predicateListWithParens': ['', '( predicate more_predicates )']
    'more_predicates':['', ', predicate more_predicates']
    'predicate': ['objectOfPredicate','relation objectOfPredicate', 'objectOfPredicate @ priority', 'relation objectOfPredicate @ priority']
    
    'relation': [
      ['==', '/* equal*/']
      ['<=', '/* greater or equal*/']
      ['>=', '/* greater or equal*/']
    ]
    'objectOfPredicate': ['constant','viewName']
    'priority': ['metricName', 'number']
    'constant': ['metricName', 'number']
    'viewName': [['IDENTIFIER', "$$ = 'yytext';"]]
    'number'  : [['NUMBER', "$$ = 'yytext'; /*number*/"]]

###
    <viewName>
    Parsed as a C identifier.
    This must be a key mapping to an instance of NSView in the passed views dictionary.

    <metricName>
    Parsed as a C identifier. This must be a key mapping to an instance of NSNumber in the passed metrics dictionary.

    <number>
    As parsed by strtod_l, with the C locale.
###

fs = require('fs')

parser = new jison.Parser(grammar)
parserSource = parser.generate()
fs.writeFileSync('visual-format-parser',parserSource, encoding='utf8')
#console.log parserSource

#console.log parser
parser.parse('[button]')
parser.parse '[button]-[textfield]'
parser.parse '|-[button]-|'
parser.parse '|[button]|'
parser.parse '|-[button (>= 50) ]-|'
parser.parse '|-50-[orchidbox]-50-|'
parser.parse 'V:[topField]-10-[bottomField]'
parser.parse '[maroonView][oceanView]'
parser.parse '[button(100@20)]'
parser.parse '[button1(==button2)]'
parser.parse '[flexibleButton(>=70,<=100)]'
parser.parse '|-[find]-[findNext]-[findField(>=20)]'

#parser.lexer = new Lexer(lexData);
