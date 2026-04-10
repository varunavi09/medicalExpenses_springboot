FROM openjdk:17

WORKDIR /app

COPY backend/expense/expense /app

RUN chmod +x mvnw

RUN ./mvnw clean install

CMD ["./mvnw", "spring-boot:run"]