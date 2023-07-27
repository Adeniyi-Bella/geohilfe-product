package teammember;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class TeamMember {
    // Main class to run the application
    public static void main(String[] args) {
        SpringApplication.run(teammember.TeamMember.class, args);
        System.out.println("Hello World");
    }

}
