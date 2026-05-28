import React, { useState, useRef } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  StyleSheet, Dimensions, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Radius } from '../theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const ARTWORK_SIZE = SCREEN_WIDTH - Spacing.xl * 2;

// Mock track for now
const MOCK_TRACK = {
  id: '1',
  title: 'How Great Thou Art',
  artist: 'Maranatha Singers',
  album: 'Hymns of Praise',
  hymnNumber: '86',
  duration: 245,
  currentTime: 87,
};

export default function PlayerScreen({ navigation, route }) {
  const track = route?.params?.track || MOCK_TRACK;

  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // off | one | all
  const [isShuffle, setIsShuffle] = useState(false);
  const [progress, setProgress] = useState(track.currentTime / track.duration);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const currentSeconds = Math.round(progress * track.duration);

  const cycleRepeat = () => {
    setRepeatMode(prev => prev === 'off' ? 'all' : prev === 'all' ? 'one' : 'off');
  };

  const repeatIcon = repeatMode === 'one' ? 'repeat-outline' : 'repeat';
  const repeatColor = repeatMode === 'off' ? Colors.textTertiary : Colors.accent;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background gradient */}
      <LinearGradient
        colors={['#1A0D33', '#0A0A0F', '#0A0A0F']}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-down" size={26} color={Colors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerLabel}>NOW PLAYING</Text>
            {track.hymnNumber && (
              <Text style={styles.headerHymn}>Hymn #{track.hymnNumber}</Text>
            )}
          </View>

          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="ellipsis-horizontal" size={22} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* ── Artwork ── */}
        <View style={styles.artworkContainer}>
          {track.albumArt ? (
            <Image
              source={{ uri: track.albumArt }}
              style={styles.artwork}
            />
          ) : (
            <LinearGradient
              colors={[Colors.primaryDark, Colors.primary, '#9B7FD4']}
              style={styles.artwork}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="musical-notes" size={80} color="rgba(255,255,255,0.15)" />
            </LinearGradient>
          )}
        </View>

        {/* ── Track Info ── */}
        <View style={styles.trackInfo}>
          <View style={styles.trackInfoLeft}>
            <Text style={styles.trackTitle} numberOfLines={1}>{track.title}</Text>
            <Text style={styles.trackArtist} numberOfLines={1}>{track.artist}</Text>
          </View>
          <TouchableOpacity
            style={styles.likeBtn}
            onPress={() => setIsLiked(!isLiked)}
          >
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={26}
              color={isLiked ? Colors.error : Colors.textTertiary}
            />
          </TouchableOpacity>
        </View>

        {/* ── Progress Bar ── */}
        <View style={styles.progressSection}>
          {/* Tap-to-seek bar */}
          <TouchableOpacity
            style={styles.progressBarTrack}
            onPress={(e) => {
              const newProgress = e.nativeEvent.locationX / (SCREEN_WIDTH - Spacing.xl * 2);
              setProgress(Math.max(0, Math.min(1, newProgress)));
            }}
            activeOpacity={1}
          >
            <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]}>
              <View style={styles.progressDot} />
            </View>
          </TouchableOpacity>

          <View style={styles.progressTimes}>
            <Text style={styles.timeText}>{formatTime(currentSeconds)}</Text>
            <Text style={styles.timeText}>{formatTime(track.duration)}</Text>
          </View>
        </View>

        {/* ── Playback Controls ── */}
        <View style={styles.controls}>
          {/* Shuffle */}
          <TouchableOpacity
            style={styles.controlSide}
            onPress={() => setIsShuffle(!isShuffle)}
          >
            <Ionicons
              name="shuffle"
              size={22}
              color={isShuffle ? Colors.accent : Colors.textTertiary}
            />
          </TouchableOpacity>

          {/* Previous */}
          <TouchableOpacity style={styles.controlSide}>
            <Ionicons name="play-skip-back" size={30} color={Colors.textPrimary} />
          </TouchableOpacity>

          {/* Play / Pause */}
          <TouchableOpacity
            style={styles.playBtn}
            onPress={() => setIsPlaying(!isPlaying)}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.primaryDark]}
              style={styles.playBtnGradient}
            >
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={34}
                color="white"
                style={isPlaying ? {} : { marginLeft: 3 }}
              />
            </LinearGradient>
          </TouchableOpacity>

          {/* Next */}
          <TouchableOpacity style={styles.controlSide}>
            <Ionicons name="play-skip-forward" size={30} color={Colors.textPrimary} />
          </TouchableOpacity>

          {/* Repeat */}
          <TouchableOpacity style={styles.controlSide} onPress={cycleRepeat}>
            <Ionicons name={repeatIcon} size={22} color={repeatColor} />
            {repeatMode === 'one' && (
              <View style={styles.repeatOneDot} />
            )}
          </TouchableOpacity>
        </View>

        {/* ── Bottom Actions ── */}
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => setIsDownloaded(!isDownloaded)}
          >
            <Ionicons
              name={isDownloaded ? 'arrow-down-circle' : 'arrow-down-circle-outline'}
              size={24}
              color={isDownloaded ? Colors.success : Colors.textTertiary}
            />
            <Text style={styles.actionLabel}>
              {isDownloaded ? 'Saved' : 'Download'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="share-social-outline" size={24} color={Colors.textTertiary} />
            <Text style={styles.actionLabel}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="book-outline" size={24} color={Colors.textTertiary} />
            <Text style={styles.actionLabel}>Lyrics</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="list-outline" size={24} color={Colors.textTertiary} />
            <Text style={styles.actionLabel}>Queue</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safe: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerLabel: {
    ...Typography.labelSmall,
    color: Colors.textSecondary,
    letterSpacing: 2,
  },
  headerHymn: {
    ...Typography.hymnNumber,
    color: Colors.accent,
    marginTop: 2,
  },
  iconBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Artwork
  artworkContainer: {
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  artwork: {
    width: ARTWORK_SIZE,
    height: ARTWORK_SIZE,
    borderRadius: Radius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.surfaceElevated,
  },

  // Track info
  trackInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  trackInfoLeft: {
    flex: 1,
  },
  trackTitle: {
    ...Typography.displaySmall,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  trackArtist: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
  },
  likeBtn: {
    padding: Spacing.sm,
    marginLeft: Spacing.sm,
  },

  // Progress
  progressSection: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  progressBarTrack: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: Radius.full,
    marginBottom: Spacing.sm,
    justifyContent: 'center',
  },
  progressBarFill: {
    height: 4,
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
    position: 'relative',
  },
  progressDot: {
    position: 'absolute',
    right: -6,
    top: -5,
    width: 14,
    height: 14,
    borderRadius: Radius.full,
    backgroundColor: Colors.textPrimary,
  },
  progressTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    ...Typography.labelSmall,
    color: Colors.textTertiary,
  },

  // Controls
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  controlSide: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  playBtn: {
    borderRadius: Radius.full,
  },
  playBtnGradient: {
    width: 72,
    height: 72,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  repeatOneDot: {
    position: 'absolute',
    bottom: 6,
    right: 10,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.accent,
  },

  // Bottom actions
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginHorizontal: Spacing.md,
  },
  actionBtn: {
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  actionLabel: {
    ...Typography.labelSmall,
    color: Colors.textTertiary,
  },
});
