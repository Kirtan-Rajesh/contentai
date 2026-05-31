# Button & Feature Testing Checklist

## 🔴 Main Navigation Tabs

### Trends Tab
- [ ] **Refresh Trends Button**
  - Click button
  - Expect: API call starts, button shows "Loading..."
  - Expect: After 2-3 seconds, trends display
  - Expect: Button returns to "Refresh Trends"
  - Error state: If API fails, shows fallback data

- [ ] **Trend Cards**
  - [ ] Displays trend title as clickable link
  - [ ] Shows points count
  - [ ] Shows timestamp
  - [ ] Displays hooks list (3 hooks)
  - [ ] Shows audience badge
  - [ ] Has proper visual styling

- [ ] **"Use this topic" Button**
  - Click on trend card
  - Expect: Session panel updates with topic
  - Expect: Auto-navigates to Hooks tab
  - Expect: Button shows "✓ Selected" state

- [ ] **"View Insight" Button**
  - Click button
  - Expect: Bottom panel shows topic insights
  - Expect: Reasoning text streams/animates

- [ ] **"Send to Telegram" Button**
  - Click button
  - Expect: Shows loading state
  - Expect: Success message appears
  - Expect: Message sent to Telegram chat

### Updates Tab
- [ ] **Display Tech Updates**
  - Should show 5-10 updates
  - Each has title, source, content angles
  - Click to select displays content ideas

- [ ] **Select Update Button**
  - Updates session topic
  - Navigates to appropriate tab

### Research Tab
- [ ] **Input Field**
  - Type research query
  - Field accepts text input
  - Shows character count (optional)

- [ ] **Research Button**
  - Enabled when input has text
  - Click triggers research
  - Shows loading state
  - Displays results

### Hooks Tab
- [ ] **Topic Display**
  - Auto-populates from store
  - Shows current selected topic
  - Can be manually edited

- [ ] **Generate Button**
  - Enabled when topic present
  - Shows loading state
  - Generates 3-5 hooks

- [ ] **Hook Selection**
  - Click hook card
  - Updates session panel
  - Shows emoji indicator (❓⚠️✅🔥😊)
  - Changes button to "✓ Selected"

### Script Tab
- [ ] **Topic Display**
  - Shows selected topic
  - Shows selected hook

- [ ] **Generate Button**
  - Only enabled if both topic AND hook selected
  - Shows all required fields filled
  - Generates script on click

- [ ] **Script Textarea**
  - Displays generated script
  - Editable text
  - Preserves formatting
  - Shows full script

### Captions Tab
- [ ] **Input Display**
  - Shows selected script
  - Shows selected topic

- [ ] **Generate Button**
  - Generates captions from script
  - Shows loading state

- [ ] **Caption Outputs**
  - [ ] Instagram Caption (with character limit indication)
  - [ ] Hashtags (with # prefix)
  - [ ] YouTube Description (longer format)

## 🟢 Session Panel Controls

- [ ] **Topic Display**
  - Shows "None selected" initially
  - Updates when trend/update selected
  - Truncates long text with "..."

- [ ] **Hook Display**
  - Shows "None selected" initially
  - Updates when hook selected
  - Shows truncated text

- [ ] **→ Hooks Button**
  - Navigates to Hooks tab
  - Only relevant if topic selected

- [ ] **→ Script Button**
  - Navigates to Script tab
  - Only relevant if topic AND hook selected

## 🟡 Header Controls

- [ ] **← Panel Button**
  - Click hides sidebar
  - Text changes to "→"
  - Click again shows sidebar
  - Text changes back to "←"

## 🔵 Visual & UX Testing

### Dark Theme Validation
- [ ] Background is dark (purple/blue gradient)
- [ ] Text is readable (high contrast)
- [ ] Buttons have proper hover effects
- [ ] Cards have subtle shadows/borders
- [ ] Tab transitions are smooth
- [ ] No jarring color changes
- [ ] Professional appearance throughout

### Responsive Design
- [ ] Desktop (1920px): All elements visible
- [ ] Tablet (768px): Sidebar collapses on scroll
- [ ] Mobile (375px): Single column layout
- [ ] Touch targets (44px minimum)
- [ ] No horizontal scrolling needed
- [ ] Text is legible on all sizes

### Accessibility
- [ ] All buttons are keyboard accessible
- [ ] Tab navigation works properly
- [ ] Focus states are visible
- [ ] Color contrast meets WCAG AA
- [ ] Form fields have labels
- [ ] Error messages are clear

## 🟠 Error Handling

- [ ] **No Data**
  - Show "No trends available"
  - Show fallback data
  - Don't show blank screen

- [ ] **API Errors**
  - Display error message
  - Provide "Retry" option
  - Show fallback data if available

- [ ] **Network Offline**
  - Show offline indicator
  - Use fallback data
  - Allow navigation offline

- [ ] **Input Validation**
  - Warn if topic too short
  - Warn if required fields missing
  - Disable button if invalid

## 📊 Performance Testing

- [ ] Page loads in < 3 seconds
- [ ] Button clicks respond in < 200ms
- [ ] API calls complete in < 5 seconds
- [ ] No console errors
- [ ] No memory leaks
- [ ] Smooth scrolling
- [ ] No jank in animations

## 🧪 Cross-Browser Testing

Test on:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## ✅ Sign-Off Checklist

Before marking as complete:
- [ ] All buttons tested and working
- [ ] All features tested in isolation
- [ ] Full workflow test (trend → hook → script → captions)
- [ ] Error scenarios handled
- [ ] Dark theme validated
- [ ] Responsive design verified
- [ ] Performance acceptable
- [ ] No console errors
- [ ] Documentation updated
- [ ] Ready for production

---

## Testing Notes

- Start with Trends tab
- Work through each tab sequentially
- Test error states
- Test responsive behavior
- Run through full workflow 3+ times
- Test on different devices
- Report any issues with screenshots

## Bug Reporting Template

When you find an issue, include:
1. **Steps to reproduce**
2. **Expected behavior**
3. **Actual behavior**
4. **Browser/Device**
5. **Screenshot/Screen recording**
6. **Console errors (if any)**
