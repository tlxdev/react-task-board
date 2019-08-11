import { makeEntity } from 'react-entities';
import * as tasks from './tasks';

import * as taskPreviousColumns from './task-previous-columns';

import * as settings from './settings';


export const useTasks = makeEntity(tasks);

export const useTaskPreviousColumns = makeEntity(taskPreviousColumns);

export const useSettings = makeEntity(settings);

