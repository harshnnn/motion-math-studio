/**
 * cn: tiny className combiner
 * - Strings/numbers are added directly
 * - Arrays are flattened
 * - Objects include keys with truthy values
 * No external dependencies.
 */

type ClassDictionary = Record<string, any>;
type ClassArray = ClassValue[];
type ClassValue =
  | string
  | number
  | null
  | false
  | undefined
  | ClassDictionary
  | ClassArray;

function toVal(mix: ClassValue): string {
  let str = "";

  if (!mix && mix !== 0) return "";

  const type = typeof mix;

  if (type === "string" || type === "number") {
    return String(mix);
  }

  if (Array.isArray(mix)) {
    for (const item of mix) {
      const v = toVal(item);
      if (v) str += (str ? " " : "") + v;
    }
    return str;
  }

  if (type === "object") {
    for (const key in mix as ClassDictionary) {
      // include key if value is truthy
      if ((mix as ClassDictionary)[key]) {
        str += (str ? " " : "") + key;
      }
    }
    return str;
  }

  return "";
}

export function cn(...inputs: ClassValue[]): string {
  let out = "";
  for (const input of inputs) {
    const v = toVal(input);
    if (v) out += (out ? " " : "") + v;
  }
  return out;
}
