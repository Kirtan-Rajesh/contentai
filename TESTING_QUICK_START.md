# Testing Quick Start Guide

## 🚀 Getting Started with Tests

### Prerequisites
```bash
node >= 18.0.0
npm >= 9.0.0
```

### Installation

1. **Install dependencies** (if not already done):
```bash
npm install
```

2. **Verify test setup**:
```bash
npm run test -- --version
```

---

## 🏃 Running Tests

### Watch Mode (Development)
```bash
npm run test
```
- Automatically re-runs tests on file changes
- Shows test results in real-time
- Perfect for development workflow

### CI Mode (One-time run)
```bash
npm run test:ci
```
- Runs all tests once
- Perfect for CI/CD pipelines
- No watch mode

### Coverage Report
```bash
npm run test:coverage
```
- Generates code coverage report
- Shows covered and uncovered lines
- Creates HTML report in `coverage/` folder

---

## 📁 Test File Structure

```
__tests__/
├── components/
│   ├── TrendAnalyzer.test.tsx
│   └── [other component tests]
├── services/
│   ├── apiService.test.ts
│   └── [other service tests]
├── store/
│   ├── contentaiStore.test.ts
│   └── [other store tests]
└── pages/
    └── page.test.tsx
```

---

## ✍️ Writing Your First Test

### Component Test Example
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import YourComponent from '@/components/path/YourComponent'

describe('YourComponent', () => {
  test('renders with text', () => {
    render(<YourComponent />)
    expect(screen.getByText(/expected text/i)).toBeInTheDocument()
  })

  test('button click works', () => {
    render(<YourComponent />)
    const button = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(button)
    // Add your assertions
  })
})
```

### Service Test Example
```typescript
import * as service from '@/lib/services/apiService'
import axios from 'axios'

jest.mock('axios')

describe('API Service', () => {
  test('fetches data', async () => {
    const mockData = { id: 1, name: 'Test' }
    axios.get.mockResolvedValue({ data: mockData })
    
    const result = await service.getData()
    expect(result).toEqual(mockData)
  })
})
```

---

## 🔍 Common Testing Patterns

### Testing Button Clicks
```typescript
test('button triggers action', () => {
  render(<Component />)
  const button = screen.getByRole('button', { name: /Click Me/i })
  fireEvent.click(button)
  expect(screen.getByText(/Result/i)).toBeInTheDocument()
})
```

### Testing Form Input
```typescript
test('form input works', () => {
  render(<Form />)
  const input = screen.getByPlaceholderText(/Enter text/i)
  fireEvent.change(input, { target: { value: 'test' } })
  expect(input).toHaveValue('test')
})
```

### Testing Async Operations
```typescript
test('async function completes', async () => {
  render(<Component />)
  const button = screen.getByRole('button', { name: /Fetch/i })
  fireEvent.click(button)
  
  await waitFor(() => {
    expect(screen.getByText(/Data loaded/i)).toBeInTheDocument()
  })
})
```

### Testing Error States
```typescript
test('displays error message', async () => {
  jest.mock('axios')
  axios.get.mockRejectedValue(new Error('API Error'))
  
  render(<Component />)
  await waitFor(() => {
    expect(screen.getByText(/Error/i)).toBeInTheDocument()
  })
})
```

---

## 🐛 Debugging Tests

### Run Single Test
```bash
npm run test -- TrendAnalyzer.test
```

### Run Tests Matching Pattern
```bash
npm run test -- --testNamePattern="button"
```

### Verbose Output
```bash
npm run test -- --verbose
```

### Debug in Browser
```bash
npm run test -- --debug
```
Opens Chrome DevTools for debugging

---

## 📊 Viewing Coverage

After running `npm run test:coverage`, open the HTML report:

```bash
# On macOS
open coverage/lcov-report/index.html

# On Windows
start coverage/lcov-report/index.html

# On Linux
xdg-open coverage/lcov-report/index.html
```

---

## ✅ Test Checklist

Before committing code:

```bash
# Run tests
npm run test:ci

