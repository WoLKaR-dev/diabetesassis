import 'package:diabetesassis/core/theme.dart';
import 'package:diabetesassis/modules/data/data_data.dart';
import 'package:flutter/material.dart';
import 'package:wolkarutils/wolkarutils.dart';

class DataPage extends StatelessWidget {
  const DataPage({super.key});
  @override
  Widget build(BuildContext context) {
    //ATOMS Main page header
    /// Main page header with info
    final headerModule = [
      Text("Datos").h1(),
      Text(
        "Se presentan aquí algunos datos básicos sobre la cantidad del ingrediente que representa una ración. ",
      ).p(),
      Divider().percentage(50),
    ];

    //ATOMS Main data table
    /// Main data table that shows data of [dataData]
    final dataTable = [
      Legible(
        child: Table(
          children: [
            TableRow(
              decoration: BoxDecoration(
                color: colorPallete.primaryContainer,
                border: Border.all(color: colorPallete.outline),
              ),
              children: [
                Center(child: Text("Ingrediente").p(bold: true)),
                Center(child: Text("Cantidad").p(bold: true)),
              ],
            ),
            ...dataData.entries.map(
              (entry) => TableRow(
                decoration: BoxDecoration(
                  color: colorPallete.surfaceContainerLow,
                  border: Border.all(color: colorPallete.outline),
                ),
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 10),
                    child: Text(entry.key).p(),
                  ),
                  Center(child: Text(entry.value.toString()).p()),
                ],
              ),
            ),
          ],
        ),
      ),
    ];

    //LAYOUT Main page design
    /// Main design of the page
    final page = Background(
      padding: EdgeInsets.all(15),
      child: Scroll(spacing: 15, children: [...headerModule, ...dataTable]),
    );

    //WRAPPER Main structure
    return Scaffold(body: page);
  }
}
