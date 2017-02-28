package com.guidewire

uses org.reactivestreams.Publisher
uses org.reactivestreams.Subscriber
uses org.reactivestreams.Subscription
uses ratpack.stream.TransformablePublisher

class MatchingCriteriaPublisher<I, O> implements TransformablePublisher<O> {

  final var _parent : O
  final var _publisher : Publisher<I>
  final var _match : Match
  final var _debug : boolean
  
  construct(publisher : Publisher<I>, finders : List<AdditionalMatchingCriteria<I>>, parent : O, debug : boolean = false) {
    _publisher = publisher
    _match = new Match(finders)
    _parent = parent
    _debug = debug
  }
  
  override function subscribe(subscriber: Subscriber) {
    if(_debug) {
      print("subscribing to ${_parent}")
    }
    _publisher.subscribe(new Subscriber<I>() {

      var upstream : Subscription
      var open : boolean

      override function onSubscribe(subscription : Subscription) {
        upstream = subscription
        subscriber.onSubscribe(new Subscription() {
          override function request(l : long) {
            if (upstream != null) {
              if (!open) {
                upstream.request(l)
                if (l == Long.MAX_VALUE) {
                  open = true
                }
              }
            }
          }
          
          override function cancel() {
            upstream.cancel()
          }
          
        })
      }
      override function onNext(i: I) {
        if (upstream == null) {
          return
        }
        try {
          for(f in _match.UnmetCriteria) {
            if(_debug) {
              print("calling ${f} and passing ${i}")
            }
            var result = f.apply(i)
            if(result) {
              _match.match(f)
              print("matched!")
            }
            print(result)
          }
        } 
        catch (e : Exception) {
          upstream.cancel()
          onError(e)
          return
        }
        if(_match.UnmetCriteria.Empty) {
          upstream.cancel()
          upstream = null
          subscriber.onNext(_parent)
          subscriber.onComplete()
        }
      }

      override function onError(throwable : Throwable) {
        if (upstream != null) {
          subscriber.onError(throwable)
        }
      }

      override function onComplete() {
        if (upstream != null) {
          subscriber.onComplete()
        }
      }
    })
  }
  
  private class Match {
    
    final var _status : Map<AdditionalMatchingCriteria, Boolean> = new HashMap<AdditionalMatchingCriteria, Boolean>()
    
    construct(finders : List<AdditionalMatchingCriteria>) {
      for(finder in finders) {
        _status.put(finder, false)
      }
    }
    
    property get UnmetCriteria() : Set<AdditionalMatchingCriteria> {
      return _status.filterByValues( \ v -> v == false ).Keys
    }
   
    function match(func : AdditionalMatchingCriteria) {
      _status.put(func, true)
    }

  }
  
}