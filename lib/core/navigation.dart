import 'package:diabetesassis/core/theme.dart';
import 'package:diabetesassis/modules/calculator/calculator_page.dart';
import 'package:diabetesassis/modules/data/data_page.dart';
import 'package:diabetesassis/modules/home/home_page.dart';
import 'package:diabetesassis/modules/menu/menu_page.dart';
import 'package:flutter/material.dart';
import 'package:wolkarutils/wolkarutils.dart';

/// Main navigation page.
class NavigationPage extends StatefulWidget {
  const NavigationPage({super.key});
  @override
  State<NavigationPage> createState() => _NavigationPageState();
}

class _NavigationPageState extends State<NavigationPage> {
  //STATE Selected index
  int selectedIndex = 0;

  /// Appbar names
  List<String> appBarNames = ["Inicio", "Calculadora", "Menú", "Datos"];

  //LOGIC Updates page index (for external pages)
  void updateIndex(int newIndex) {
    setState(() {
      selectedIndex = newIndex;
    });
  }

  @override
  Widget build(BuildContext context) {
    //ATOMS Drawer pages
    /// Drawer pages
    List<Widget> drawerPages = [
      HomePage(travelTo: updateIndex),
      CalculatorPage(),
      MenuPage(),
      DataPage(),
    ];

    //ATOMS Appbar
    /// Main navigation page bar
    final appbar = AppBar(
      title: Text(appBarNames[selectedIndex]),
      actions: [
        IconButton(
          onPressed: () {
            showDialog(
              context: context,
              builder: (context) => AlertDialog(
                title: Text("Compartir Diabetesassis"),
                content: Image.asset("assets/images/qrCode.webp"),
                actions: [
                  ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: colorPallete.secondary,
                      foregroundColor: colorPallete.onSecondary,
                    ),
                    onPressed: () {
                      Navigator.pop(context);
                    },
                    label: Text("Close"),
                    icon: Icon(Icons.close),
                  ),
                ],
              ).constrained(context),
            );
          },
          icon: Icon(Icons.qr_code),
        ),
      ],
    );

    //ATOMS Page
    final page = drawerPages[selectedIndex];

    //ATOMS Drawer
    final drawer = NavigationDrawer(
      selectedIndex: selectedIndex,
      children: [
        DrawerHeader(
          decoration: BoxDecoration(color: colorPallete.primaryFixed),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [Icon(Icons.flatware_rounded, size: 70), Text("Herramientas").h4()],
          ),
        ),
        NavigationDrawerDestination(
          icon: Icon(selectedIndex == 0 ? Icons.home : Icons.home_outlined),
          label: Text("Inicio").p(),
        ),
        NavigationDrawerDestination(
          icon: Icon(selectedIndex == 1 ? Icons.calculate : Icons.calculate_outlined),
          label: Text("Calculadora").p(),
        ),
        NavigationDrawerDestination(
          icon: Icon(selectedIndex == 2 ? Icons.table_chart : Icons.table_chart_outlined),
          label: Text("Menú").p(),
        ),
        NavigationDrawerDestination(icon: Icon(Icons.data_usage_rounded), label: Text("Datos").p()),
      ],
      onDestinationSelected: (value) {
        setState(() {
          selectedIndex = value;
        });
        Navigator.pop(context);
      },
    );

    //WRAPPER Main structure
    return Scaffold(drawer: drawer, appBar: appbar, body: page);
  }
}
