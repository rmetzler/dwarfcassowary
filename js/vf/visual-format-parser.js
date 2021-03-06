/* Jison generated parser MANUALLY EDITED!! */
var VFParser = (function(){
undefined
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"visualFormatString":3,"orientation":4,"left_connection_to_superview":5,"view":6,"more_connections":7,"H:":8,"V:":9,"[":10,"viewName":11,"predicateListWithParens":12,"]":13,"|":14,"connection":15,"EOF":16,"right_connection_to_superview":17,"connection_to_view":18,"-":19,"predicateList":20,"simplePredicate":21,"metricName":22,"number":23,"(":24,"predicate":25,"more_predicates":26,")":27,",":28,"objectOfPredicate":29,"relation":30,"@":31,"priority":32,"==":33,"<=":34,">=":35,"constant":36,"IDENTIFIER":37,"NUMBER":38,"$accept":0,"$end":1},
terminals_: {2:"error",8:"H:",9:"V:",10:"[",13:"]",14:"|",16:"EOF",19:"-",22:"metricName",24:"(",27:")",28:",",31:"@",33:"==",34:"<=",35:">=",37:"IDENTIFIER",38:"NUMBER"},
productions_: [0,[3,4],[4,0],[4,1],[4,1],[6,4],[5,0],[5,2],[7,1],[7,1],[7,1],[17,3],[18,2],[18,3],[15,0],[15,1],[15,3],[20,1],[20,1],[21,1],[21,1],[12,0],[12,4],[26,0],[26,3],[25,1],[25,2],[25,3],[25,4],[30,1],[30,1],[30,1],[29,1],[29,1],[32,1],[32,1],[36,1],[36,1],[11,1],[23,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1:/* create Solver */
this.$ = [$$[$0-3],$$[$0-1],$$[$0-2],$$[$0] ];
//console.log(this.$);
return this.$;
break;
case 2:/* x and width */
this.$ = ['orientation', 'x'];
break;
case 3:/* x and width */
this.$ = ['orientation', 'x'];
break;
case 4:/* y and height */
this.$ = ['orientation', 'y'];
break;
case 5:/* find morph viewName and add Constraints */
//console.log('viewName = ' + $$[$0-2]);
//console.log('predicates = ' + $$[$0-1]);
this.$ = ['view',$$[$0-2],$$[$0-1]];
break;
case 6:/* no constraint */
this.$ = 'no_left_superview_connect';
break;
case 7:/* connect to superview */
this.$ = ['left_superview_connect', $$[$0]];
break;
case 8:this.$ = ['no more connections'];
break;
case 9:this.$ = $$[$0];
break;
case 10://console.log('connection_to_view = ' + $$[$0]);
this.$ = $$[$0];
break;
case 11:/* connect to superview */
this.$ = ['right_superview_connect', $$[$0-2]];
break;
case 12:/* should add both, connection and view constraints */
this.$ = ['connection_to_view', $$[$0-1], $$[$0]];
break;
case 13:/* should add both, connection and view constraints */
this.$ = ['connection_to_view', $$[$0-2], $$[$0-1], $$[$0]];
break;
case 14:/* space equals 0 */
this.$ = ['connection_no_space']; 
break;
case 15:/* default space constraints */
this.$ = ['connection_default'];
break;
case 16:/* connection has predicateList constraints */
this.$ = ['connection_with_predicates', $$[$0-1]];
break;
case 17:this.$ = [$$[$0]];
break;
case 18:this.$ = [$$[$0]];
break;
case 19:this.$ = [$$[$0]];
break;
case 20:this.$ = [$$[$0]];
break;
case 21:/* no predicates */
this.$ = ['predicates_no'];
break;
case 22:/* predicate */
this.$ = ['predicate',$$[$0-2], $$[$0-1]];
break;
case 23:this.$ = '.';
break;
case 24:this.$ = $$[$0-1];
break;
case 25:this.$ = ['obj_of_predicate', $$[$0]];
break;
case 26:this.$ = ['rel_and_obj', $$[$0-1], $$[$0]];
break;
case 27:this.$ = ['obj_at_priority',$$[$0-2],$$[$0]];
break;
case 28:this.$ = ['rel_and_obj_at_priority', $$[$0-3], $$[$0-2], $$[$0]];
break;
case 29:/* equal*/
this.$ = '==';
break;
case 30:/* greater or equal*/
this.$ = '<=';
break;
case 31:/* greater or equal*/
this.$ = '>='; 
break;
case 32: this.$ = ['obj_of_predicate', 'constant', $$[$0]]; 
break;
case 33: this.$ = ['obj_of_predicate', 'viewname', $$[$0]]; 
break;
case 34: this.$ = [$$[$0]]; 
break;
case 35: this.$ = [$$[$0]]; 
break;
case 36: this.$ = [$$[$0]]; 
break;
case 37: this.$ = [$$[$0]]; 
break;
case 38:this.$ = yytext;
//console.log(yytext);
break;
case 39:this.$ = yytext; /*number*/
//console.log(yytext);
break;
}
},
table: [{3:1,4:2,8:[1,3],9:[1,4],10:[2,2],14:[2,2]},{1:[3]},{5:5,10:[2,6],14:[1,6]},{10:[2,3],14:[2,3]},{10:[2,4],14:[2,4]},{6:7,10:[1,8]},{10:[2,14],15:9,19:[1,10]},{7:11,10:[2,14],14:[2,14],15:15,16:[1,12],17:13,18:14,19:[1,10]},{11:16,37:[1,17]},{10:[2,7]},{10:[2,15],12:20,14:[2,15],19:[2,21],20:18,21:19,22:[1,21],23:22,24:[1,23],38:[1,24]},{1:[2,1]},{1:[2,8]},{1:[2,9]},{1:[2,10]},{6:26,10:[1,8],14:[1,25]},{12:27,13:[2,21],24:[1,23]},{13:[2,38],24:[2,38],27:[2,38],28:[2,38],31:[2,38]},{19:[1,28]},{19:[2,17]},{19:[2,18]},{19:[2,19]},{19:[2,20]},{11:33,22:[1,37],23:38,25:29,29:30,30:31,33:[1,34],34:[1,35],35:[1,36],36:32,37:[1,17],38:[1,24]},{19:[2,39],27:[2,39],28:[2,39],31:[2,39]},{16:[1,39]},{1:[2,12],7:40,10:[2,14],14:[2,14],15:15,16:[1,12],17:13,18:14,19:[1,10]},{13:[1,41]},{10:[2,16],14:[2,16]},{26:42,27:[2,23],28:[1,43]},{27:[2,25],28:[2,25],31:[1,44]},{11:33,22:[1,37],23:38,29:45,36:32,37:[1,17],38:[1,24]},{27:[2,32],28:[2,32],31:[2,32]},{27:[2,33],28:[2,33],31:[2,33]},{22:[2,29],37:[2,29],38:[2,29]},{22:[2,30],37:[2,30],38:[2,30]},{22:[2,31],37:[2,31],38:[2,31]},{27:[2,36],28:[2,36],31:[2,36]},{27:[2,37],28:[2,37],31:[2,37]},{1:[2,11]},{1:[2,13]},{1:[2,5],10:[2,5],14:[2,5],16:[2,5],19:[2,5]},{27:[1,46]},{11:33,22:[1,37],23:38,25:47,29:30,30:31,33:[1,34],34:[1,35],35:[1,36],36:32,37:[1,17],38:[1,24]},{22:[1,49],23:50,32:48,38:[1,24]},{27:[2,26],28:[2,26],31:[1,51]},{13:[2,22],19:[2,22]},{26:52,27:[2,23],28:[1,43]},{27:[2,27],28:[2,27]},{27:[2,34],28:[2,34]},{27:[2,35],28:[2,35]},{22:[1,49],23:50,32:53,38:[1,24]},{27:[2,24]},{27:[2,28],28:[2,28]}],
defaultActions: {9:[2,7],11:[2,1],12:[2,8],13:[2,9],14:[2,10],19:[2,17],20:[2,18],21:[2,19],22:[2,20],39:[2,11],40:[2,13],52:[2,24]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        _handle_error:
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + this.terminals_[symbol]+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }

            preErrorSymbol = symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};/* Jison generated lexer */
