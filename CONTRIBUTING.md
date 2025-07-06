# Contributing to Gemini AI Clone

Thank you for your interest in contributing to the Gemini AI Clone project! We welcome contributions from the community and are grateful for any help you can provide.

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- A code editor (VS Code recommended)

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/gemini-ai-clone.git
   cd gemini-ai-clone
   ```

3. **Add the original repository as upstream**:
   ```bash
   git remote add upstream https://github.com/originalusername/gemini-ai-clone.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Set up environment variables** (see README.md for details)

6. **Start the development server**:
   ```bash
   npm run dev
   ```

## 🔄 Development Workflow

### Creating a New Feature

1. **Create a new branch** from main:
   ```bash
   git checkout main
   git pull upstream main
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes** thoroughly

4. **Commit your changes** with a descriptive message:
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add conversation export functionality
fix: resolve authentication timeout issue
docs: update API setup instructions
style: improve button hover animations
```

## 📋 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type when possible
- Use meaningful variable and function names

### React

- Use functional components with hooks
- Follow React best practices
- Use proper prop types and interfaces
- Implement proper error boundaries

### Styling

- Use Tailwind CSS for styling
- Follow the existing design system
- Ensure responsive design
- Test on multiple screen sizes

### Code Organization

- Keep components small and focused
- Use custom hooks for reusable logic
- Organize files logically in appropriate directories
- Export components and utilities properly

## 🧪 Testing

### Before Submitting

- Test your changes in development mode
- Test the production build: `npm run build && npm run preview`
- Verify responsive design on different screen sizes
- Test authentication flows if applicable
- Ensure no console errors or warnings

### Manual Testing Checklist

- [ ] Authentication (signup, login, logout)
- [ ] Chat functionality with real Gemini API
- [ ] Conversation management (create, delete, switch)
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Error handling and user feedback
- [ ] Performance (no memory leaks, smooth animations)

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Clear description** of the issue
2. **Steps to reproduce** the bug
3. **Expected behavior** vs actual behavior
4. **Screenshots** if applicable
5. **Environment details** (browser, OS, etc.)
6. **Console errors** if any

Use this template:

```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Go to...
2. Click on...
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser: Chrome 120
- OS: macOS 14
- Node.js: 18.17.0

## Additional Context
Any other relevant information
```

## 💡 Feature Requests

For feature requests, please:

1. **Check existing issues** to avoid duplicates
2. **Describe the feature** clearly
3. **Explain the use case** and benefits
4. **Consider implementation** complexity
5. **Provide mockups** if applicable

## 📝 Documentation

Help improve our documentation by:

- Fixing typos and grammar
- Adding missing information
- Improving clarity and examples
- Updating outdated content
- Adding new guides or tutorials

## 🎨 Design Contributions

We welcome design improvements:

- UI/UX enhancements
- Accessibility improvements
- Animation and interaction design
- Icon and graphic design
- Color scheme and typography

## 🔒 Security

If you discover a security vulnerability:

1. **Do NOT** create a public issue
2. **Email** the maintainers directly
3. **Provide** detailed information
4. **Wait** for confirmation before disclosure

## 📞 Getting Help

If you need help:

1. **Check the README** and documentation
2. **Search existing issues** for similar problems
3. **Join our discussions** on GitHub
4. **Ask questions** in issues with the "question" label

## 🏆 Recognition

Contributors will be:

- Listed in the README contributors section
- Mentioned in release notes for significant contributions
- Invited to join the core team for outstanding contributions

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Gemini AI Clone! 🚀