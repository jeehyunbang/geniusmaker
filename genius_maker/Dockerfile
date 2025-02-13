FROM amazoncorretto:17

ARG JAR_FILE=build/libs/genius_maker.jar
COPY ${JAR_FILE} .

ENTRYPOINT ["java", "-jar", "genius_maker.jar"]
