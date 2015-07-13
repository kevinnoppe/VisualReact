var rxjsSubscription = function (controlNode, sourceModel, subscriberModel) {
    var _this = this;
    this._controlNode = controlNode;
    this.source = sourceModel;
    this.subscriber = subscriberModel;
    this.subject = new Rx.Subject();
    this.isPaused = reactiveProcessor.isPaused;

    // Update the state of the subscription
    this.setSubscription();
    // The pausable stream makes sure that the connections can be stopped
    // while the subject makes sure that changes to in- and output are
    // reflected onto the output stream without creating a new output when
    // this happens.
    //this.pausableStream = this.source.getOutput().pausable();
    //// Depending on the current state of the pauser, the stream will
    //// be paused or not.
    //reactiveProcessor.isPaused ?
    //    this.pausableStream.pause() :
    //    this.pausableStream.resume();

    //// This implementation is specific for RxJS
    //this.subscription = this.pausableStream.subscribe(
    //    function (e) {
    //        // For every output, we store the timestamp to be able to 
    //        // reconstruct the execution during debugging.
    //        reactiveProcessor.newInput(
    //            _this.source.getId(),
    //            Date.now(),
    //            e);
    //        //console.log("Output on original subject between " +
    //        //        _this.source.getId() + " and " +
    //        //        _this.subscriber.getId() + " with value " + e);
    //        _this.subject.onNext(e);
    //        //console.log("Original output in node " + _this._controlNode.getId());
    //    },
    //    function (err) {
    //        console.log("Whoopsie, an error");
    //        //_this.subject.onError(err);
    //    },
    //    function () {
    //        console.log("The journey ends here");
    //        //_this.subject.onCompleted();
    //    });

    //this.pausableOutput = this.pausableSubject.asObservable().share().pausable().publish();
    
    //this.test = this.output.subscribe(
    //    function (e) {
    //        //console.log("Subsription output to node " + 
    //        //    _this.subscriber.getControlNode().getId());
    //        alert("Output! " + e);
    //    });

    // Create the updateInput function inside the constructor since it uses
    // a reference to the _this which is lost when the function is added 
    // later on.
    //this.updateInput = function (updatedNode) {
    //    // When the source node has updated, it needs to update the subject
    //    // representing the connection, thereby making sure that the subscribers
    //    // receive the correct events.
    //    //console.log("Updating input of node " + this.subscriber.getId());

    //    this.subscription.dispose();
    //    this.pausableStream = updatedNode.getOutput().pausable();

    //    //reactiveProcessor.isPaused ?
    //    //    this.pausableStream.pause() :
    //    //    this.pausableStream.resume();

    //    this.subscription = this.pausableStream.subscribe(
    //        function (e) {
    //            //console.log("Output on subject between " +
    //            //    _this.source.getId() + " and " +
    //            //    _this.subscriber.getId() + " with value " + e);
    //            _this.subject.onNext(e);
    //        },
    //        function (err) {
    //            console.log("Whoopsie, an error");
    //            _this.subject.onError(err);
    //        },
    //        function () {
    //            console.log("The journey ends here");
    //            _this.subject.onCompleted();
    //        });

    //    this.pausableStream.resume();
    //    //this.test.dispose();
    //    //this.test = this.output.subscribe(
    //    //    function (e) {
    //    //        //console.log("Output to node " +
    //    //        //    _this.subscriber.getControlNode().getId());
    //    //    });
    //};
};

rxjsSubscription.prototype.debugOnNext = function (_this) {
    var fnOnNext = function (event) {
         var cont = function () {
            //console.log("Continue function called");
             _this.subject.onNext(event);
        };
        if (_this.isPaused) {
            //alert("Event received on node " + _this.subscriber.getId() +
            //    " while being paused.");
            // Start listening for the step or resume button to be pressed.
            console.log("Currently paused between " + _this.source.getId() +
                " and " + _this.subscriber.getId());
            reactiveProcessor.newInput(
                _this.source.getId(),
                Date.now(),
                event);
            reactiveProcessor.waitForStep(cont);
        } else {
            _this.subject.onNext(event);
            reactiveProcessor.newInput(
                _this.source.getId(),
                Date.now(),
                event);
        }

    }
    return fnOnNext;
};

rxjsSubscription.prototype.debugOnError = function (_this) {
    var fnOnError = function (error) {
        if (_this.isPaused) {
            console.log("Error received on node " + _this.subscriber.getId() +
                " while being paused.");
            _this.subject.onError(error);
        } else {
            console.log("Error received on node " + _this.subscriber.getId() +
                ".");
            _this.subject.onError(error);
        }
    }
    return fnOnError;
};

rxjsSubscription.prototype.debugOnCompleted = function (_this) {
    var fnOnCompleted = function () {
        if (_this.isPaused) {
            console.log("Stream ended on node " + _this.subscriber.getId() +
                " while being paused.");
            _this.subject.onCompleted();
        } else {
            console.log("Stream ended on node " + _this.subscriber.getId() +
                ".");
            _this.subject.onCompleted();
        }
    }
    return fnOnCompleted;
};

rxjsSubscription.prototype.setSubscription = function (updatedNode) {
    var _this = this;
    var updatedNode = updatedNode || this.source;
    this.debugSubscription && this.debugSubscription.dispose();
    this.debugSubscription = updatedNode.getOutput().subscribe(
        this.debugOnNext(this),
        this.debugOnError(this),
        this.debugOnCompleted(this));

    //this.pausableStream = updatedNode.getOutput().pausable();
    //this.subscription && this.subscription.dispose();
    // This implementation is specific for RxJS
    //this.subscription = this.pausableStream.subscribe(
    //    function (e) {
    //        // For every output, we store the timestamp to be able to 
    //        // reconstruct the execution during debugging.
    //        reactiveProcessor.newInput(
    //            _this.source.getId(),
    //            Date.now(),
    //            e);
    //        //console.log("Output on original subject between " +
    //        //        _this.source.getId() + " and " +
    //        //        _this.subscriber.getId() + " with value " + e);
    //        _this.subject.onNext(e);
    //        //console.log("Original output in node " + 
    //            //_this._controlNode.getId());
    //    },
    //    function (err) {
    //        console.log("Whoopsie, an error");
    //        //_this.subject.onError(err);
    //    },
    //    function () {
    //        console.log("The journey ends here");
    //        //_this.subject.onCompleted();
    //    });

    // !! Make sure the paused state of the subscription is correct because
    // !! RxJS automatically pauses all new subscriptions to a pausable stream.
    //reactiveProcessor.isPaused ?
    //    this.pausableStream.pause() :
    //    this.pausableStream.resume();
};

rxjsSubscription.prototype.updateInput = function (updatedNode) {
    this.setSubscription(updatedNode);
};

rxjsSubscription.prototype.dispose = function () {
    //this.subsription && this.subscription.dispose();
    this.debugSubscription && this.debugSubscription.dispose(); 
};

rxjsSubscription.prototype.pause = function (paused) {
    // For other implementations the pause might be completely different,
    // depending if the language natively supports it or not.
    //return paused ? this.pausableStream.pause() : this.pausableStream.resume();
    this.isPaused = paused;
};

rxjsSubscription.prototype.getOutput = function () {
    return this.subject.asObservable().share();
};

rxjsSubscription.prototype.remove = function () {
    // Prepare everything for the removal of this subscription.
    this.dispose();
};

rxjsSubscription.prototype.emitEvent = function (event) {
    console.log("Re-emit event!");
    // Make sure to take care of the paused streams. Currently they are
    // dropping new event so just re-executing them blindly wou have no
    // effect at all.
    this.subject.onNext(event);
};