package com.guidewire

uses org.junit.Assert
uses org.junit.Test
uses ratpack.stream.internal.IterablePublisher
uses ratpack.test.exec.ExecHarness

class MatchingCriteriaPublisherTest {

  @Test
  function matchesSingleCriteria() {
    var f : AdditionalMatchingCriteria<String> = \e -> e == "baz"
    var functions = {f}

    var buildPublisher = new IterablePublisher( { "foo" } )
    var eventPublisher = new IterablePublisher( { "bar", "baz" })
    
    var result = ExecHarness.yieldSingle( \ exec -> 
      buildPublisher
        .flatMap( \ build -> new MatchingCriteriaPublisher(eventPublisher, functions, build).toPromise() )
        .toPromise() 
    ).ValueOrThrow

    Assert.assertEquals("foo", result)
  }

  @Test
  function nonMatchingSingleCriteria() {
    var f : AdditionalMatchingCriteria<String> = \e -> e == "will not match"
    var functions = {f}

    var buildPublisher = new IterablePublisher( { "foo" } )
    var eventPublisher = new IterablePublisher( { "bar", "baz" })

    var result = ExecHarness.yieldSingle( \ exec ->
        buildPublisher
            .flatMap( \ build -> new MatchingCriteriaPublisher(eventPublisher, functions, build).toPromise() )
            .toPromise()
    ).ValueOrThrow

    Assert.assertNull(result)
  }

  @Test
  function matchesMultipleCriteria() {
    var f1 : AdditionalMatchingCriteria<String> = \e -> e == "bar"
    var f2 : AdditionalMatchingCriteria<String> = \e -> e == "baz"
    var functions = {f1, f2}

    var buildPublisher = new IterablePublisher( { "foo" } )
    var eventPublisher = new IterablePublisher( { "bar", "baz" })

    var result = ExecHarness.yieldSingle( \ exec ->
        buildPublisher
            .flatMap( \ build -> new MatchingCriteriaPublisher(eventPublisher, functions, build).toPromise() )
            .toPromise()
    ).ValueOrThrow

    Assert.assertEquals("foo", result)
  }

  @Test
  function matchesSomeButNotAllCriteria() {
    var f1 : AdditionalMatchingCriteria<String> = \e -> e == "bar"
    var f2 : AdditionalMatchingCriteria<String> = \e -> e == "will not match"
    var functions = {f1, f2}

    var buildPublisher = new IterablePublisher( { "foo" } )
    var eventPublisher = new IterablePublisher( { "bar", "baz" })

    var result = ExecHarness.yieldSingle( \ exec ->
        buildPublisher
            .flatMap( \ build -> new MatchingCriteriaPublisher(eventPublisher, functions, build).toPromise() )
            .toPromise()
    ).ValueOrThrow

    Assert.assertNull(result)
  }

  @Test
  function multipleParentsMatchSingleCriteria() {
    var f : AdditionalMatchingCriteria<String> = \e -> e == "bar"
    var functions = {f}

    var buildPublisher = new IterablePublisher( { "foo", "42" } ) // both values will be evaluated for the event publisher values
    var eventPublisher = new IterablePublisher( { "bar", "baz" } )

    var result = ExecHarness.yieldSingle( \ exec ->
        buildPublisher
            .flatMap( \ build -> new MatchingCriteriaPublisher(eventPublisher, functions, build).toPromise() )
            .toList()
    ).ValueOrThrow

    Assert.assertEquals({"foo", "42"}, result)
  }

  @Test
  function matchesSomeParentsButNotOthers() {
    var f : AdditionalMatchingCriteria<String> = \e -> e == "bar"
    var functions = {f}

    var buildPublisher = new IterablePublisher( { "foo", "42" } ) // both values will be evaluated for the event publisher values
    var fooEventPublisher = new IterablePublisher( { "bar", "baz" } )
    var otherEventPublisher = new IterablePublisher( { "will", "not", "match" } )

    var result = ExecHarness.yieldSingle( \ exec ->
        buildPublisher
            .flatMap( \ build -> new MatchingCriteriaPublisher(build == "foo" ? fooEventPublisher : otherEventPublisher, functions, build).toPromise() )
            .toList()
    ).ValueOrThrow
    
    result = result.where( \ it -> it != null) //TODO should we filter nulls, or keep them and check the length of input and output lists?

    Assert.assertEquals({"foo"}, result)
  }
  
}