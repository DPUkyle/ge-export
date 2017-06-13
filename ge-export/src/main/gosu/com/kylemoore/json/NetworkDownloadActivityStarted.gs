package com.kylemoore.json

/**
 * Handmade by Kyle
 * name: NetworkDownloadActivityStarted
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure NetworkDownloadActivityStarted {
  static function fromJson(jsonText: String): NetworkDownloadActivityStarted {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as NetworkDownloadActivityStarted
  }
  static function fromJsonUrl(url: String): NetworkDownloadActivityStarted {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): NetworkDownloadActivityStarted {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : NetworkDownloadActivityStarted {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get contentLength(): Long
    property get contentType(): String
    property get id(): Long
    property get location(): String
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}