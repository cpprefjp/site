# swap
* memory[meta header]
* std[meta namespace]
* shared_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void
  swap(shared_ptr& x) noexcept; // (1) C++11
constexpr void
  swap(shared_ptr& x) noexcept; // (1) C++26
```

## 概要
他の`shared_ptr`オブジェクトとデータを入れ替える。


## 効果
`*this`と`x`のデータを入れ替える。


## 戻り値
なし


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> a(new int(3));
  std::shared_ptr<int> b(new int(1));

  std::cout << a << std::endl;
  std::cout << b << std::endl;

  // aとbを入れ替える
  a.swap(b);

  std::cout << a << std::endl;
  std::cout << b << std::endl;
}
```
* swap[color ff0000]

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
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2008 (TR1) [mark verified], 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]


## 参照
- [P3037R6 `constexpr std::shared_ptr` and friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3037r6.pdf)