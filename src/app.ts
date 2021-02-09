import { ProjectInput } from './components/project-input';
import { ProjectList } from './components/project-list';
import { ProjectStatus } from './model/project'


new ProjectInput();
new ProjectList(ProjectStatus.Active);
new ProjectList(ProjectStatus.Finished);

