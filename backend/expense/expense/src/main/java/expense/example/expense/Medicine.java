package expense.example.expense;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection="Medicinal")

public class Medicine {
    @Id
    private String id;
    private String patientName;
    private int age;
    private double scanExpense;
    private double medicineExpense;
    private double doctorFee;
    private double initialAmount;
    private double balance;
    private double totalExpense;
}
