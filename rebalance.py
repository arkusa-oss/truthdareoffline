import csv
import math
from pathlib import Path

INPUT = Path("orb_master.csv")
OUTPUT = Path("orb_master_rebalanced.csv")

# --- tweak if you want ---
STAGE_MIN = 1
STAGE_MAX = 20

# If Intensity_auto is 0–10 (common), this works well.
# If yours is 0–100, tell me and we'll adjust.
DEFAULT_INTENSITY_MIN = 1.0
DEFAULT_INTENSITY_MAX = 10.0


def to_float(x):
    try:
        v = float(str(x).strip())
        if math.isfinite(v):
            return v
    except Exception:
        pass
    return None


def clamp(n, lo, hi):
    return max(lo, min(hi, n))


def linear_stage(value, lo, hi):
    """Map value in [lo..hi] to stage in [1..20]"""
    if value is None:
        return None
    if hi <= lo:
        return None
    t = (value - lo) / (hi - lo)
    t = clamp(t, 0.0, 1.0)
    stage = STAGE_MIN + t * (STAGE_MAX - STAGE_MIN)
    return int(round(stage))


def main():
    if not INPUT.exists():
        print(f"❌ Can't find {INPUT.resolve()}")
        return

    rows = []
    with INPUT.open("r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames or []
        for r in reader:
            rows.append(r)

    if not rows:
        print("❌ CSV has no rows.")
        return

    # Find real intensity range from your file (fallback to defaults)
    intensities = []
    for r in rows:
        v = to_float(r.get("Intensity_auto", ""))
        if v is not None:
            intensities.append(v)

    if intensities:
        real_min = min(intensities)
        real_max = max(intensities)
    else:
        real_min = DEFAULT_INTENSITY_MIN
        real_max = DEFAULT_INTENSITY_MAX

    # Use a trimmed range so outliers don't crush the mapping
    intensities_sorted = sorted(intensities) if intensities else []
    if len(intensities_sorted) >= 20:
        p05 = intensities_sorted[int(len(intensities_sorted) * 0.05)]
        p95 = intensities_sorted[int(len(intensities_sorted) * 0.95)]
        lo, hi = p05, p95
    else:
        lo, hi = real_min, real_max

    # Ensure Stage_calc column exists
    if "Stage_calc" not in (rows[0].keys()):
        # If DictReader didn't include it, we'll add it to output fieldnames
        if "Stage_calc" not in fieldnames:
            fieldnames.append("Stage_calc")

    # Recompute Stage_calc
    updated = 0
    missing_intensity = 0

    for r in rows:
        v = to_float(r.get("Intensity_auto", ""))
        stage = linear_stage(v, lo, hi)
        if stage is None:
            missing_intensity += 1
            # Keep existing Stage_calc if present; else default to mid
            existing = to_float(r.get("Stage_calc", ""))
            if existing is not None:
                r["Stage_calc"] = str(int(existing))
            else:
                r["Stage_calc"] = "10"
        else:
            r["Stage_calc"] = str(stage)
            updated += 1

    # Write output
    with OUTPUT.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for r in rows:
            writer.writerow(r)

    print("✅ Rebalance complete")
    print(f"Input:  {INPUT.resolve()}")
    print(f"Output: {OUTPUT.resolve()}")
    print(f"Intensity used range (trimmed): {lo:.3f} .. {hi:.3f}")
    print(f"Rows updated from Intensity_auto: {updated}")
    print(f"Rows missing Intensity_auto:      {missing_intensity}")


if __name__ == "__main__":
    main()