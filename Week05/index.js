class Task {
		constructor(name, workunit) {
			this.name = name;
			this.workunit = workunit;
		}

		describe() {
			return`${this.name} consists of doing ${this.workunit}.`;
		}		
}


class Cohort {
	constructor(name){
	this.name = name;
	this.contributors = [];
	}

	addTask(task){
		if (task instanceof Task){
			this.contributors.push(task);
		} else {
			throw new Error (`Need Task Instance.  Arguement is not task:  ${task}`);
		}
	}
	
	describe() {
			return`${this.name} cohort has ${this.contributors.length} tasks assigned.`;
	}		
}

class Menu {
		constructor(){
			this.cohorts = [];
			this.selectedCohort = null;
		}
		
	start (){
		let selection = this.showMainMenuOptions();
		
		while (selection != 0) {
			switch (selection) {
				
				case '1':
				  this.createCohort();
				  break;

				case '2':
				  this.viewCohort();
				  break;

				case '3':
				  this.deleteCohort();
				  break;

				case '4':
				  this.displayCohorts();
				  break;
				  
				default:
					selection = 0;
			}
			selection = this.showMainMenuOptions();
		}
		
		alert ('Connection Disconnected');
	}	
		
	showMainMenuOptions (){
		return prompt (`
		  0) Exit
		  1) Create Cohort
		  2) View Cohort
		  3) Delete Cohort
		  4) Show All Cohorts
		`);
	}		
	
	
	showCohortMenuOptions(teamInfo){
		return prompt(`
			0) Back
			1) Create Task
			2) Delete Task
			3) Show Task Detail
			====================
			${teamInfo}
		`);	
}
	
	displayCohorts() {
		let teamString = '';
		for (let i = 0; i<this.cohorts.length; i++) {
				teamString += '[' + i + '] '+ this.cohorts[i].name + '\n';
		}
		alert (teamString);
	}
	
	createCohort(){
		let name = prompt ('Name of Cohort');
		this.cohorts.push(new Cohort(name));
	}
	
	deleteCohort(){
		let index = prompt ('Cohort index to delete');
		if (index > -1 && index < this.cohorts.length){
			this.cohorts.splice(index, 1);
		}
	}	
			
	viewCohort(){
		let index = prompt ('Enter index of the team you wish to view: ');
		if (index > -1 && index < this.cohorts.length) {
			this.selectedCohort = this.cohorts[index];
			let description = 'Cohort Name: ' + this.selectedCohort.name + '\n';
			
			for (let i = 0; i <this.selectedCohort.contributors.length; i++) {
				description += i + ') ' + this.selectedCohort.contributors[i].name + ' - ' + this.selectedCohort.contributors[i].workunit + '\n';
			}

			description = description + '\n' + this.selectedCohort.describe();


			let selection = this.showCohortMenuOptions(description);
			
			switch (selection){
				case '1':
					this.createTask();
					break;
				case '2':
					this.deleteTask();
					break;
				case '3':
					this.showTaskDetail();
					break;
			}
		}
	}


	createTask(){
		let name = prompt ('Enter new task name: ');
		let workunit = prompt ('New Task description');
		this.selectedCohort.contributors.push(new Task(name, workunit));
	}

	deleteTask(){
		let index = prompt ('Task index to delete');
		if (index > -1 && index < this.selectedCohort.contributors.length){
			this.selectedCohort.contributors.splice(index, 1);
		}
		
	}
	
	showTaskDetail(){
		let index = prompt ('Task index to detail');
		if (index > -1 && index < this.selectedCohort.contributors.length){
			alert (this.selectedCohort.contributors[index].describe())		;
		}	
	}
}	

let menu = new Menu();
menu.start();
