import { Component } from './base-component';
import { Autobind } from '../decorators/autobind';
import { Validatable, isValid } from '../util/validation';
import { ProjectState } from '../state/project'

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>  {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');
    this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  renderContent() { }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }


  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const validatableTitle: Validatable = {
      value: enteredTitle,
      required: true
    }

    const validatableDescription: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    }

    const validatablePeople: Validatable = {
      value: +enteredPeople,
      required: true,
      max: 5,
      min: 1
    }

    if (
      !isValid(validatableTitle) ||
      !isValid(validatableDescription) ||
      !isValid(validatablePeople)
    ) {
      alert('Invalid input, please try again')
      return
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople]
    }
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault()
    const userInput = this.gatherUserInput()

    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      ProjectState.getInstance().addProject(title, desc, people)

      this.clearInputs();
    }
  }
}

