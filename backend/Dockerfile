FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app

RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/target/*.jar app.jar
COPY waitForPostgres.sh .
RUN chmod +x waitForPostgres.sh
EXPOSE 8080
ENTRYPOINT ["./waitForPostgres.sh", "java", "-jar", "app.jar"]
