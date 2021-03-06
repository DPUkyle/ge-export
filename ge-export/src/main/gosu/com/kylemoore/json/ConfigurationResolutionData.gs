package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: ConfigurationResolutionData
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure ConfigurationResolutionData extends BuildEvent {
  static function fromJson(jsonText: String): ConfigurationResolutionData {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as ConfigurationResolutionData
  }
  static function fromJsonUrl(url: String): ConfigurationResolutionData {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): ConfigurationResolutionData {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : ConfigurationResolutionData {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get components(): Map<Long, Component>
    property get identities(): Map<Long, ComponentDependency>
    property get failures(): Map<Long, ExceptionTree>
    property get dependencies(): Map<Long, ComponentIdentity>
  }
}
