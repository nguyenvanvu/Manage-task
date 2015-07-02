// Comment to get more information during initialization
logLevel := Level.Warn

resolvers ++= Seq(
    "Maven Repository" at "http://mvnrepository.com/",
    "Typesafe Repository" at "http://repo.typesafe.com/typesafe/releases/",
    "CDH4 Maven Repository" at "https://repository.cloudera.com/artifactory/cloudera-repos/"
)

// Use the Play sbt plugin for Play projects
addSbtPlugin("com.typesafe.play" % "sbt-plugin" % System.getProperty("play.version"))