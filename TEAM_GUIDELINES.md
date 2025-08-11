# TripleDots Website - Team Development Guidelines

## 🎯 Team Lead: Cinioluwa
## 👥 Team Size: 7-8 Developers

---

## Branch Structure

```
main (PROTECTED - Lead only)
├── dev (Integration branch)
└── feature/[your-name]/[task-name]
```

## Developer Workflow

### 1. Getting Started
```bash
git clone https://github.com/Cinioluwa/tripledots-website
cd tripledots-website
git checkout dev
git pull origin dev
```

### 2. Starting New Task
```bash
# Create your feature branch
git checkout -b feature/[your-name]/[task-name]

# Example: git checkout -b feature/john/hero-animations
```

### 3. Daily Work
```bash
# Make changes to files
# Test your work locally

# Commit frequently
git add .
git commit -m "feat: description of what you built"

# Push your branch
git push origin feature/[your-name]/[task-name]
```

### 4. Submitting Work
1. **Push your feature branch** to GitHub
2. **Create Pull Request** from your branch → `dev`
3. **Add description** of what you built
4. **Wait for review** from team lead
5. **Address feedback** if requested

---

## Naming Conventions

### Branch Names:
- `feature/john/contact-form`
- `feature/sarah/hero-animations`
- `feature/mike/services-cards`

### Commit Messages:
- `feat: add contact form validation`
- `fix: resolve mobile navigation bug`
- `style: improve button hover effects`
- `docs: update component documentation`

---

## File Structure

```
src/
├── about/          # About page components
├── assets/         # Images, icons, logos
├── careers/        # Careers page components
├── contact/        # Contact page components
├── footer/         # Footer component
├── hero/           # Hero section component
├── services/       # Services page components
└── styles/         # Global CSS styles
```

---

## Code Standards

### CSS:
- Use consistent indentation (2 spaces)
- Follow BEM naming convention
- Comment complex styles
- Mobile-first responsive design

### JavaScript:
- Use ES6+ features
- Add JSDoc comments for functions
- Keep functions small and focused
- Handle errors gracefully

### HTML:
- Semantic HTML elements
- Proper accessibility attributes
- Validate markup

---

## Communication

### Issue Assignment:
- Check GitHub Issues for your assigned tasks
- Ask questions in PR comments
- Update issue status when working

### Pull Request Reviews:
- Be respectful in feedback
- Explain your code decisions
- Test others' code when reviewing

### Team Meetings:
- Weekly standup (time TBD)
- Demo completed features
- Discuss blockers

---

## Testing Before PR

### Checklist:
- [ ] Code runs without errors
- [ ] Mobile responsive design works
- [ ] All links/buttons functional
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari)
- [ ] Clean console (no errors/warnings)

---

## Emergency Fixes

For urgent bugs in production:
1. **Create hotfix branch** from `main`
2. **Fix the issue** quickly
3. **Create PR** directly to `main`
4. **Notify team lead** immediately

---

## Questions?

**Team Lead:** Cinioluwa  
**Repository:** https://github.com/Cinioluwa/tripledots-website  
**Issues:** https://github.com/Cinioluwa/tripledots-website/issues
