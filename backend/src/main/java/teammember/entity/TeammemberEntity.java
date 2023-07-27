package teammember.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import java.util.UUID;

@Entity // This tells JPA to make a table out of this class
@Table(name = "teammember") //table name created in DB
@Getter //abstracts getter method
@Setter //abstracts setter method
@Data
//This class is what directly interacts with the repository,
public class TeammemberEntity {
    // coloumns in table
    @Id
    @GeneratedValue
    private UUID id;
    private String image;
    private String name;
    private String role;
    private String description;
}