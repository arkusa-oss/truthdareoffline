cat > rebalance_modes.py << 'PY'
#!/usr/bin/env python3
import csv
import os
import sys
from datetime import datetime

INPUT = "orb_master.csv"
OUTPUT = "orb_master_fixed.csv"
REVIEW = "orb_master_review.csv"

# --- Helpers ---
def safe(s):
    return (s or "").strip()

def lower(s):
    return safe(s).lower()

def detect_delimiter(sample_text: str) -> str:
    # Your CSV sometimes comes from Google Sheets (commas) but could be semicolons in EU locales.
    # Sniff safely; default to comma.
    try:
        dialect = csv.Sniffer().sniff(sample_text, delimiters=[",", ";", "\t"])
        return dialect.delimiter
    except Exception:
        return ","

def mode_from_relationship_context(val: str) -> str:
    v = lower(val)
    # Known values/flags
    if v in ("solo", "group", "couple"):
        return v
    if v in ("requires_partner", "partner", "couples"):
        return "couple"
    # blank/unknown = group
    return "group"

DARE_STARTERS = (
    "do ", "show ", "take ", "send ", "text ", "call ", "sing ", "dance ", "kiss ",
    "swap ", "remove ", "put ", "wear ", "act ", "pretend ", "imitate ", "try ",
    "drink ", "eat ", "lick ", "spin ", "run ", "stand ", "hold ", "let ",
    "give ", "name ", "draw ", "reenact ", "whisper ", "post ", "message ",
    "go ", "clap ", "jump ", "crawl "
)

def fix_type(original_type: str, text: str) -> (str, str):
    """
    Conservative fixes:
    - If labeled DARE but ends with '?' => it's almost certainly TRUTH.
    - If labeled TRUTH but looks like an instruction (starts with verb) AND does NOT end with '?' => likely DARE.
    Otherwise leave alone.
    """
    t = lower(original_type)
    txt = safe(text)

    if not txt:
        return original_type, ""

    ends_q = txt.endswith("?")
    starts_dare = lower(txt).startswith(DARE_STARTERS)

    if t == "dare" and ends_q:
        return "truth", "dare->truth (question-mark)"
    if t == "truth" and (not ends_q) and starts_dare:
        return "dare", "truth->dare (imperative)"
    return original_type, ""

def main():
    if not os.path.exists(INPUT):
        print(f"❌ Missing {INPUT} in this folder: {os.getcwd()}")
        sys.exit(1)

    # Backup the original (timestamped)
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup = f"orb_master_backup_{ts}.csv"
    try:
        # Only create backup if it doesn't exist
        if not os.path.exists(backup):
            with open(INPUT, "rb") as src, open(backup, "wb") as dst:
                dst.write(src.read())
    except Exception as e:
        print(f"⚠️ Could not write backup: {e}")

    # Read a small sample to detect delimiter
    with open(INPUT, "r", encoding="utf-8", errors="replace") as f:
        sample = f.read(4096)
    delim = detect_delimiter(sample)

    # Load CSV
    with open(INPUT, "r", encoding="utf-8", errors="replace", newline="") as f:
        reader = csv.DictReader(f, delimiter=delim)
        fieldnames = reader.fieldnames or []
        rows = list(reader)

    if not fieldnames:
        print("❌ Could not read headers. Open orb_master.csv and confirm it has a header row.")
        sys.exit(1)

    # Normalize header keys we expect to exist (don’t rename columns, just use what’s there)
    # We'll try multiple variants.
    def find_col(candidates):
        for c in candidates:
            for h in fieldnames:
                if lower(h) == lower(c):
                    return h
        return None

    col_type = find_col(["Type"])
    col_text = find_col(["Prompt Text", "Prompt", "Text"])
    col_rel  = find_col(["relationship_context", "relationship context", "relationship"])

    # If relationship_context exists, we will add/ensure "Mode" column.
    # If it doesn't exist, we'll still ensure Mode exists and default to group.
    if "Mode" not in fieldnames:
        fieldnames.append("Mode")
    if "Type_fix_reason" not in fieldnames:
        fieldnames.append("Type_fix_reason")
    if "Mode_fix_reason" not in fieldnames:
        fieldnames.append("Mode_fix_reason")

    type_fixes = 0
    mode_fixes = 0
    review_rows = []

    for i, row in enumerate(rows, start=2):  # start=2 because row 1 is header
        # --- Fix Mode ---
        old_mode = safe(row.get("Mode", ""))
        rel_val = row.get(col_rel, "") if col_rel else ""
        inferred_mode = mode_from_relationship_context(rel_val) if col_rel else "group"

        # If Mode blank or not one of allowed, set it.
        if lower(old_mode) not in ("solo", "group", "couple"):
            row["Mode"] = inferred_mode
            row["Mode_fix_reason"] = f"set from relationship_context='{safe(rel_val)}'"
            mode_fixes += 1
            review_rows.append({
                "row": i,
                "change_type": "MODE",
                "before": old_mode,
                "after": inferred_mode,
                "prompt": safe(row.get(col_text, ""))[:180]
            })
        else:
            row["Mode_fix_reason"] = ""

        # --- Fix Type (truth/dare) ---
        if col_type and col_text:
            old_type = safe(row.get(col_type, ""))
            txt = safe(row.get(col_text, ""))
            new_type, reason = fix_type(old_type, txt)
            if reason:
                row[col_type] = new_type
                row["Type_fix_reason"] = reason
                type_fixes += 1
                review_rows.append({
                    "row": i,
                    "change_type": "TYPE",
                    "before": old_type,
                    "after": new_type,
                    "prompt": txt[:180]
                })
            else:
                row["Type_fix_reason"] = ""

    # Write fixed CSV (keep same delimiter style)
    with open(OUTPUT, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, delimiter=delim)
        writer.writeheader()
        writer.writerows(rows)

    # Write review CSV (always comma for simplicity)
    with open(REVIEW, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["row", "change_type", "before", "after", "prompt"])
        w.writeheader()
        w.writerows(review_rows)

    print("✅ Rebalance (modes + type) complete")
    print(f"Input:  {os.path.abspath(INPUT)}")
    print(f"Backup: {os.path.abspath(backup)}")
    print(f"Output: {os.path.abspath(OUTPUT)}")
    print(f"Review: {os.path.abspath(REVIEW)}")
    print(f"Mode fixes: {mode_fixes}")
    print(f"Type fixes: {type_fixes}")

if __name__ == "__main__":
    main()
PY
