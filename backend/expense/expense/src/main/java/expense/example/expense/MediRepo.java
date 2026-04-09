package expense.example.expense;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MediRepo extends MongoRepository<Medicine,String> {
}
