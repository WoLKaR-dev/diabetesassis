import 'package:flutter/material.dart';

/// Main app theme color
ColorScheme colorPallete = ColorScheme.fromSeed(seedColor: Colors.amber);

/// Returns the main app theme
ThemeData appTheme() {
  return ThemeData(
    //SECTION Font family
    fontFamily: "Outfit",

    //SECTION Color scheme
    colorScheme: colorPallete,

    //SECTION AppBar
    appBarTheme: AppBarTheme(
      backgroundColor: colorPallete.primaryFixed,
      foregroundColor: colorPallete.onPrimaryFixed,
      centerTitle: true,
    ),

    //SECTION Drawer
    navigationDrawerTheme: NavigationDrawerThemeData(
      backgroundColor: colorPallete.surfaceContainer,
      indicatorColor: colorPallete.primaryContainer,
    ),
  );
}
