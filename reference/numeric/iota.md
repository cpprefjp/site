#iota
* numeric[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std{
  template <class ForwardIterator, class T>
  void iota(ForwardIterator first, ForwardIterator last, T value);
}
```

##概要
指定された値から始まる整数列を生成する。

`iota()`関数は、値の範囲`[value, value + (last - first))`を前から順番に範囲`[first, last)`の各要素に代入する。

これは、連続した値のシーケンスが必要な場合に使用する。


##効果
範囲`[first, last)`の各要素`it`について、先頭から順番に `*it = value; ++value;` を行う


##戻り値
なし


##計算量
範囲`[first, last)`の要素数をnとして、n回のインクリメントと代入が行われる。


##備考
この関数は、APL言語の「原始関数ι（イオタ）」に由来する。


##例
```cpp
#include <numeric>
#include <iostream>
#include <array>

int main()
{
  // 0から始まる10要素のシーケンスを作成する。
  // iota()関数に与えるシーケンスの要素数分だけ値が生成されるため、
  // 可変長のコンテナを与える場合には、事前に必要な要素数に
  // リサイズしておく必要がある
  std::array<int, 10> ar;
  std::iota(ar.begin(), ar.end(), 0);

  for (int x : ar) {
    std::cout << x << std::endl;
  }
}
```
* std::iota[color ff0000]
* std::array[link /reference/array.md]
* begin()[link /reference/array/begin.md]
* end()[link /reference/array/end.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

###出力
```
0
1
2
3
4
5
6
7
8
9
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.5
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 9.0

##参照
- [N2569 More STL algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2569.pdf)
- [N2666 More STL algorithms (revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2666.pdf)

