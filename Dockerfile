FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY backend/expense/expense /app

RUN chmod +x mvnw

RUN ./mvnw clean install -DskipTests

CMD ["java", "-jar", "target/expense-0.0.1-SNAPSHOT.jar"]