# Multi-stage build: build with Maven, run with lightweight JRE

FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /workspace

# Copy pom + sources and build
COPY pom.xml ./
COPY src ./src

# Build the application (skip tests to speed up)
RUN mvn -B -DskipTests package

# Runtime image
FROM eclipse-temurin:17-jre-jammy AS runtime
WORKDIR /app

# Copy jar produced by the build stage
COPY --from=build /workspace/target/*.jar ./app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
