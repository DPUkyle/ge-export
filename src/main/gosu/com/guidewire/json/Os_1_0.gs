package com.guidewire.json

structure Os_1_0 {
  static function fromJson( jsonText: String ): Os_1_0 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as Os_1_0
  }
  static function fromJsonUrl( url: String ): Os_1_0 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl( url: java.net.URL ): Os_1_0 {
    return url.JsonContent
  }
  static function fromJsonFile( file: java.io.File ) : Os_1_0 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get timestamp(): Long
  property get ordinal(): Integer
  structure data {
    property get name(): String
    property get arch(): String
    property get family(): String
    property get version(): String
  }
}