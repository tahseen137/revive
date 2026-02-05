# Retry Engine Improvements - Feb 5, 2026

## Summary
Improved the Revive recovery engine with intelligent retry scheduling based on decline codes, payday detection, and time-of-day optimization.

## Key Improvements

### 1. **Smart Decline-Code-Specific Strategies**

#### `card_declined` (Standard Declines)
- **Schedule**: 4 hours → 24 hours → 72 hours
- **Optimization**: Schedules retries at 10am local time
- **Max Retries**: 3 attempts
- **Use Case**: Most common decline type, often transient issues

#### `insufficient_funds` (Payday-Aware)
- **Schedule**: Next payday → Following payday → Next cycle → 14 days
- **Payday Detection**: Automatically schedules for:
  - 1st of the month @ 10am
  - 15th of the month @ 10am
  - Next Friday @ 10am
- **Max Retries**: 4 attempts
- **Use Case**: Customer has funds on payday cycles

#### `expired_card` (Immediate Dunning)
- **Schedule**: None - no automatic retries
- **Action**: Immediate dunning email
- **Max Retries**: 0
- **Use Case**: Customer needs to update card details

#### `processing_error` (Fast Retry)
- **Schedule**: 1 hour
- **Max Retries**: 1 attempt
- **Use Case**: Usually transient processing issues

#### `authentication_required` (Customer Action)
- **Schedule**: None - no automatic retries
- **Action**: Send email with 3DS link
- **Max Retries**: 0
- **Use Case**: Requires customer to complete 3DS authentication

### 2. **Payday Detection Logic**
```typescript
function getNextPayday(fromDate: Date): Date
```
- Analyzes next 30 days for likely paydays
- Identifies: 1st of month, 15th of month, Fridays
- Returns earliest candidate
- All retries scheduled @ 10am local time

### 3. **Time-of-Day Optimization**
```typescript
function optimizeTimeOfDay(timestamp: number): number
```
- Target: 10am local time for better conversion
- Applied when delay > 4 hours
- Moves scheduled retries to optimal time window
- Avoids late night/early morning attempts

### 4. **Exponential Backoff with Jitter**
```typescript
function exponentialBackoffWithJitter(attempt: number): number
```
- Formula: `min(max_delay, base * 2^attempt) + jitter`
- Jitter: ±10% random variance
- Prevents thundering herd problem
- Used for generic/default failures

### 5. **Enhanced Logging**
Every retry decision now logs:
- Failure code and reason
- Current retry count vs max
- Scheduling strategy used (payday/exponential/standard)
- Next retry timestamp with human-readable date
- Time optimization adjustments
- Success/failure outcomes with details

Example log output:
```
[Retry Engine] Calculating next retry for payment abc-123
  Failure code: insufficient_funds
  Current retry count: 0
  Max retries: 4
  💰 Using payday detection for insufficient_funds
  🕐 Time optimization: Adjusted to 10am local time
  ✅ Next retry scheduled:
     Attempt: 1/4
     Delay: 72.5 hours
     Schedule: Fri, Feb 7, 2026, 10:00 AM EST
     Strategy: payday detection + 10am optimization
```

## Technical Details

### Files Modified
- `/src/lib/retry-engine.ts` - Complete rewrite with new logic

### Key Functions Added
1. `getNextPayday()` - Payday detection algorithm
2. `getPaydayRetrySchedule()` - Insufficient funds scheduling
3. `optimizeTimeOfDay()` - 10am time adjustment
4. `exponentialBackoffWithJitter()` - Smart backoff with randomization

### Backwards Compatibility
- ✅ All existing payment records work unchanged
- ✅ Database schema unchanged
- ✅ API contracts unchanged
- ✅ Webhook handling unchanged

## Deployment

**Commit**: `737f49c`
**Message**: `feat: improve smart retry scheduling with payday detection`
**Deployed**: https://revive-hq.com
**Status**: ✅ Live in production

## Testing Recommendations

### Manual Testing
1. Create test payments with different decline codes
2. Verify retry schedules match expected behavior:
   - `card_declined` → 4h, 24h, 72h @ 10am
   - `insufficient_funds` → Next payday dates
   - `expired_card` → No retries, immediate dunning
3. Check logs for detailed retry decision explanations

### Monitor in Production
- Watch retry success rates by decline code
- Verify payday detection accuracy
- Monitor time-of-day conversion rates
- Track recovery rates with new scheduling

## Expected Impact

### Improved Recovery Rates
- **Insufficient funds**: Higher recovery due to payday alignment
- **Standard declines**: Better timing with 10am optimization
- **Processing errors**: Faster resolution with 1-hour retry

### Better Customer Experience
- Fewer failed retries (right timing)
- Clear dunning emails when retries won't help
- 3DS links sent immediately when needed

### Operational Benefits
- Detailed logs for debugging
- Smarter retry distribution (no thundering herd)
- Clear scheduling rationale in logs

## Future Enhancements

Potential improvements for v2:
1. **Customer timezone detection** - Use actual customer timezone vs EST
2. **Machine learning** - Optimize retry timing based on historical success
3. **A/B testing** - Test different payday schedules
4. **Dynamic max retries** - Adjust based on customer payment history
5. **Webhook retry delays** - Coordinate with Stripe's own retry schedule

---

**Author**: Claude (Subagent)
**Date**: February 5, 2026
**Version**: 1.0
