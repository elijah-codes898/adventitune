// AdventiTune Design System
// Inspired by the deep reverence of SDA worship + modern East African digital aesthetics

export const Colors = {
  // Core palette
  background: '#0A0A0F',       // Near-black background
  surface: '#13131A',          // Card / surface background
  surfaceElevated: '#1C1C27',  // Slightly elevated surface
  border: '#2A2A3D',           // Subtle borders

  // Brand - Deep violet-gold inspired by East African twilight
  primary: '#7C5CBF',          // Primary purple (SDA Adventist blue-purple tone)
  primaryLight: '#9B7FD4',
  primaryDark: '#5A3E9B',

  accent: '#E8B84B',           // Gold accent — warmth, worship, Uganda sunshine
  accentLight: '#F0CC7A',
  accentDark: '#C49A2A',

  // Semantic
  success: '#4CAF7D',
  error: '#E05C5C',
  warning: '#E8B84B',

  // Text
  textPrimary: '#F0EEF8',      // Near-white with slight purple warmth
  textSecondary: '#8E8AA8',    // Muted secondary text
  textTertiary: '#5A5770',     // Very muted labels

  // Player UI
  playerBackground: '#0D0D18',
  waveformActive: '#7C5CBF',
  waveformInactive: '#2A2A3D',

  // Overlays
  overlay: 'rgba(10, 10, 15, 0.85)',
  overlayLight: 'rgba(10, 10, 15, 0.5)',
};

export const Typography = {
  // Display — for big headings
  displayLarge: { fontSize: 36, fontWeight: '800', letterSpacing: -1, lineHeight: 42 },
  displayMedium: { fontSize: 28, fontWeight: '700', letterSpacing: -0.5, lineHeight: 34 },
  displaySmall: { fontSize: 22, fontWeight: '700', letterSpacing: -0.3, lineHeight: 28 },

  // Body
  bodyLarge: { fontSize: 17, fontWeight: '400', lineHeight: 26 },
  bodyMedium: { fontSize: 15, fontWeight: '400', lineHeight: 22 },
  bodySmall: { fontSize: 13, fontWeight: '400', lineHeight: 18 },

  // Labels / UI
  labelLarge: { fontSize: 14, fontWeight: '600', letterSpacing: 0.5 },
  labelMedium: { fontSize: 12, fontWeight: '600', letterSpacing: 0.8 },
  labelSmall: { fontSize: 11, fontWeight: '500', letterSpacing: 1.0 },

  // Special
  hymnNumber: { fontSize: 13, fontWeight: '700', letterSpacing: 2, fontVariant: ['tabular-nums'] },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const Shadows = {
  sm: {
    shadowColor: '#7C5CBF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  md: {
    shadowColor: '#7C5CBF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
  lg: {
    shadowColor: '#7C5CBF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 32,
    elevation: 12,
  },
};

export default { Colors, Typography, Spacing, Radius, Shadows };
