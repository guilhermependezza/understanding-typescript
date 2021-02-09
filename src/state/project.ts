import { Project, ProjectStatus } from '../model/project';


export type Listener<T> = (items: T[]) => void;

abstract class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(fn: Listener<T>) {
    this.listeners.push(fn);
  }
}

export class ProjectState extends State<Project> {
  private projects: Project[] = [];

  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance(): ProjectState {
    if (this.instance) {
      return this.instance
    }
    this.instance = new ProjectState();
    return this.instance;

  }
  public addProject(title: string, description: string, people: number) {
    const project = new Project(
      Math.random().toString(),
      title,
      description,
      people,
      ProjectStatus.Active
    );
    this.projects.push(project);
    this.notify();
  }

  private notify() {
    this.listeners.forEach(fn => fn([...this.projects]))
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    this.projects = this.projects.map(project => {
      return project.id !== projectId ?
        project :
        { ...project, status: newStatus }
    });

    this.notify();
  }
}