# Check coverage
npm run test:coverage

# Check for linting issues
npm run lint

# Type check
npm run type-check

# Build (catches compile errors)
npm run build
```

---

## 🆘 Troubleshooting

### Tests Not Running
```bash
# Clear Jest cache
npm run test -- --clearCache
npm run test
```

### Module Not Found Error
```
Error: Cannot find module '@/components/...'

Solution: Check tsconfig.json paths configuration
```

### Mock Not Working
```typescript
// Ensure mock is before import
jest.mock('@/lib/service')
import * as service from '@/lib/service'
```

### Timeout Error
```typescript
// Increase timeout for slow tests
test('slow operation', async () => {
  // test code
}, 10000) // 10 second timeout
```

---

## 📚 Learning Resources

### Recommended Reading
- [Jest Documentation](https://jestjs.io/)
- [React Testing Library Docs](https://testing-library.com/react)
- [Testing Best Practices](https://testingjavascript.com/)

### Video Tutorials
- Jest Crash Course
- React Testing Library Course
- Test-Driven Development (TDD)

---

## 🎯 Coverage Goals

| Metric | Target |
|--------|--------|
| Statements | 70%+ |
| Branches | 65%+ |
| Functions | 70%+ |
| Lines | 70%+ |

Check current coverage:
```bash
npm run test:coverage
```

---

## 📝 Test Template

Copy and customize this template for new tests:

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ComponentName from '@/components/path/ComponentName'

describe('ComponentName', () => {
  beforeEach(() => {
    // Setup before each test
    jest.clearAllMocks()
  })

  test('should render correctly', () => {
    render(<ComponentName />)
    expect(screen.getByText(/expected/i)).toBeInTheDocument()
  })

  test('should handle user interaction', () => {
    render(<ComponentName />)
    const element = screen.getByRole('button', { name: /action/i })
    fireEvent.click(element)
    expect(screen.getByText(/result/i)).toBeInTheDocument()
  })

  test('should handle async operations', async () => {
    render(<ComponentName />)
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => {
      expect(screen.getByText(/complete/i)).toBeInTheDocument()
    })
  })

  test('should handle error states', async () => {
    render(<ComponentName />)
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument()
    })
  })
})
```

---

## 🚀 CI/CD Integration

### GitHub Actions Example
```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test:ci
      - run: npm run test:coverage
```

---

## 🎓 Advanced Topics

### Mocking API Calls
```typescript
jest.mock('@/lib/services/apiService')
const mockGetTrends = getters.getTrends as jest.MockedFunction<typeof getTrends>
mockGetTrends.mockResolvedValue([...])
```

### Testing Zustand Store
```typescript
import { useContentAIStore } from '@/lib/store/contentaiStore'

test('store updates correctly', () => {
  const { result } = renderHook(() => useContentAIStore())
  act(() => {
    result.current.setSelectedTopic('Test')
  })
  expect(result.current.selectedTopic).toBe('Test')
})
```

---

## 💡 Pro Tips

1. **Keep tests focused**: One test should verify one behavior
2. **Use descriptive names**: `should_show_error_when_api_fails`
3. **Mock external dependencies**: APIs, timers, etc.
4. **Test user behavior**: Not implementation details
5. **Use data-testid sparingly**: Rely on accessible queries first
6. **Clean up after tests**: Use `beforeEach` and `afterEach`
7. **Test edge cases**: Empty states, errors, loading states

---

## ❓ FAQ

**Q: Do I need to write tests for every component?**
A: Aim for critical components. Test user-facing features and business logic.

**Q: How long should tests take to run?**
A: Fast tests are good. Aim for < 5 seconds for full suite.

**Q: Should I test implementation or behavior?**
A: Test behavior. Implementation can change without breaking tests.

**Q: How do I test Redux/Zustand?**
A: Use `renderHook` with `@testing-library/react`.

---

**Happy Testing! 🎉**
