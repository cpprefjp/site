# ispow2
* bit[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr bool ispow2(T x) noexcept;
}
```

## 概要
整数値が2の累乗かを判定する。


## 要件
以下の条件を満たさない場合、この関数はオーバーロード解決の候補から除外される

- 型`T`が符号なし整数型であること


## 戻り値
`x`が2の累乗値であれば`true`、そうでなければ`false`を返す。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <bit>

void check_pow2(unsigned int x)
{
  std::cout << x << "\t : " << std::ispow2(x) << std::endl;
}

int main()
{
  std::cout << std::boolalpha;

  if (std::ispow2(128u)) {
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
* std::ispow2[color ff0000]

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
- [Clang, C++20 mode](/implementation.md#clang):
- [GCC, C++20 mode](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0556R3 Integral power-of-2 operations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0556r3.html)
