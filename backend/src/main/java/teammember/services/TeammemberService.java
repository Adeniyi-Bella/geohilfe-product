package teammember.services;

import teammember.model.TeammemberModel;

import java.util.List;
import java.util.UUID;


public interface TeammemberService {
    List<TeammemberModel> getAllTeammembers();
    TeammemberModel getTeammemberById(UUID id);

    TeammemberModel createTeammember(TeammemberModel teammemberModel);
}
