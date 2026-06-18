import 'package:diabetesassis/core/theme.dart';
import 'package:diabetesassis/modules/item/item_class.dart';
import 'package:flutter/material.dart';
import 'package:wolkarutils/wolkarutils.dart';

class ItemCard extends StatelessWidget {
  final Item item;
  final bool editable;
  final String? ingredientType;
  final dynamic onDelete;

  const ItemCard({
    super.key,
    required this.item,
    required this.onDelete,
    required this.editable,
    this.ingredientType,
  });
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      child: Container(
        width: MediaQuery.of(context).size.width * 0.95,
        height: 75,
        decoration: BoxDecoration(
          color: colorPallete.surfaceContainer,
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: colorPallete.outline),
        ),
        child: Padding(
          padding: EdgeInsets.all(5),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            spacing: 5,
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 10),
                child: Text(item.name).p(),
              ),
              Expanded(
                child: Column(
                  children: [
                    Expanded(
                      child: MenuIngredientDataChip(chipType: 'amount', number: item.amount),
                    ),
                    Expanded(
                      child: MenuIngredientDataChip(chipType: 'rations', number: item.servings),
                    ),
                  ],
                ),
              ),
              Visibility(
                visible: editable,
                child: Row(
                  children: [
                    IconButton(
                      onPressed: () {
                        onDelete();
                      },
                      icon: Icon(Icons.delete),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}


class MenuIngredientDataChip extends StatelessWidget {
  final String chipType;
  final double number;
  const MenuIngredientDataChip({
    super.key,
    required this.chipType,
    required this.number,
  });
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsetsDirectional.symmetric(vertical: 2),
      decoration: BoxDecoration(
        color: chipType == 'amount' ? Color(0xff1565C0) : Color(0xffEF6C00),
        border: Border.all(color: Colors.black),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Padding(
        padding: EdgeInsets.all(5),
        child: Row(
          spacing: 10,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              chipType == 'amount'
                  ? "Cantidad"
                  : "Raciones",
              style: TextStyle(
                fontFamily: 'Montserrat',
                fontWeight: FontWeight.w900,
                color: chipType == 'amount' ? Color(0xffBBDEFB) : Color(0xffFFE0B2),
              ),
            ),
            Text(
              number.toString(),
              style: TextStyle(
                fontFamily: 'Montserrat',
                fontWeight: FontWeight.w600,
                color: chipType == 'amount' ? Color(0xffBBDEFB) : Color(0xffFFE0B2),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
