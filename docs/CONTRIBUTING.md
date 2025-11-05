# 🤝 Contributing to Terra Industries

Thank you for your interest in contributing to Terra Industries! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

## 📜 Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please:

- Be respectful and constructive
- Focus on what's best for the community
- Show empathy towards other community members
- Accept constructive criticism gracefully

## 🚀 Getting Started

### Prerequisites

- Node.js 20.9.0 or higher
- pnpm package manager
- Git
- Docker (optional)

### Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/terra-industries.git
   cd terra-industries
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🔄 Development Workflow

### Branch Naming

Use descriptive branch names with prefixes:

```bash
feature/add-new-component    # New features
bugfix/fix-mobile-nav       # Bug fixes
hotfix/critical-security    # Critical fixes
docs/update-readme          # Documentation
refactor/optimize-images    # Code refactoring
```

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
feat: add new mobile navigation component
fix: resolve image loading issue on mobile
docs: update README with Docker instructions
style: format code with Prettier
refactor: optimize image preloading logic
test: add unit tests for mobile components
```

### Commit Types

- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code formatting
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## 📏 Code Standards

### TypeScript

- Use strict TypeScript configuration
- Define proper types for all props and functions
- Avoid `any` type unless absolutely necessary
- Use interfaces for object shapes

```typescript
// ✅ Good
interface ComponentProps {
  title: string;
  isVisible: boolean;
  onToggle: () => void;
}

// ❌ Avoid
const Component = (props: any) => { ... }
```

### React Components

- Use functional components with hooks
- Extract custom hooks for reusable logic
- Use proper prop destructuring
- Implement proper error boundaries

```typescript
// ✅ Good
export function MobileHeader({ isVisible, onToggle }: MobileHeaderProps) {
  const { isMobile } = useMobileOptimization();
  
  return (
    <header className="mobile-header">
      {/* Component content */}
    </header>
  );
}
```

### Styling

- Use Tailwind CSS classes
- Follow mobile-first approach
- Use semantic class names
- Avoid inline styles

```tsx
// ✅ Good
<div className="flex flex-col md:flex-row gap-4 p-6 bg-card rounded-lg">

// ❌ Avoid
<div style={{ display: 'flex', padding: '24px' }}>
```

### File Organization

```
components/
├── ui/                    # Reusable UI components
├── sections/              # Page sections
├── mobile-*              # Mobile-specific components
└── index.ts              # Barrel exports
```

## 🧪 Testing

### Running Tests

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Build verification
pnpm build
```

### Test Requirements

- All new components must be type-safe
- No linting errors
- Build must complete successfully
- Mobile responsiveness verified

## 📝 Pull Request Process

### Before Submitting

1. **Update your fork**
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, readable code
   - Add proper TypeScript types
   - Test on multiple devices
   - Update documentation if needed

4. **Test thoroughly**
   ```bash
   pnpm type-check
   pnpm lint
   pnpm build
   ```

5. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

### Pull Request Template

```markdown
## 📝 Description
Brief description of changes

## 🔗 Related Issues
Fixes #(issue number)

## 🧪 Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Build successful

## 📱 Screenshots
Add screenshots if applicable

## 📋 Checklist
- [ ] Code follows project standards
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

### Review Process

1. **Automated Checks** - CI/CD pipeline runs automatically
2. **Code Review** - Team members review your code
3. **Testing** - Manual testing on various devices
4. **Approval** - Maintainer approves the PR
5. **Merge** - Changes are merged to main branch

## 🐛 Issue Reporting

### Bug Reports

Use the bug report template and include:

- **Description**: Clear description of the bug
- **Steps to Reproduce**: Detailed steps to reproduce
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: Browser, OS, device information
- **Screenshots**: Visual evidence if applicable

### Feature Requests

- **Description**: Clear description of the feature
- **Use Case**: Why this feature is needed
- **Proposed Solution**: How you think it should work
- **Alternatives**: Other solutions considered

## 🎨 Design Guidelines

### UI/UX Principles

- **Mobile-First**: Design for mobile, enhance for desktop
- **Accessibility**: Follow WCAG guidelines
- **Performance**: Optimize for speed and efficiency
- **Consistency**: Follow established design patterns

### Component Design

- **Reusability**: Create components that can be reused
- **Composition**: Build complex components from simple ones
- **Props Interface**: Clear, well-documented prop interfaces
- **Error Handling**: Graceful error states

## 📚 Documentation

### Code Documentation

- Use JSDoc for complex functions
- Add inline comments for business logic
- Document component props and usage
- Update README for new features

### README Updates

When adding new features:

1. Update the feature list
2. Add usage examples
3. Update the project structure
4. Add any new dependencies

## 🚀 Release Process

### Version Bumping

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

- [ ] All tests passing
- [ ] Documentation updated
- [ ] Version bumped
- [ ] Changelog updated
- [ ] Release notes prepared

## 💡 Tips for Contributors

### Getting Help

- Check existing issues and PRs
- Ask questions in discussions
- Join our community Discord
- Read the documentation

### Best Practices

- **Small PRs**: Keep changes focused and small
- **Clear Messages**: Write clear commit messages
- **Test Locally**: Test changes before submitting
- **Be Patient**: Reviews take time, be patient
- **Learn**: Use this as a learning opportunity

## 📞 Contact

- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For questions and general discussion
- **Email**: dev@terra-industries.com
- **Discord**: [Join our community](https://discord.gg/terra-industries)

---

Thank you for contributing to Terra Industries! 🚀

Your contributions help us build better defense technology solutions for a safer world.
