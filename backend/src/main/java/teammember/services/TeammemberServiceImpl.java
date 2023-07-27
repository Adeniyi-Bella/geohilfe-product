package teammember.services;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import teammember.entity.TeammemberEntity;
import teammember.model.TeammemberModel;
import teammember.repository.TeammemberRepository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TeammemberServiceImpl implements TeammemberService{

    private TeammemberRepository teammemberRepository;
    public TeammemberServiceImpl(TeammemberRepository teammemberRepository) {
        this.teammemberRepository = teammemberRepository;
    }

    @Override
    public List<TeammemberModel> getAllTeammembers() {
        //get all data from DB with entity class
        List<TeammemberEntity> teammemberEntities= teammemberRepository.findAll();
        //map all column in DB and return as a list to the endpoint
        List<TeammemberModel> teammemberModels
                = teammemberEntities
                .stream()
                .map(teammember -> new TeammemberModel(
                        teammember.getId(),
                        teammember.getImage(),
                        teammember.getName(),
                        teammember.getRole(),
                        teammember.getDescription()))
                .collect(Collectors.toList());
        return teammemberModels;
    }
    @Override
    public TeammemberModel getTeammemberById(UUID id) {
        TeammemberEntity teammemberEntity = teammemberRepository.findById(id).get();
        TeammemberModel teammemberModel = new TeammemberModel();
        BeanUtils.copyProperties(teammemberEntity, teammemberModel);
        return teammemberModel;
    }

    @Override
    public TeammemberModel createTeammember(TeammemberModel teammemberModel) {
        teammemberModel.setId(UUID.fromString(UUID.randomUUID().toString()));
//        create new class/column in DB
        TeammemberEntity teammemberEntity = new TeammemberEntity();
        // copy from argument/reuestbody to new class created
        BeanUtils.copyProperties(teammemberModel, teammemberEntity);
        teammemberRepository.save(teammemberEntity);
        return teammemberModel;
    }
}
