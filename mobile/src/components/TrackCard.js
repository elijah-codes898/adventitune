import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius } from '../theme';

/**
 * TrackCard — displays a single track/hymn in a list
 * Props:
 *   track: { id, title, artist, albumArt, duration, hymnNumber?, isDownloaded? }
 *   onPress: () => void
 *   onMorePress: () => void
 *   isPlaying: boolean
 */
export default function TrackCard({ track, onPress, onMorePress, isPlaying = false }) {
  const formatDuration = (seconds) => {
    if (!seconds) return '—';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <TouchableOpacity
      style={[styles.container, isPlaying && styles.containerPlaying]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Album Art */}
      <View style={styles.artWrapper}>
        {track.albumArt ? (
          <Image source={{ uri: track.albumArt }} style={styles.art} />
        ) : (
          <View style={styles.artPlaceholder}>
            <Ionicons name="musical-note" size={20} color={Colors.primary} />
          </View>
        )}
        {isPlaying && (
          <View style={styles.playingOverlay}>
            <Ionicons name="volume-high" size={14} color={Colors.accent} />
          </View>
        )}
      </View>

      {/* Track Info */}
      <View style={styles.info}>
        <View style={styles.titleRow}>
          {track.hymnNumber && (
            <Text style={styles.hymnNumber}>#{track.hymnNumber} </Text>
          )}
          <Text style={[styles.title, isPlaying && styles.titlePlaying]} numberOfLines={1}>
            {track.title}
          </Text>
        </View>
        <Text style={styles.artist} numberOfLines={1}>{track.artist}</Text>
      </View>

      {/* Right Side */}
      <View style={styles.right}>
        {track.isDownloaded && (
          <Ionicons
            name="arrow-down-circle"
            size={16}
            color={Colors.success}
            style={styles.downloadIcon}
          />
        )}
        <Text style={styles.duration}>{formatDuration(track.duration)}</Text>
        <TouchableOpacity onPress={onMorePress} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="ellipsis-vertical" size={18} color={Colors.textTertiary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: 2,
  },
  containerPlaying: {
    backgroundColor: Colors.surfaceElevated,
  },
  artWrapper: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  art: {
    width: 52,
    height: 52,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surfaceElevated,
  },
  artPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  playingOverlay: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: Colors.background,
    borderRadius: Radius.full,
    padding: 2,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  hymnNumber: {
    ...Typography.hymnNumber,
    color: Colors.accent,
  },
  title: {
    ...Typography.bodyMedium,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
  },
  titlePlaying: {
    color: Colors.accent,
  },
  artist: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginLeft: Spacing.sm,
  },
  downloadIcon: {
    marginRight: 2,
  },
  duration: {
    ...Typography.labelSmall,
    color: Colors.textTertiary,
    minWidth: 36,
    textAlign: 'right',
  },
});
