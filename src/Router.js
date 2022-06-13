import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Redirect, Navigate } from 'react-router-dom';
import App from './components/App';
import { TaskView } from './components/TaskView';
import { useTasks, useSettings } from './entities';
import { Settings } from './components/Settings';
import { About } from './components/About';
import { ColumnEditor } from './components/ColumnEditor';

const Router = () => {
  const [tasks, { loadTasksFromLocalStorage, saveTasksToLocalStorage }] = useTasks();
  const [settings, { loadSettingsFromLocalStorage, saveSettingsToLocalStorage }] = useSettings();

  // Automatically both loads data from local storage on startup,
  // And saves data changes to local storage
  useEffect(() => {
    if (tasks.columns.length === 0) {
      loadTasksFromLocalStorage();
    } else {
      saveTasksToLocalStorage();
    }
  }, [tasks, loadTasksFromLocalStorage, saveTasksToLocalStorage]);

  // save/load settings

  useEffect(() => {
    if (!settings.loaded) {
      loadSettingsFromLocalStorage();
    } else {
      saveSettingsToLocalStorage();
    }
  }, [settings, saveSettingsToLocalStorage, loadSettingsFromLocalStorage]);

  return (
    <BrowserRouter>
      <Routes basename={process.env.PUBLIC_URL}>
        <Route index element={<App />} />

        <Route path="/react-task-board" element={<Navigate to="/" replace />} />
        <Route path="/column" element={<Settings blur />}>
          <Route path=":index" element={<ColumnEditor />} />
        </Route>

        <Route path="/task" element={<App blur />}>
          <Route path=":id" element={<TaskView />} />
        </Route>
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