var lexer = (function(){

var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            match = this._input.match(this.rules[rules[i]]);
            if (match) {
                lines = match[0].match(/\n.*/g);
                if (lines) this.yylineno += lines.length;
                this.yylloc = {first_line: this.yylloc.last_line,
                               last_line: this.yylineno+1,
                               first_column: this.yylloc.last_column,
                               last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                this._more = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, rules[i],this.conditionStack[this.conditionStack.length-1]);
                if (token) return token;
                else return;
            }
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:return 8;
break;
case 2:return 9;
break;
case 3:return 31;
break;
case 4:return 19;
break;
case 5:return 14;
break;
case 6:return 10;
break;
case 7:return 13;
break;
case 8:return 24;
break;
case 9:return 27;
break;
case 10:return 33;
break;
case 11:return 35;
break;
case 12:return 34;
break;
case 13:return 28;
break;
case 14:return 16;
break;
case 15:return 38;
break;
case 16:return 37;
break;
}
};
lexer.rules = [/^\s+/,/^H:/,/^V:/,/^@/,/^-/,/^\|/,/^\[/,/^]/,/^\(/,/^\)/,/^==/,/^>=/,/^<=/,/^,/,/^$/,/^[0-9]+(?:\.[0-9]+)?\b/,/^[_A-Za-z][_A-Za-z0-9]*\b/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],"inclusive":true}};return lexer;})()
parser.lexer = lexer;
return parser;
})();