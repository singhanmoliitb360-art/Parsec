const PROJECTS_KEY = 'parsec-projects';
const PROFILE_KEY = 'parsec-profile';
const USERS_KEY = 'parsec-users';
const CONNECTIONS_KEY = 'parsec-connections';

const sampleUsers = [
  {
    id: 1,
    name: 'Aisha',
    bio: 'Frontend and product-minded builder',
    skills: ['frontend', 'design', 'ui', 'javascript'],
    interests: ['games', 'storytelling', 'community']
  },
  {
    id: 2,
    name: 'Marco',
    bio: 'Writer and product strategist',
    skills: ['writing', 'research', 'strategy'],
    interests: ['storytelling', 'reading', 'entrepreneurship']
  },
  {
    id: 3,
    name: 'Leah',
    bio: 'Full-stack builder who likes creative tools',
    skills: ['javascript', 'backend', 'api', 'testing'],
    interests: ['games', 'community', 'building']
  }
];

const sampleProjects = [
  {
    id: 1,
    title: 'Collaborative Story Game Platform',
    description: 'A space for creators to build story-driven games together.',
    progress: 56,
    skills: ['frontend', 'javascript', 'design', 'writing'],
    interests: ['games', 'storytelling']
  },
  {
    id: 2,
    title: 'Creator Collectives',
    description: 'A platform for solo creators to share early-stage project ideas and collaborate.',
    progress: 31,
    skills: ['product', 'research', 'frontend'],
    interests: ['entrepreneurship', 'community']
  }
];

function readJSON(key, fallback) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function splitList(value) {
  return value.split(',').map(item => item.trim().toLowerCase()).filter(Boolean);
}

function getAllUsers() {
  return readJSON(USERS_KEY, sampleUsers);
}

function getProjects() {
  return readJSON(PROJECTS_KEY, sampleProjects);
}

function getProfile() {
  return readJSON(PROFILE_KEY, null);
}

function getConnections() {
  return readJSON(CONNECTIONS_KEY, {});
}

function saveProjects(projects) {
  writeJSON(PROJECTS_KEY, projects);
}

function saveProfile(profile) {
  writeJSON(PROFILE_KEY, profile);
}

function saveUsers(users) {
  writeJSON(USERS_KEY, users);
}

function saveConnections(connections) {
  writeJSON(CONNECTIONS_KEY, connections);
}

function selectProjectById(projectId) {
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    const cardId = Number(card.dataset.id);
    const isSelected = Number(cardId) === Number(projectId);
    card.classList.toggle('selected', isSelected);
    card.classList.toggle('expanded', isSelected);
  });
}

function calculateMatch(project, user) {
  const projectSkills = new Set(project.skills.map(s => s.toLowerCase()));
  const userSkills = new Set(user.skills.map(s => s.toLowerCase()));
  const sharedSkills = [...userSkills].filter(skill => projectSkills.has(skill));

  const projectInterests = new Set(project.interests.map(i => i.toLowerCase()));
  const userInterests = new Set(user.interests.map(i => i.toLowerCase()));
  const sharedInterests = [...userInterests].filter(interest => projectInterests.has(interest));

  const skillScore = sharedSkills.length;
  const interestScore = sharedInterests.length;
  const maxPossible = Math.max(project.skills.length + project.interests.length, 1);
  const score = Math.min(100, Math.round(((skillScore * 2 + interestScore * 2) / maxPossible) * 100));

  return {
    skillScore,
    interestScore,
    sharedSkills,
    sharedInterests,
    score
  };
}

