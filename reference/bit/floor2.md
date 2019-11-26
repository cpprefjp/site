# floor2
* bit[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr T floor2(T x) noexcept;
}
```

## 概要
整数値を2の累乗値に切り下げる。


## テンプレートパラメータ制約
- 型`T`が符号なし整数型であること


## 戻り値
`x == 0`である場合、`0`を返す。そうでない場合、[`ispow2`](ispow2.md)`(y) == true`および`y  <= x`となるような最大の`y`を求めて返す。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <bit>

void convert_to_pow2(unsigned int x)
{
  std::cout << x << "\t : " << std::floor2(x) << std::endl;
}

int main()
{
  std::cout << "129\t : " << std::floor2(129u) << std::endl;

  for (unsigned int i = 0u; i <= 34u; ++i) {
    convert_to_pow2(i);
  }
}
```
* std::floor2[color ff0000]

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
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0556R3 Integral power-of-2 operations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0556r3.html)
