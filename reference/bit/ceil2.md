# ceil2
* bit[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr T ceil2(T x) noexcept;
}
```

## 概要
整数値を2の累乗値に切り上げる。


## 要件
以下の条件を満たさない場合、この関数はオーバーロード解決の候補から除外される

- 型`T`が符号なし整数型であること


## 戻り値
[`ispow2`](ispow2.md)`(y) == true`および`y  >= x`となるような最小の`y`を求めて返す。

`y`が型`T`の値として表現できない場合、戻り値は未規定の値となる。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <bit>

void convert_to_pow2(unsigned int x)
{
  std::cout << x << "\t : " << std::ceil2(x) << std::endl;
}

int main()
{
  std::cout << "127\t : " << std::ceil2(127u) << std::endl;

  for (unsigned int i = 0u; i <= 32u; ++i) {
    convert_to_pow2(i);
  }
}
```
* std::ceil2[color ff0000]

### 出力
```
127	 : 128
0	 : 1
1	 : 1
2	 : 2
3	 : 4
4	 : 4
5	 : 8
6	 : 8
7	 : 8
8	 : 8
9	 : 16
10	 : 16
11	 : 16
12	 : 16
13	 : 16
14	 : 16
15	 : 16
16	 : 16
17	 : 32
18	 : 32
19	 : 32
20	 : 32
21	 : 32
22	 : 32
23	 : 32
24	 : 32
25	 : 32
26	 : 32
27	 : 32
28	 : 32
29	 : 32
30	 : 32
31	 : 32
32	 : 32
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
