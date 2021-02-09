import { DragTarget } from '../interfaces/drag-drop-interfaces';
import { Component } from './base-component';
import { ProjectItem } from './project-item';
import { Autobind } from '../decorators/autobind';
import { Project, ProjectStatus } from '../model/project';
import { ProjectState } from '../state/project'

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
  assignedProjects: Project[];
  private internalList: HTMLUListElement;

  constructor(private type: ProjectStatus) {
    super('project-list', 'app', false, `${type}-projects`);

    this.internalList = this.element.querySelector('ul')!
    this.internalList.id = `${this.type}-projects-list`;

    this.assignedProjects = [];
    this.configure()
    this.renderContent();
  }

  @Autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      this.internalList.classList.add('droppable');
    }
  }

  @Autobind
  dropHandler(event: DragEvent) {
    const projectId = event.dataTransfer!.getData('text/plain');
    ProjectState.getInstance().moveProject(projectId, this.type);
  }

  @Autobind
  dragLeaveHandler(event: DragEvent) {
    this.internalList.classList.remove('droppable');
  }

  configure() {
    ProjectState.getInstance().addListener((projects: Project[]) => {
      this.assignedProjects = projects.filter(project => project.status === this.type);
      this.renderProjects();
    });

    this.element.addEventListener('dragover', this.dragOverHandler)
    this.element.addEventListener('dragleave', this.dragLeaveHandler)
    this.element.addEventListener('drop', this.dropHandler)
  }

  private renderProjects() {
    this.internalList.innerHTML = '';
    this.assignedProjects
      .forEach((project) => new ProjectItem(this.internalList.id, project))
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
  }
}