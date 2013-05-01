#shrink_to_fit
```cpp
void shrink_to_fit();
```

##概要

<b>領域をコンテナのサイズまで切り詰める</b>


##戻り値
なし


##備考
確保した領域を[`size`](/reference/deque/size.md)()に縮小させるというリクエストを行う。

実装依存の最適化を許可するために、縮小するという動作は仕様上強制されない。


##バージョン

###言語

- C++11

###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照
『[Effective STL - STLを効果的に使いこなす50の鉄則](http://www.amazon.co.jp/dp/4894714108)』 第17項 余分な容量を取り除くには「swap技法」を使おう


##参照

| | |
|---------------------------------------------------------------------------------------------|--------------------------|
| [`size`](/reference/deque/size.md) | 要素数を取得する |


