package com.kylemoore.json

/**
 * Handmade by Kyle
 * name: TestOutput
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure TestOutput {
  static function fromJson(jsonText: String): TestOutput {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as TestOutput
  }
  static function fromJsonUrl(url: String): TestOutput {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): TestOutput {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : TestOutput {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get message(): String
    property get owner(): Long
    property get stdErr(): Boolean
    property get task(): Long
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}