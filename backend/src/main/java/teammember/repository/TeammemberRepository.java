package teammember.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import teammember.entity.TeammemberEntity;
import teammember.model.TeammemberModel;

@Repository
public interface TeammemberRepository extends JpaRepository<TeammemberEntity, UUID> {
}
