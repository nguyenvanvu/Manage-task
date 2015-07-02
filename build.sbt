name := "dashboard"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  javaJdbc,
  javaEbean,
  cache,  
  "com.google.code.gson" % "gson" % "2.3",
  "mysql" % "mysql-connector-java" % "5.1.18",
  "com.google.api-client" % "google-api-client" % "1.18.0-rc",
  "com.google.http-client" % "google-http-client-jackson" % "1.15.0-rc"
)     

play.Project.playJavaSettings
