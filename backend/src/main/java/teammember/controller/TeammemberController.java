package teammember.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import teammember.model.TeammemberModel;
import teammember.services.TeammemberService;

import java.util.List;
import java.util.UUID;


@CrossOrigin //allows requests from other domains
@RestController // This means that this class is a Controller
@RequestMapping("/api/")
public class TeammemberController {

    private final TeammemberService teammemberService;

    @Autowired // This means to get the bean called teammemberRepository
    public TeammemberController(TeammemberService teammemberService) {
        this.teammemberService = teammemberService;
    }

    @GetMapping("/teammembers")// Map ONLY GET Requests
    public List<TeammemberModel> getAllTeammembers() {
        // call the getAllTeammembers method from the teammemberService class
        return  teammemberService.getAllTeammembers();
    }

    @GetMapping("/teammembers/{id}")// Map ONLY GET Requests
    // response entity is used to return a response with a status code
    public ResponseEntity<TeammemberModel> getTeammemberById(@PathVariable UUID id) {
        TeammemberModel teammemberModel = null;
        teammemberModel = teammemberService.getTeammemberById(id);
        return ResponseEntity.ok(teammemberModel);
    }

    @PostMapping("/teammembers")
    public TeammemberModel createTeammember(@RequestBody TeammemberModel teammemberModel) {
        return teammemberService.createTeammember(teammemberModel);
    }

}