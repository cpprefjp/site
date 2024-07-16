# bit_ceil
* bit[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr T bit_ceil(T x);
}
```

## 概要
整数値を2の累乗値に切り上げる。


## テンプレートパラメータ制約
- 型`T`が符号なし整数型であること


## 事前条件
- `x`以上となる最小の2の累乗値を`N`として、型`T`において値`N`が表現できること

## 戻り値
`N`を返す


## 例外
投げない


## 定数式に評価される条件
- 事前条件を満たすこと


## 備考
- 値`x`を累乗値に切り上げた値が型`T`の範囲内で表現できない場合、未定義動作となり、定数式にはならない


## 例
```cpp example
#include <iostream>
#include <bit>

void convert_to_pow2(unsigned int x)
{
  std::cout << x << "\t : " << std::bit_ceil(x) << std::endl;
}

int main()
{
  std::cout << "127\t : " << std::bit_ceil(127u) << std::endl;

  for (unsigned int i = 0u; i <= 32u; ++i) {
    convert_to_pow2(i);
  }
}
```
* std::bit_ceil[color ff0000]

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
- [Clang](/implementation.md#clang): 9.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0556R3 Integral power-of-2 operations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0556r3.html)
- [P1355R2 Exposing a narrow contract for `ceil2`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1355r2.html)
- [P1956R1 On the names of low-level bit manipulation functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1956r1.pdf)
-- `std::ceil2`から`std::bit_ceil`に名称変更
