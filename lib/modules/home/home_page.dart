import 'package:diabetesassis/modules/home/home_styles.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:wolkarutils/wolkarutils.dart';

/// Home page, designed to welcome user
class HomePage extends StatefulWidget {
  const HomePage({super.key, required this.travelTo});
  final Function(int) travelTo;
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    //ATOMS Welcome header
    /// Main welcome header
    final headerModule = [Text("Bienvenido de vuelta.").h1()];

    //ATOMS Home cards
    /// Main home cards
    final cardsModule = [
      Column(
        spacing: 10,
        children: [
          BigHomeCard(
            onTap: () {
              widget.travelTo(1);
            },
            asset: "assets/images/calculator.webp",
            text: "Comienza a calcular tus raciones ya mismo. ",
          ),
          SmallHomeCard(
            onTap: () {
              widget.travelTo(2);
            },
            asset: "assets/images/menu.webp",
            text: "Crea menús con diferentes cálculos",
          ),
          SmallHomeCard(
            onTap: () {
              widget.travelTo(3);
            },
            asset: "assets/images/data.webp",
            text: "Echa un vistazo a los datos públicos",
          ),
          SmallHomeCard(
            onTap: () async {
              final url = Uri.parse(
                "https://play.google.com/store/apps/details?id=com.wolkardev.diabetesassis&pli=1",
              );
              if (await canLaunchUrl(url)) {
                await launchUrl(url);
              }
            },
            asset: "assets/images/diazen.webp",
            text: "Instala Diazen, la evolución de diabetesassis",
          ),
        ],
      ),
    ];

    //LAYOUT Main page design
    /// Main page
    final page = Background(
      padding: EdgeInsets.all(15),
      child: Scroll(spacing: 15, children: [...headerModule, ...cardsModule]),
    );

    //WRAPPER Main Structure
    return Scaffold(body: page);
  }
}
