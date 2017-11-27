# shrink_to_fit
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void shrink_to_fit();
```

## 概要
領域をコンテナのサイズまで切り詰める


## 要件
- C++14 : 型`T`が`*this`に対してムーブ挿入可能であること


## 効果
- [`capacity()`](capacity.md)を[`size()`](size.md)に縮小させるというリクエストを行う。
    - 実装依存の最適化を許可するために、縮小するという動作は仕様上強制されない。
- C++17 : この関数によって[`capacity()`](capacity.md)が増えることはない。
- C++17 : [`capacity()`](capacity.md)の縮小が起こる際に、メモリの再割り当てが発生する場合がある。その際、コンテナの要素に対する参照、ポインタ、およびイテレータとそれが指す要素への参照は無効となる。
- C++14 : 非コピー挿入可能な型`T`のムーブコンストラクタが例外を送出した場合、この関数は何もしない。


## 戻り値
なし


## 計算量
- C++14 : 最大で、要素数に対して線形時間


## 例
```cpp example
#include <iostream>
#include <vector>
#include <cassert>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::cout << v.capacity() << std::endl;

  // 要素削除 : capacityは減らない
  v.erase(v.begin());
  std::cout << v.capacity() << std::endl;

  // 領域を切り詰める
  v.shrink_to_fit();
  std::cout << v.capacity() << std::endl;
  assert(v.capacity() == v.size());
}
```
* shrink_to_fit()[color ff0000]
* v.capacity()[link capacity.md]

### 出力
```
3
3
2
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0


## 参照
- 『[Effective STL - STLを効果的に使いこなす50の鉄則](https://www.amazon.co.jp/dp/4894714108)』 第17項 余分な容量を取り除くには「swap技法」を使おう
- [LWG Issue 755. `std::vector` and `std:string` lack explicit shrink-to-fit operations](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#755)
- [LWG Issue 2033. Preconditions of `reserve`, `shrink_to_fit`, and `resize` functions](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2033)
- [LWG Issue 2223. `shrink_to_fit` effect on iterator validity](https://wg21.cmeerw.net/lwg/issue2223)
