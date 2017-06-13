package com.kylemoore.json

/**
 * Handmade by Kyle
 * name: ComponentDependency
 * majorVersion: 2
 * minorVersion: 0
 *
 */
structure ComponentDependency {
  static function fromJson(jsonText: String): ComponentDependency {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as ComponentDependency
  }
  static function fromJsonUrl(url: String): ComponentDependency {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): ComponentDependency {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : ComponentDependency {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get attempted(): Long
    property get attemptedReason(): Integer
    property get requested(): Long
    property get to(): Long
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}