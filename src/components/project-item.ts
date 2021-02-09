import { Draggable } from '../interfaces/drag-drop-interfaces';
import { Component } from './base-component';
import { Project } from '../model/project';
import { Autobind } from '../decorators/autobind';

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  get persons() {
    const { people } = this.project;
    return people === 1 ?
      '1 person' :
      `${this.project.people} persons`;
  }
  constructor(hostId: string, private project: Project) {
    super('single-project', hostId, false, project.id);
    this.configure();
    this.renderContent();
  }

  @Autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  @Autobind
  dragEndHandler(event: DragEvent) {
  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler)
    this.element.addEventListener('dragend', this.dragEndHandler)
  }
  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = `${this.persons} applied`;
    this.element.querySelector('p')!.textContent = this.project.description;
  }

}