package com.example.genius_maker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class GeniusMakerApplication {

    public static void main(String[] args) {
        SpringApplication.run(GeniusMakerApplication.class, args);
    }

}
