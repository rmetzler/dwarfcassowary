Object.subclass('ConstraintLayoutInfo',
'default category', {
    initialize: function(aMorph, posX, posY, extX, extY /* all are ClVariables */) {
        this.setMorph(aMorph);
        var extent = aMorph.getExtent(),
            position = aMorph.getPosition();
        this.position = {
            x: posX || new ClVariable(position.x),
            y: posY || new ClVariable(position.y)
        };
        this.extent = {
            x: extX || new ClVariable(extent.x),
            y: extY || new ClVariable(extent.y)
        };
    },


    setMorph: function(aMorph) {
        this.morph = aMorph;
        aMorph.setLayoutConstraintInfo(this);
    },
    getMorph: function() {
        return this.morph;
    },


    updateThisMorph: function() {

        var newExtent = pt(
            this.extent.x.value(),
            this.extent.y.value());
        var newPosition = pt(
            this.position.x.value(),
            this.position.y.value());
                
        var morph = this.getMorph();
        //alert('updateThisMorph ' + this.getMorph().getExtent() + ' -> ' + newExtent);

        morph.setExtent(newExtent);
        morph.setPosition(newPosition);
    },

});

lively.morphic.Layout.Layout.subclass('ConstraintLayout',
'default category', {
    initialize: function($super, container) {
        $super(container);
        this.constraints = [];
        
        var containerExtent = this.getContainer().getExtent();
        this.extent = {};
        this.extent.x = new ClVariable(containerExtent.x);
        this.extent.y = new ClVariable(containerExtent.y);

        this.isUpAndRunning = true;
    },
    basicLayout: function(container, submorphs) {
        if (!this.isUpAndRunning) {
            return;
        }
        var solver = new ClSimplexSolver(); 
        
        solver.addStay(this.extent.x);
        solver.addStay(this.extent.y);

        solver.addEditVar(this.extent.x);
        solver.addEditVar(this.extent.y);

        this.constraints.forEach(function(ea) {
            solver.addConstraint(ea);
        });
/*
        submorphs.forEach(function(ea) {
            var ci = ea.getLayoutConstraintInfo();
            solver.
                addStay(ci.extent.x).
                addStay(ci.extent.y).
                addStay(ci.position.x).
                addStay(ci.position.y);
        });
*/        
        solver.beginEdit();
        var extent = this.getContainer().getExtent();
        solver.suggestValue(this.extent.x, extent.x);
        solver.suggestValue(this.extent.y, extent.y);
        //solver.resolve();
        solver.endEdit();
        
        submorphs.forEach( function(ea) { 
            var lcInfo = ea.getLayoutConstraintInfo()
            if (lcInfo) {
                lcInfo.updateThisMorph(); 
            }
        });
    },


    handlesSubmorphResized: function() {
        return true;
    },

    onSubmorphRemoved: function($super, aMorph, aSubmorph, allSubmorphs) {
        aSubmorph.setLayoutConstraintInfo(undefined);
        $super(aMorph, aSubmorph, allSubmorphs);

        // TODO what happens to constraints that include variables from old layout info?
    },
    onSubmorphAdded: function($super, aMorph, aSubmorph, allSubmorphs) {
        var layoutInfo = new lively.morphic.Layout.ConstraintLayoutInfo(aSubmorph);
        aSubmorph.setLayoutConstraintInfo(layoutInfo);
        $super(aMorph, aSubmorph, allSubmorphs);
    },
    onSubmorphResized: function(aMorph, aSubmorph, allSubmorphs) {
        
        console.log('onSubmorphResized');
        
        var lcInfo = aSubmorph.getLayoutConstraintInfo()
        var solver = new ClSimplexSolver(); 

        solver.addStay(lcInfo.extent.x);
        solver.addStay(lcInfo.extent.y);

        solver.addEditVar(lcInfo.extent.x);
        solver.addEditVar(lcInfo.extent.y);

        this.constraints.forEach(function(ea) {
            solver.addConstraint(ea);
        });

        solver.beginEdit();
        var extent = aSubmorph.getExtent();
        var lcInfo = aSubmorph.getLayoutConstraintInfo()
        
        solver.suggestValue(lcInfo.extent.x, extent.x);
        solver.suggestValue(lcInfo.extent.y, extent.y);
        
        solver.resolve();
        
        solver.endEdit(); 
        
        
        aMorph.applyLayout();
        // TODO two entry points for applyLayout: resize submorph or resize container
    },

    addConstraint: function(aConstraint) {
        this.constraints.push(aConstraint);
    },
    
    visualFormat: function(vfstring) {
        var compiled = new VFCompiler().compile(vfstring);
        compiled = compiled.replace(/layout./g, "this.")
        eval(compiled);
    }

});