class EmployeeManagement {
    constructor(employees = []) {
        this.employees = employees
    }
    addEmployees(new_employees) {
        for (const employee of new_employees) {
            this.addEmployee(employee)
        }
    }

    addEmployee(employee) {
        this.employees.push(employee)
    }
    
    deleteEmployee(deleteId) {
        const deleteIndex = this.employees.findIndex((employee)=>employee.id === deleteId)
        if(deleteIndex !== -1){
            this.employees.splice(deleteIndex,1)
        }
    }

    updateEmployee(index , updatedEmployee){
        this.employees.splice(index,1,updatedEmployee)
    }

    getEmployees() {
        return this.employees
    }

}

export { EmployeeManagement }