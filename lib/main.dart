// Run main app
import 'package:diabetesassis/core/navigation.dart';
import 'package:diabetesassis/core/theme.dart';
import 'package:flutter/material.dart';
import 'package:wolkarutils/wolkarutils.dart';

void main() {
  runApp(MainApp());
}

/// Defines base material app
class MainApp extends StatelessWidget {
  const MainApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Diabetesassis",
      debugShowCheckedModeBanner: false,
      theme: appTheme(),
      home: MainAppPage(),
    );
  }
}

/// Defines the main app page initialization
class MainAppPage extends StatefulWidget {
  const MainAppPage({super.key});
  @override
  State<MainAppPage> createState() => _MainAppPageState();
}

class _MainAppPageState extends State<MainAppPage> {
  // awaits to save init function
  late Future<void> _init;

  @override
  void initState() {
    super.initState();
    _init = initApp();
  }

  // define init function
  Future<void> initApp() async {
    // await a little bit
    await Future.delayed(Duration.zero);

    // initialize utils
    if (!mounted) return;
    WolkarUtils.instance.initWolkarUtils(context);
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: _init,
      builder: ((context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
          // init main page
          return NavigationPage();
        } else {
          return Scaffold(body: Center(child: CircularProgressIndicator()));
        }
      }),
    );
  }
}
