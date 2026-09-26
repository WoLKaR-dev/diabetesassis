import 'package:diabetesassis/core/theme.dart';
import 'package:flutter/material.dart';
import 'package:wolkarutils/wolkarutils.dart';

/// Big home card that acts as main action
class BigHomeCard extends StatelessWidget {
  const BigHomeCard({super.key, required this.asset, required this.text, this.onTap});
  final String asset;
  final String text;
  final Function()? onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: SizedBox.square(
        dimension: switch (WolkarUtils.instance.screenSize) {
          ScreenSize.small => MediaQuery.sizeOf(context).width,
          ScreenSize.regular => MediaQuery.sizeOf(context).width * 0.9,
          ScreenSize.large => 300,
          ScreenSize.xlarge => 375,
          ScreenSize.xxlarge => 500,
        },
        child: Container(
          padding: EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: colorPallete.surfaceContainer,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: colorPallete.outline),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.only(bottom: 10),
                  child: ClipRRect(
                    borderRadius: BorderRadiusGeometry.circular(10),
                    child: Image.asset(asset, fit: BoxFit.cover),
                  ),
                ),
              ),
              Text(text).h5(),
            ],
          ),
        ),
      ),
    );
  }
}

/// Big home card that acts as secondary action
class SmallHomeCard extends StatelessWidget {
  const SmallHomeCard({super.key, required this.asset, required this.text, this.onTap});

  final String asset;
  final String text;
  final Function()? onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: SizedBox(
        width: switch (WolkarUtils.instance.screenSize) {
          ScreenSize.small => MediaQuery.sizeOf(context).width,
          ScreenSize.regular => MediaQuery.sizeOf(context).width * 0.9,
          ScreenSize.large => 300,
          ScreenSize.xlarge => 375,
          ScreenSize.xxlarge => 500,
        },
        child: Container(
          padding: EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: colorPallete.surfaceContainer,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: colorPallete.outline),
          ),
          child: Row(
            spacing: 10,
            children: [
              Expanded(
                flex: 1,
                child: AspectRatio(
                  aspectRatio: 1,
                  child: ClipRRect(
                    borderRadius: BorderRadiusGeometry.circular(10),
                    child: Image.asset(asset, fit: BoxFit.cover),
                  ),
                ),
              ),
              Expanded(flex: 2, child: Text(text).h6()),
            ],
          ),
        ),
      ),
    );
  }
}
