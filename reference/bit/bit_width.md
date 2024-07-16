# bit_width
* bit[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr int bit_width(T x) noexcept;
}
```

## 概要
値を表現するために必要なビット幅を求める。


## テンプレートパラメータ制約
- 型`T`が符号なし整数型であること


## 戻り値
`x == 0`である場合、`0`を返す。そうでない場合、2を底として`x`の対数を求めて、それに1を足した値を返す。その際、小数点以下の値は破棄される。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <bit>

void convert_to_width(unsigned int x)
{
  std::cout << x << "\t : " << std::bit_width(x) << std::endl;
}

int main()
{
  std::cout << "129\t : " << std::bit_width(129u) << std::endl;
  convert_to_width(127u);
  convert_to_width(1u);
  convert_to_width(0u);

  std::cout << "---" << std::endl;
  for (unsigned int i = 1024u; i >= 2u; i /= 2) {
    convert_to_width(i);
  }
}
```
* std::bit_width[color ff0000]

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
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0556R3 Integral power-of-2 operations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0556r3.html)
- [P1956R1 On the names of low-level bit manipulation functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1956r1.pdf)
-- `std::log2p1`から`std::bit_width`に名称変更。変更前の関数名`log2p1`の`p1`は、1を足す (plus one) ことを示していた。
- [LWG Issue 3656. Inconsistent bit operations returning a count](https://wg21.cmeerw.net/lwg/issue3656)
    - 戻り値の型を`T`から`int`に変更
