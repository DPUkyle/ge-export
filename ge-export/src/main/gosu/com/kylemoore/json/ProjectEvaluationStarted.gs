package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: ProjectEvaluationStarted
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure ProjectEvaluationStarted extends BuildEvent {
  static function fromJson(jsonText: String): ProjectEvaluationStarted {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as ProjectEvaluationStarted
  }
  static function fromJsonUrl(url: String): ProjectEvaluationStarted {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): ProjectEvaluationStarted {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : ProjectEvaluationStarted {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get projectPath(): String
  }
}
