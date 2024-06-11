# has_single_bit
* bit[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr bool has_single_bit(T x) noexcept;
}
```

## 概要
1ビットだけ立っている値をもっているか判定する。

符号なし整数値にこの関数を適用することで、整数値が2の累乗かを判定することができる。


## テンプレートパラメータ制約
- 型`T`が符号なし整数型であること


## 戻り値
`x`の値が1ビットだけ立っていれば`true`、そうでなければ`false`を返す。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <bit>

void check_pow2(unsigned int x)
{
  std::cout << x << "\t : " << std::has_single_bit(x) << std::endl;
}

int main()
{
  std::cout << std::boolalpha;

  if (std::has_single_bit(128u)) {
    std::cout << "128 is power of 2" << std::endl;
  }
  check_pow2(0u);
  check_pow2(3u);
  check_pow2(0xffu);

  std::cout << "---" << std::endl;

  check_pow2(1u);
  for (unsigned int i = 2u; i <= 1024u; i *= 2) {
    check_pow2(i);
  }
}
```
* std::has_single_bit[color ff0000]

### 出力
```
128 is power of 2
0	 : false
3	 : false
255	 : false
---
1	 : true
2	 : true
4	 : true
8	 : true
16	 : true
32	 : true
64	 : true
128	 : true
256	 : true
512	 : true
1024	 : true
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
-- `std::ispow2`から`std::has_single_bit`に名称変更
