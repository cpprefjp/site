# log2p1
* bit[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr T log2p1(T x) noexcept;
}
```

## 概要
2を底とした整数値の対数を求める。

この関数は、`x`が2の何乗かを調べるために使用できる。


## 要件
以下の条件を満たさない場合、この関数はオーバーロード解決の候補から除外される

- 型`T`が符号なし整数型であること


## 戻り値
`x == 0`である場合、`0`を返す。そうでない場合、2を底として`x`の対数を求めて、それに1を足した値を返す。その際、小数点以下の値は破棄される。

※1を足す理由は、対数を求められない`0`を引数として許容し、かつ`x == 1`である場合と区別するためである。関数名`log2p1`の`p1`は1を足すことを示している。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <bit>

void convert_to_log2(unsigned int x)
{
  std::cout << x << "\t : " << std::log2p1(x) << std::endl;
}

int main()
{
  std::cout << "129\t : " << std::log2p1(129u) << std::endl;
  convert_to_log2(127u);
  convert_to_log2(1u);
  convert_to_log2(0u);

  std::cout << "---" << std::endl;
  for (unsigned int i = 1024u; i >= 2u; i /= 2) {
    convert_to_log2(i);
  }
}
```
* std::floor2[color ff0000]

### 出力
```
129	 : 8
127	 : 7
1	 : 1
0	 : 0
---
1024	 : 11
512	 : 10
256	 : 9
128	 : 8
64	 : 7
32	 : 6
16	 : 5
8	 : 4
4	 : 3
2	 : 2
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang, C++20 mode](/implementation.md#clang):
- [GCC, C++20 mode](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0556R3 Integral power-of-2 operations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0556r3.html)
