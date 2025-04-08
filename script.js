const greeting = document.getElementById('greeting');
const hour = new Date().getHours();
if (hour < 12) {
  greeting.textContent = 'Good Morning!';
} else if (hour < 18) {
  greeting.textContent = 'Good Afternoon!';
} else {
  greeting.textContent = 'Good Evening!';
}

const toggle = document.getElementById('theme-toggle');
const body = document.body;
const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.add(`${currentTheme}-mode`);
toggle.onclick = () => {
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');
  const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
};

const projects = [
  { title: '  Resin', category: 'web' },
  { title: 'Data Analysis', category: 'data' },
 
];

function filterProjects(category) {
  const list = document.getElementById('project-list');
  list.innerHTML = '';
  const filtered = category === 'all' ? projects : projects.filter(p => p.category === category);
  filtered.forEach(p => {
    const div = document.createElement('div');
    div.textContent = p.title;
    list.appendChild(div);
  });
}

document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const formMsg = document.getElementById('form-message');

  if (!name.value || !email.value.includes('@') || !message.value) {
    formMsg.textContent = 'Please fill out all fields correctly.';
    formMsg.style.color = 'red';
  } else {
    formMsg.textContent = 'Message sent successfully!';
    formMsg.style.color = 'green';
    this.reset();
  }
});

// Animate skill bars on scroll
const skillSection = document.querySelector('#about .skills');
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    document.querySelectorAll('.bar').forEach(bar => {
      bar.style.width = bar.classList.contains('html') ? '90%' :
                        bar.classList.contains('css') ? '80%' : '70%';
    });
  }
}, { threshold: 0.5 });

observer.observe(skillSection);

// Drag & drop for project images
const images = document.querySelectorAll('#project-list img');
let dragged;

images.forEach(img => {
  img.addEventListener('dragstart', (e) => {
    dragged = e.target;
  });

  img.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  img.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.target.tagName === 'IMG' && e.target !== dragged) {
      const parent = dragged.parentNode.parentNode;
      const target = e.target.parentNode;
      const source = dragged.parentNode;
      parent.insertBefore(source, target);
    }
  });
});