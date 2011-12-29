Object.subclass('ClObject',
'default category', {},
'debugging', {
    toString: function() { return 'a ' + this.constructor.type },
});