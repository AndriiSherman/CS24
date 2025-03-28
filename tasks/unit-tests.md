## Extend Validation:

1. Add additional rules (e.g., check that sender and recipient are not the same, or disallow certain words).
2. Write unit tests covering these new rules.

## Enhance Formatting:

1. Update formatMessageForDisplay to include additional information, such as a message status (e.g., “sent” or “read”).
2. Create tests to verify the updated output format.

## Content Sanitization(*):

1. Improve the sanitizeContent function to handle additional edge cases (e.g., handling quotes or other special characters, ~`').
2. Write tests for various content strings to ensure they are sanitized correctly.
