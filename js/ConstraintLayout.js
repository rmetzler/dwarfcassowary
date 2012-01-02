Object.subclass('ConstraintLayoutInfo',
'default category', {
    initialize: function(aMorph) {
        this.setMorph(aMorph);
        var extent = aMorph.getExtent(),
            position = aMorph.getPosition();
        this.position = {
            x: new ClVariable(position.x),
            y: new ClVariable(position.y)
        };
        this.extent = {
            x: new ClVariable(extent.x),
            y: new ClVariable(extent.y)
        };
    },


    setMorph: function(aMorph) {
        this.morph = aMorph;
    },
    getMorph: function() {
        return this.morph;
    },


    updateThisMorph: function() {
        var morph = this.getMorph();
        var newExtent = pt(
            this.extent.x.value(),
            this.extent.y.value())
        //alert('updateThisMorph ' + this.getMorph().getExtent() + ' -> ' + newExtent);
        morph.setExtent(newExtent);
        morph.setPosition(pt(
            this.position.x.value(),
            this.position.y.value()));
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
        
        submorphs.forEach(function(ea) { ea.getLayoutConstraintInfo().updateThisMorph(); });
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
        aMorph.applyLayout();
        // TODO two entry points for applyLayout: resize submorph or resize container
    },

    addConstraint: function(aConstraint) {
        this.constraints.push(aConstraint);
    },

});