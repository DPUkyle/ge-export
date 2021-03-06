package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: Hardware
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure Hardware extends BuildEvent {
  static function fromJson(jsonText: String): Hardware {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as Hardware
  }
  static function fromJsonUrl(url: String): Hardware {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): Hardware {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : Hardware {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get numProcessors(): Integer
  }
}
