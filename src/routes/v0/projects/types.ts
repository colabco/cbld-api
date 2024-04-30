export interface Project {
  id: string
  name: string
  description: string
  approxDuration: string
}

export interface User {
  id: string
  username: string
  email: string
  appRole: string
  projectsOwned: string[]
  isMemberOfProjects: string[]
  targetIndustryRoles: string[]
}

export interface ReqByProjectId {
  Params: {
    projectId: string
  }
}

export interface ReqByUserId {
  Params: {
    userId: string
  }
}

export interface ResProject {
  project: Project | null
}

export interface ResProjectList {
  projects: Project[]
}

export interface SampleData {
  projects: Project[]
  users: User[]
}
