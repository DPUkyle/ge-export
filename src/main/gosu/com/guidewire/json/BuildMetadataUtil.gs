package com.guidewire.json

uses java.time.Duration

/**
 * Enhancing an iterable bound by a structure is tricky; this utility class will take its place for now
 */
class BuildMetadataUtil {

  static function getAverageBuildTime(builds : List<BuildMetadata>) : Duration {
    var durations = builds.map(\e -> e.TotalBuildTime.toMillis())
    return Duration.ofMillis(durations.average().longValue())
  }

  /**
   * @param n Number of most recent builds to return
   * @return a list of the n most recent builds
   */
  static function getMostRecent(n : int, builds : List<BuildMetadata>) : List<BuildMetadata> {
    var ct = builds.Count
    return builds.subList(Math.max(0, ct - n), ct)
  }

  function withTag(tag : String) : List<BuildMetadata> {
    return {} //fixme  
  }

}