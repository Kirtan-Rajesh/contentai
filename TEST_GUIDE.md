# ContentAI Testing & Quality Assurance Guide

## 🧪 Testing Framework Setup

The project now includes comprehensive unit and integration testing using Jest and React Testing Library.

### Test Files Created

1. **`__tests__/components/TrendAnalyzer.test.tsx`**
   - Tests for TrendAnalyzer component
   - Tests for button clicks and state management
   - Tests for error handling
   - Tests for Refresh Trends functionality

2. **`__tests__/services/apiService.test.ts`**
   - Tests for API service methods
   - Tests for error handling
   - Tests for all agent endpoints

3. **`__tests__/store/contentaiStore.test.ts`**
   - Tests for Zustand store actions
   - Tests for state mutations
   - Tests for store initialization

4. **`__tests__/pages/page.test.tsx`**
   - Integration tests for main page
   - Tests for tab navigation
   - Tests for sidebar functionality

### Running Tests

```bash
# Run tests in watch mode
npm run test

# Run tests in CI mode (no watch)
npm run test:ci

# Run tests with coverage report
npm run test:coverage
```

## 🔧 Configuration Files

### jest.config.js
- Jest configuration for Next.js
- Module path mapping for imports
- Coverage collection settings

### jest.setup.js
- Global test setup
- Mocks for Next.js router and navigation
- Test utilities initialization

## ✅ Feature Testing Checklist

### Trends Tab
- [ ] Trends load on page initialization
- [ ] Refresh Trends button triggers API call
- [ ] Trends display with correct formatting
- [ ] Select trend updates global store
- [ ] "Use this topic" button works
- [ ] "View Insight" button displays reasoning
- [ ] "Send to Telegram" button sends message

### Updates Tab
- [ ] Tech updates display correctly
- [ ] Updates from multiple sources (News, ArXiv, GitHub)
- [ ] Selecting an update updates the topic

### Research Tab
- [ ] Deep research form accepts input
- [ ] Research button is enabled when input present
- [ ] Research results display
- [ ] Results integrate with hook generation

### Hooks Tab
- [ ] Hooks generate from selected topic
- [ ] Topic auto-populates from store
- [ ] Different hook types display (question, problem, result, etc.)
- [ ] Hook selection updates store

### Script Tab
- [ ] Script generates from topic + hook
- [ ] Requires both topic and hook selected
- [ ] Generated script displays in textarea
- [ ] Script can be edited

### Captions Tab
- [ ] Captions generate from script
- [ ] Displays Instagram caption
- [ ] Displays hashtags
- [ ] Displays YouTube description

## 🎨 UI/UX Testing

### Dark Theme Professional Styling
- [x] Background gradient applied (slate-950 to purple-950)
- [x] Buttons have proper hover states
- [x] Cards have subtle transparency and backdrop blur
- [x] Section titles have gradient text
- [x] Session sidebar is clearly visible
- [x] Tab navigation shows active state

### Professional Elements
- [x] Proper spacing and padding throughout
- [x] Consistent color scheme (blues, cyans, purples)
- [x] Focus states on interactive elements
- [x] Disabled state styling on buttons
- [x] Smooth transitions and animations
- [x] Proper typography hierarchy

## 🔌 API Endpoints Testing

### /api/agents/trends
- [x] Returns array of trends
- [x] Includes points, hooks, audience, reasoning
- [x] Handles multiple sources (HN, Reddit, GitHub, ArXiv, Tech News)
- [x] Falls back to mock data on error
- [x] Returns sources information

### /api/agents/updates
- [x] Returns array of tech updates
- [x] Includes content angles and ideas
- [x] Handles news, research, and releases
- [x] Falls back gracefully on error

### /api/agents/hooks
- [x] Generates hooks from topic
- [x] Returns different hook types
- [x] Handles invalid input

### /api/agents/script
- [x] Generates script from topic + hook
- [x] Returns formatted script
- [x] Includes proper structure

### /api/agents/captions
- [x] Generates captions from script
- [x] Returns Instagram caption, hashtags, YouTube description

## 🐛 Known Issues & Fixes

### Refresh Trends Button
**Status**: Fixed
- **Issue**: Button was getting stuck in loading state
- **Fix**: Updated error handling in TrendAnalyzer component to properly clear loading state
- **Testing**: Click button, should show trends within 3 seconds

### Dark Theme
**Status**: Completed
- **Changes**: 
  - Updated globals.css with professional gradient background
  - Added backdrop blur effects
  - Enhanced button hover states
  - Improved focus states for accessibility
  - Added new component classes (.page-gradient, .header-gradient)

## 📊 Test Coverage Goals

Current target coverage:
- Statements: 70%
- Branches: 65%
- Functions: 70%
- Lines: 70%

View coverage report:
```bash
npm run test:coverage
```

## 🚀 Continuous Integration

Tests are configured to run in CI environments. Add to your CI/CD pipeline:

```yaml
- name: Run tests
  run: npm run test:ci

- name: Generate coverage
  run: npm run test:coverage

- name: Upload coverage
  uses: codecov/codecov-action@v3
```

## 📝 Writing New Tests

### Component Test Template
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import YourComponent from '@/components/path/YourComponent'

describe('YourComponent', () => {
  test('renders correctly', () => {
    render(<YourComponent />)
    expect(screen.getByText(/text/i)).toBeInTheDocument()
  })

  test('handles button click', () => {
    render(<YourComponent />)
    const button = screen.getByRole('button', { name: /button text/i })
    fireEvent.click(button)
    // Add assertions
  })
})
```

### API Service Test Template
```typescript
import * as apiService from '@/lib/services/apiService'
import axios from 'axios'

jest.mock('axios')

describe('API Service', () => {
  test('fetches data successfully', async () => {
    const mockData = { /* mock response */ }
    axios.get.mockResolvedValue({ data: mockData })
    
    const result = await apiService.getData()
    expect(result).toEqual(mockData)
  })
})
```

## 🔍 Manual Testing Steps

### Full Workflow Test
1. Navigate to http://localhost:3000
2. Verify dark theme is applied
3. Click "🔥 Trends" tab
4. Wait for trends to load
5. Click "Refresh Trends" button
6. Verify trends refresh and update
7. Click "Use this topic" on a trend
8. Verify:
   - Session panel updates with topic
   - Auto-navigates to Hooks tab
   - Hook generator has topic pre-filled
9. Generate hooks
10. Select a hook
11. Navigate to Script tab
12. Generate script
13. Navigate to Captions tab
14. Generate captions
15. Test dark theme in different sections

### Responsive Design Test
1. Test on desktop (1920px wide)
2. Test on tablet (768px wide)
3. Test on mobile (375px wide)
4. Verify layout adapts correctly
5. Verify buttons and inputs are accessible

### Error Handling Test
1. Disable internet connection
2. Try to refresh trends
3. Verify fallback data displays
4. Verify error messages are clear
5. Verify user can continue working

## 📱 Browser Compatibility

Tested and working on:
- Chrome 120+
- Firefox 121+
- Safari 17+
- Edge 120+

## 🎯 Performance Metrics

Target metrics:
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.5s

## 📚 Additional Resources

- Jest Documentation: https://jestjs.io/
- React Testing Library: https://testing-library.com/react
- Next.js Testing: https://nextjs.org/docs/testing
- Tailwind CSS: https://tailwindcss.com/

## 🔄 Regression Testing

Before each release:
1. Run full test suite: `npm run test:ci`
2. Check coverage: `npm run test:coverage`
3. Manual testing of all features
4. Performance testing
5. Browser compatibility check
