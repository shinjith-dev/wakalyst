import { THEME } from "../config";

const hexRegex = /^#([a-fA-F0-9]{6})$/;
const hexaRegex = /^#([a-fA-F0-9]{8})$/;
const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
const rgbaRegex =
  /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0?\.\d+)\s*\)$/;

/**
 * Convert a color to RGBA format with a modified opacity.
 * @param color - The input color in hex, hexa, rgb, or rgba.
 * @param opacity - A value between 0 and 1.
 * @returns The color with the modified opacity.
 */
export function opacity(color: string, opacity: number): string {
  if (opacity < 0 || opacity > 1) {
    throw new Error("Opacity must be between 0 and 1.");
  }

  if (hexRegex.test(color)) {
    const [, hex] = hexRegex.exec(color)!;
    const r = Number.parseInt(hex.slice(0, 2), 16);
    const g = Number.parseInt(hex.slice(2, 4), 16);
    const b = Number.parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  } else if (hexaRegex.test(color)) {
    const [, hexa] = hexaRegex.exec(color)!;
    const r = Number.parseInt(hexa.slice(0, 2), 16);
    const g = Number.parseInt(hexa.slice(2, 4), 16);
    const b = Number.parseInt(hexa.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  } else if (rgbRegex.test(color)) {
    const [, r, g, b] = rgbRegex.exec(color)!.map(Number);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  } else if (rgbaRegex.test(color)) {
    const [, r, g, b] = rgbaRegex.exec(color)!.map(Number);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  throw new Error(
    "Invalid color format. Supported formats: hex, hexa, rgb, rgba.",
  );
}

/**
 * Lighten a color by reducing its intensity.
 * @param color - The input color in hex, hexa, rgb, or rgba.
 * @param factor - A value between 0 and 1 (where 1 is the lightest).
 * @returns The lightened color.
 */
export function lighten(color: string, factor: number): string {
  if (factor < 0 || factor > 1) {
    throw new Error("Factor must be between 0 and 1.");
  }

  function lightenChannel(channel: number): number {
    return Math.min(255, Math.round(channel + (255 - channel) * factor));
  }

  if (hexRegex.test(color)) {
    const [, hex] = hexRegex.exec(color)!;
    const r = Number.parseInt(hex.slice(0, 2), 16);
    const g = Number.parseInt(hex.slice(2, 4), 16);
    const b = Number.parseInt(hex.slice(4, 6), 16);
    return `rgb(${lightenChannel(r)}, ${lightenChannel(g)}, ${lightenChannel(b)})`;
  } else if (rgbRegex.test(color)) {
    const [, r, g, b] = rgbRegex.exec(color)!.map(Number);
    return `rgb(${lightenChannel(r)}, ${lightenChannel(g)}, ${lightenChannel(b)})`;
  } else if (rgbaRegex.test(color)) {
    const [, r, g, b, a] = rgbaRegex.exec(color)!.map((v) => Number(v));
    return `rgba(${lightenChannel(r)}, ${lightenChannel(g)}, ${lightenChannel(b)}, ${a})`;
  }

  throw new Error("Invalid color format. Supported formats: hex, rgb, rgba.");
}

/**
 * Darken a color by increasing its intensity.
 * @param color - The input color in hex, hexa, rgb, or rgba.
 * @param factor - A value between 0 and 1 (where 1 is the darkest).
 * @returns The darkened color.
 */
export function darken(color: string, factor: number): string {
  if (factor < 0 || factor > 1) {
    throw new Error("Factor must be between 0 and 1.");
  }

  const hexRegex = /^#([a-fA-F0-9]{6})$/;
  const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
  const rgbaRegex =
    /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0?\.\d+)\s*\)$/;

  function darkenChannel(channel: number): number {
    return Math.max(0, Math.round(channel * (1 - factor)));
  }

  if (hexRegex.test(color)) {
    const [, hex] = hexRegex.exec(color)!;
    const r = Number.parseInt(hex.slice(0, 2), 16);
    const g = Number.parseInt(hex.slice(2, 4), 16);
    const b = Number.parseInt(hex.slice(4, 6), 16);
    return `rgb(${darkenChannel(r)}, ${darkenChannel(g)}, ${darkenChannel(b)})`;
  } else if (rgbRegex.test(color)) {
    const [, r, g, b] = rgbRegex.exec(color)!.map(Number);
    return `rgb(${darkenChannel(r)}, ${darkenChannel(g)}, ${darkenChannel(b)})`;
  } else if (rgbaRegex.test(color)) {
    const [, r, g, b, a] = rgbaRegex.exec(color)!.map((v) => Number(v));
    return `rgba(${darkenChannel(r)}, ${darkenChannel(g)}, ${darkenChannel(b)}, ${a})`;
  }

  throw new Error("Invalid color format. Supported formats: hex, rgb, rgba.");
}

export function hexToLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  return 0.2126 * r + 0.5 * g + 0.0722 * b;
}

export function findDarkestInRange(
  hexColors: string[],
  minColor?: string,
  maxColor?: string,
): string | undefined {
  const minLum = hexToLuminance(minColor || THEME.color.fg);
  const maxLum = hexToLuminance(maxColor || THEME.color.bg);

  const colorsInRange = hexColors.filter((color) => {
    const lum = hexToLuminance(color);
    return lum >= minLum && lum <= maxLum;
  });

  if (colorsInRange.length > 0) {
    return colorsInRange.reduce((darkest, color) =>
      hexToLuminance(color) < hexToLuminance(darkest) ? color : darkest,
    );
  } else {
    return hexColors.reduce((closest, color) => {
      const lum = hexToLuminance(color);
      const closestLum = hexToLuminance(closest);
      const targetLum = (minLum + maxLum) / 2; // middle point
      return Math.abs(lum - targetLum) < Math.abs(closestLum - targetLum)
        ? color
        : closest;
    });
  }
}
