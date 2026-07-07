import re

with open("/home/few/Projects/database-system/Wiki/Lecture 3 - Relational Algebra.md", "r", encoding="utf-8") as f:
    content = f.read()

# Fix 1: Ensure a blank line before any table row that starts right after a text line inside blockquotes or regular text
# We look for a line that is NOT a table row, followed immediately by a table row (starts with | or > |)
# We need to insert a blank line.
content = re.sub(r'(\n> \*\*.*?\*\*)\n(> \|)', r'\1\n> \n\2', content)
content = re.sub(r'(\n\*\*.*?\*\*)\n(\|)', r'\1\n\n\2', content)

# Fix 2: Remove the "เขียนสัญลักษณ์คณิตศาสตร์ว่า A \cup B" thing to prevent confusion
content = content.replace(r"(เขียนสัญลักษณ์คณิตศาสตร์ว่า A $\cup$ B)", "(A UNION B)")
content = content.replace(r"(เขียนสัญลักษณ์คณิตศาสตร์ว่า A $\cap$ B)", "(A INTERSECTION B)")

# Fix 3: Ensure tables after any text have a blank line
lines = content.split('\n')
new_lines = []
for i in range(len(lines)):
    if i > 0 and ('|' in lines[i] and '---' not in lines[i] and lines[i].strip().startswith('> |') or lines[i].strip().startswith('|')):
        # Check if previous line is not empty and not a table line
        prev_line = lines[i-1].strip()
        if prev_line and not prev_line.startswith('|') and not prev_line.startswith('> |') and not prev_line == '>':
            if lines[i].strip().startswith('> |'):
                new_lines.append('>')
            else:
                new_lines.append('')
    new_lines.append(lines[i])

content = '\n'.join(new_lines)

with open("/home/few/Projects/database-system/Wiki/Lecture 3 - Relational Algebra.md", "w", encoding="utf-8") as f:
    f.write(content)

print("Tables fixed.")
