import { makeEntity } from 'react-entities';
import * as tasks from './tasks';

import * as taskPreviousColumns from './task-previous-columns';


export const useTasks = makeEntity(tasks);


export const useTaskPreviousColumns = makeEntity(taskPreviousColumns);