function scrollToMatches() {
  const panel = document.getElementById('matchesPanel');
  if (panel) {
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function renderProjects() {
  const list = document.getElementById('projectList');
  const projects = getProjects();
  const selectedProjectId = Number(localStorage.getItem('selectedProjectId')) || projects[0]?.id;

  list.innerHTML = '';

  projects.forEach(project => {
    const isExpanded = Number(project.id) === Number(selectedProjectId);
    const card = document.createElement('div');
    card.className = 'project-card' + (isExpanded ? ' selected expanded' : '');
    card.dataset.id = project.id;

    card.innerHTML = `
      <div class="project-card-header">
        <h3>${project.title}</h3>
        <button class="project-collapse" type="button" data-toggle-id="${project.id}">
          ${isExpanded ? '-' : '+'}
        </button>
      </div>

      <div class="project-details">
        <p>${project.description}</p>

        <div class="progress-wrap">
          <div class="progress-label">
            <span>Momentum</span>
            <span>${project.progress}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${project.progress}%"></div>
          </div>
        </div>

        <div>
          ${project.skills.map(skill => `<span class="tag">${skill}</span>`).join('')}
        </div>

        <button type="button" data-project-id="${project.id}">View matches</button>
      </div>
    `;

    const toggleButton = card.querySelector('.project-collapse');
    toggleButton.addEventListener('click', () => {
      const currentSelected = Number(localStorage.getItem('selectedProjectId'));
      if (Number(project.id) === Number(currentSelected)) {
        localStorage.removeItem('selectedProjectId');
      } else {
        localStorage.setItem('selectedProjectId', project.id);
      }
      renderProjects();
      renderMatches();
    });

    const viewButton = card.querySelector('[data-project-id]');
    viewButton.addEventListener('click', () => {
      localStorage.setItem('selectedProjectId', project.id);
      renderProjects();
      renderMatches();
      scrollToMatches();
    });

    list.appendChild(card);
  });

  selectProjectById(selectedProjectId);
}

function renderMatches() {
  const results = document.getElementById('matchResults');
  const profile = getProfile();
  const projects = getProjects();
  const users = getAllUsers();
  const selectedProjectId = Number(localStorage.getItem('selectedProjectId')) || projects[0]?.id;
  const project = projects.find(item => item.id === selectedProjectId);

  if (!profile) {
    results.innerHTML = '<p class="small-note">Save a profile to see likely collaborators.</p>';
    return;
  }

  if (!project) {
    results.innerHTML = '<p class="small-note">Create a project to see matches.</p>';
    return;
  }

  const matches = users
    .filter(user => user.name !== profile.name)
    .map(user => {
      const match = calculateMatch(project, user);
      return { user, match };
    })
    .sort((a, b) => b.match.score - a.match.score);

  results.innerHTML = `
    <h3>${project.title}</h3>
    <p class="small-note">${project.description}</p>
  `;

  matches.forEach(({ user, match }) => {
    const card = document.createElement('div');
    card.className = 'match-card';

    const connections = getConnections();
    const isRequested = connections[project.id]?.includes(user.id);

    card.innerHTML = `
      <div class="match-score">${match.score}% fit</div>
      <h3>${user.name}</h3>
      <p>${user.bio}</p>
      <p><strong>Skill overlap:</strong> ${match.sharedSkills.length ? match.sharedSkills.join(', ') : 'none'}</p>
      <p><strong>Interest overlap:</strong> ${match.sharedInterests.length ? match.sharedInterests.join(', ') : 'none'}</p>
      <button type="button" data-user-id="${user.id}" data-project-id="${project.id}">
        ${isRequested ? 'Requested' : 'Connect'}
      </button>
    `;

    const button = card.querySelector('button');
    button.disabled = isRequested;
    button.addEventListener('click', () => {
      const connectionMap = getConnections();
      if (!connectionMap[project.id]) {
        connectionMap[project.id] = [];
      }
      if (!connectionMap[project.id].includes(user.id)) {
        connectionMap[project.id].push(user.id);
      }
      saveConnections(connectionMap);
      renderMatches();
    });

    results.appendChild(card);
  });
}

document.getElementById('projectForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const projects = getProjects();
  const newProject = {
    id: Date.now(),
    title: document.getElementById('projectTitle').value,
    description: document.getElementById('projectDescription').value,
    progress: 12,
    skills: splitList(document.getElementById('projectSkills').value),
    interests: splitList(document.getElementById('projectInterests').value)
  };

  projects.push(newProject);
  saveProjects(projects);

  localStorage.setItem('selectedProjectId', newProject.id);

  renderProjects();
  renderMatches();
  this.reset();
});

document.getElementById('profileForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const profile = {
    name: document.getElementById('profileName').value,
    bio: document.getElementById('profileBio').value,
    skills: splitList(document.getElementById('profileSkills').value),
    interests: splitList(document.getElementById('profileInterests').value)
  };

  saveProfile(profile);

  const users = getAllUsers();
  users.push({
    id: Date.now(),
    ...profile
  });
  saveUsers(users);

  renderMatches();
  this.reset();
});

document.getElementById('showProjectForm').addEventListener('click', () => {
  document.getElementById('projectFormSection').classList.remove('hidden');
  document.getElementById('profileFormSection').classList.add('hidden');
});

document.getElementById('showProfileForm').addEventListener('click', () => {
  document.getElementById('profileFormSection').classList.remove('hidden');
  document.getElementById('projectFormSection').classList.add('hidden');
});

renderProjects();
renderMatches();