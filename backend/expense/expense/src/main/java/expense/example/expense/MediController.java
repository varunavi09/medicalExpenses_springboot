package expense.example.expense;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/expenses")
public class MediController {

    private final MediRepo repo;

    public MediController(MediRepo repo) {
        this.repo = repo;
    }

    // GET ALL
    @GetMapping
    public List<Medicine> getAllExpenses() {
        return repo.findAll();
    }

    // COMMON CALCULATION METHOD
    private void calculate(Medicine expense) {

        double total = expense.getScanExpense()
                + expense.getMedicineExpense()
                + expense.getDoctorFee();

        double balance = expense.getInitialAmount() - total;

        expense.setTotalExpense(total);
        expense.setBalance(balance);
    }

    // CREATE
    @PostMapping
    public Medicine addExpense(@RequestBody Medicine expense) {
        calculate(expense);
        return repo.save(expense);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Medicine updateExpense(@PathVariable String id,
                                  @RequestBody Medicine expense) {

        expense.setId(id);
        calculate(expense);

        return repo.save(expense);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable String id) {
        repo.deleteById(id);
    }
}
