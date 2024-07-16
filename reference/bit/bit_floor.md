# bit_floor
* bit[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr T bit_floor(T x) noexcept;
}
```

## 概要
整数値を2の累乗値に切り下げる。


## テンプレートパラメータ制約
- 型`T`が符号なし整数型であること


## 戻り値
`x == 0`である場合、`0`を返す。そうでない場合、[`has_single_bit`](has_single_bit.md)`(y) == true`および`y  <= x`となるような最大の`y`を求めて返す。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <bit>

void convert_to_pow2(unsigned int x)
{
  std::cout << x << "\t : " << std::bit_floor(x) << std::endl;
}

int main()
{
  std::cout << "129\t : " << std::bit_floor(129u) << std::endl;

  for (unsigned int i = 0u; i <= 34u; ++i) {
    convert_to_pow2(i);
  }
}
```
* std::bit_floor[color ff0000]

### 出力
```
129	 : 128
0	 : 0
1	 : 1
2	 : 2
3	 : 2
4	 : 4
5	 : 4
6	 : 4
7	 : 4
8	 : 8
9	 : 8
10	 : 8
11	 : 8
12	 : 8
13	 : 8
14	 : 8
15	 : 8
16	 : 16
17	 : 16
18	 : 16
19	 : 16
20	 : 16
21	 : 16
22	 : 16
23	 : 16
24	 : 16
25	 : 16
26	 : 16
27	 : 16
28	 : 16
29	 : 16
30	 : 16
31	 : 16
32	 : 32
33	 : 32
34	 : 32
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
-- `std::floor2`から`std::bit_floor`に名称変更
