package com.guidewire.json

structure BuildStarted_1_0 {
  static function fromJson( jsonText: String ): BuildStarted_1_0 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as BuildStarted_1_0
  }
  static function fromJsonUrl( url: String ): BuildStarted_1_0 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl( url: java.net.URL ): BuildStarted_1_0 {
    return url.JsonContent
  }
  static function fromJsonFile( file: java.io.File ) : BuildStarted_1_0 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get timestamp(): Long
  property get ordinal(): Integer
  structure data {
  }
}