FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY backend/expense/expense /app

RUN apt-get update && apt-get install -y maven

RUN mvn clean install

CMD ["mvn", "spring-boot:run"]