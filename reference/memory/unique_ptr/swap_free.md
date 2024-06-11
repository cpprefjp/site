# swap (非メンバ関数)
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, class D>
  void swap(unique_ptr<T, D>& a, unique_ptr<T, D>& b) noexcept; // (1) C++11

  template <class T, class D>
  constexpr void swap(unique_ptr<T, D>& a, unique_ptr<T, D>& b) noexcept; // (1) C++23
}
```

## 概要
2つの`unique_ptr`オブジェクトを入れ替える。


## 効果
`a.`[`swap`](swap.md)`(b);`


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::unique_ptr<int> a(new int(3));
  std::unique_ptr<int> b(new int(1));

  std::cout << a << std::endl;
  std::cout << b << std::endl;

  // aとbを入れ替える
  std::swap(a, b);

  std::cout << a << std::endl;
  std::cout << b << std::endl;
}
```
* std::swap[color ff0000]

### 出力例
```
0x14ab010
0x14ab060
0x14ab060
0x14ab010
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.4.7 [mark verified]
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]


## 参照
- [P2273R3 Making `std::unique_ptr` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2273r3.pdf)
