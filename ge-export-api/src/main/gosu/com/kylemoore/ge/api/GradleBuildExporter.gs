package com.kylemoore.ge.api

uses java.time.ZonedDateTime

interface GradleBuildExporter {

  static property get make() : GradleBuildExporter {
    return ServiceFactory.GradleBuildExporterImpl
  }

  function since(since: ZonedDateTime) : GradleBuildExporter

  function between(from : ZonedDateTime, to : ZonedDateTime) : GradleBuildExporter

  function sinceBuild(buildId: String) : GradleBuildExporter

  function excluding(buildPublicId : String) : GradleBuildExporter

  function excluding(buildPublicIds : String[]) : GradleBuildExporter

  function excludingBuildsByUser(username : String) : GradleBuildExporter
  
  function excludingBuildsByUsers(usernames : String[]) : GradleBuildExporter

  function withTag(tag: String) : GradleBuildExporter

  function withTags(tags: String[]) : GradleBuildExporter

  function withProjectName(name: String) : GradleBuildExporter

  function withOsFamily(family: String) : GradleBuildExporter

  function withUsername(username: String) : GradleBuildExporter

  function withHostname(hostname: String) : GradleBuildExporter

  function withCustomValue(key: String, value: String) : GradleBuildExporter

  function withCustomValues(map: Map<String, String>) : GradleBuildExporter

  /**
   * @param task
   * @return Builds explicitly requesting this task.
   */
  function withRequestedTask(task: String) : GradleBuildExporter

  /**
   * @param task
   * @return Builds explicitly not requesting this sole task. This is an inversion of {@link #withRequestedTask(String)} 
   */
  function withAnythingButThisRequestedTask(task: String) : GradleBuildExporter  
  
  /**
   * @param tasks
   * @return Builds explicitly requesting this exact list of tasks. Order doesn't matter.
   */
  function withExactRequestedTasks(tasks: String[]) : GradleBuildExporter

  /**
   * @param tasks
   * @return Builds explicitly requesting any of these tasks.
   */
  function withAnyRequestedTasks(tasks: String[]) : GradleBuildExporter

  /**
   * @return Successful builds only.
   * @throws IllegalStateException if used in conjunction with {@link #withFailedBuildsOnly() withFailedBuildsOnly}
   */
  function withSuccessfulBuildsOnly() : GradleBuildExporter

  /**
   * @return Failed builds only.
   * @throws IllegalStateException if used in conjunction with {@link #withSuccessfulBuildsOnly() withSuccessfulBuildsOnly}
   */
  function withFailedBuildsOnly() : GradleBuildExporter

  function withDebugLogging() : GradleBuildExporter

  function execute() : List<Build>
}