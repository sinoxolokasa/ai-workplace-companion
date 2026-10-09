import { describe, expect, it } from 'vitest';
import { generateEmail, researchText, chatReply } from '@/lib/simulations';

describe('Workplace simulations', () => {
  it('uses the supplied email details and all three distinct tones', () => {
    const emails = (['Formal', 'Friendly', 'Persuasive'] as const).map(tone => generateEmail('Team', 'Friday update', 'Share milestone progress', tone));
    expect(new Set(emails).size).toBe(3);
    emails.forEach(email => {
      expect(email).toContain('Friday update');
      expect(email).toContain('Share milestone progress.');
      expect(email).toContain('Team');
    });
  });
  it('extracts source text and marks unsourced topic research', () => {
    expect(researchText('Our team reduced meetings. Focus time increased.', 'text')).toContain('Focus time increased.');
    expect(researchText('Remote collaboration', 'topic')).toContain('No live sources have been searched');
  });
  it('responds to workplace prompts and retains prior-turn context', () => {
    expect(chatReply('Plan my time')).toContain('Choose three priorities');
    expect(chatReply('Next steps', 'Plan my time')).toContain('Plan my time');
  });
});