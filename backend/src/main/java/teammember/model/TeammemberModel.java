package teammember.model;

import lombok.*;

import javax.persistence.*;

import java.util.UUID;

// Lombok annotations to generate getters and setters
@Data
// Lombok annotations to generate constructor with all arguments
@AllArgsConstructor
// Lombok annotations to generate constructor with no arguments
@NoArgsConstructor
//Class directly interacts with the Service interface
public class TeammemberModel {
    // coloumns in table
    private UUID id;
    private String image;
    private String name;
    private String role;
    private String description;
}