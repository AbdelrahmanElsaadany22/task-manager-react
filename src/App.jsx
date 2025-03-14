import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSideBar from "./components/ProjectSideBar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState,setProjectState]=useState({
    selectedProjectId:undefined,
    projects:[],
    tasks:[]
  })
  function handleAddTask(text) {
    setProjectState((prevState) => {
      if (!prevState.selectedProjectId) {
        return prevState; // Prevent adding tasks if no project is selected
      }

      const taskId = Math.random().toString(36).substr(2, 9); // Generate a better unique ID
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id){
    setProjectState((prevState)=>{
      return{
        ...prevState,
        tasks:prevState.tasks.filter((task)=>{
          task.id !== id
        })
      }
    });
  }
  function handleSelectProject(id){
    setProjectState((prevState)=>{
      return{
        ...prevState,
        selectedProjectId:id
      }
    });
  }
  function handleStartAddProject(){
    setProjectState((prevState)=>{
      return{
        ...prevState,
        selectedProjectId:null
      }
    });
  }
  function handleCancelAddProject(){
    setProjectState((prevState)=>{
      return{
        ...prevState,
        selectedProjectId:undefined
      }
    });
  }
  function handleDeleteProject(){
    setProjectState((prevState)=>{
      return{
        ...prevState,
        selectedProjectId:undefined,
        projects:prevState.projects.filter((project)=>{
          project.id !== prevState.selectedProjectId
        })
      }
    });
  }
  function handleAddProject(projectData){
    setProjectState((prevState)=>{
      const newProject={
        ...projectData,

        id:Math.random()
      }
      return{
        ...prevState,
        selectedProjectId:undefined,
        projects:[...prevState.projects,newProject]
      }
    })
  }

  const selectedProject=projectState.projects.find(project=>project.id===projectState.selectedProjectId)
  let content=<SelectedProject
  project={selectedProject}
  onDelete={handleDeleteProject}
  onAddTask={handleAddTask}
  onDeleteTask={handleDeleteTask}
  tasks={projectState.tasks}
  ></SelectedProject>;
  if(projectState.selectedProjectId===null){
    content=<NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}></NewProject>
  }else if(projectState.selectedProjectId===undefined){
    content=<NoProjectSelected onStartAddProject={handleStartAddProject}></NoProjectSelected>
  }

  return (
    <main className='h-screen my-8 flex gap-8'>
    <ProjectSideBar onStartAddProject={handleStartAddProject} projects={projectState.projects}
    onSelectProject={handleSelectProject}
    selectedProjectId={projectState.selectedProjectId}
    />
    {content}
    </main>
  );
}

export default App;
