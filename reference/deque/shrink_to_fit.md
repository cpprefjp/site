#shrink_to_fit (C++11)
```cpp
void shrink_to_fit();
```

##概要
領域をコンテナのサイズまで切り詰める


##戻り値
なし


##備考
確保した領域を[`size`](./size.md)()に縮小させるというリクエストを行う。
実装依存の最適化を許可するために、縮小するという動作は仕様上強制されない。


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0


##参照
『[Effective STL - STLを効果的に使いこなす50の鉄則](http://www.amazon.co.jp/dp/4894714108)』 第17項 余分な容量を取り除くには「swap技法」を使おう


##参照
| | |
|---------------------------------------------------------------------------------------------|--------------------------|
| [`size`](./size.md) | 要素数を取得する |


