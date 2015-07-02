var rxjsSubscription = function (sourceModel, subscriberModel) {
    var _this = this;
    this.source = sourceModel;
    this.subscriber = subscriberModel;

    this.subject = new Rx.Subject();
    // This implementation is specific for RxJS
    this.subscription = this.source.getOutput().subscribe(
        function (e) {
            _this.subject.onNext(e);
        },
        function (err) {
            console.log("Whoopsie, an error");
            //_this.subject.onError(err);
        },
        function () {
            console.log("The journey ends here");
            //_this.subject.onCompleted();
        });
    //this.subscription = this.source.getOutput().subscribe(this.subject);
    this.output = this.subject.asObservable().share().pausable();
    
    this.test = this.output.subscribe(
        function (e) {
            console.log("Subsription output from node " + 
                _this.source._controlNode.getId());
        });

    // Create an internal subscription for depeloping purposes.
    //this.internalSubscription = null;
    //this.addInternalSubscription(function (event) {
    //    console.log("Event: " + event);
    //});
};

rxjsSubscription.prototype.dispose = function () {
    this.subscription.dispose();
};

rxjsSubscription.prototype.pause = function (paused) {
    // For other implementations the pause might be completely different,
    // depending if the language natively supports it or not.
    return paused ? this.output.pause() : this.output.resume();
};

rxjsSubscription.prototype.getOutput = function () {
    return this.output;
};

rxjsSubscription.prototype.updateInput = function (updatedNode) {
    // When the source node has updated, it needs to update the subject
    // representing the connection, thereby making sure that the subscribers
    // receive the correct events.
    var newSubscription = updatedNode.getOutput().subscribe(
        function (e) {
            _this.subject.onNext();
        },
        function (err) {
            _this.subject.onError(err);
        },
        function () {
            _this.subject.onCompleted();
        });
    this.subscription.dispose();
    this.subscription = newSubscription;
    this.test.dispose();
    this.test = this.output.subscribe(
        function (e) {
            console.log("Subsription output from node " +
                _this.source._controlNode.getId());
        });
    //this.addInternalSubscription(function (event) {
    //    console.log("Event: " + event);
    //})
};

rxjsSubscription.prototype.remove = function () {
    // Prepare everything for the removal of this subscription.
    this.subscription.dispose();

};

//rxjsSubscription.prototype.addInternalSubscription = function (fn) {
//    if (this.internalSubscription !== null) { this.internalSubscription.dispose(); }
//    this.internalSubscription = this.output.subscribe(fn);
//};