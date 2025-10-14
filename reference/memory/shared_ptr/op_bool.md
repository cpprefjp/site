# operator bool
* memory[meta header]
* std[meta namespace]
* shared_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit
  operator bool() const noexcept; // (1) C++11
constexpr explicit
  operator bool() const noexcept; // (1) C++26
```

## 概要
有効なリソースを所有しているかを判定する。


## 戻り値

```cpp
get() != nullptr
```
* get()[link get.md]


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> p(new int(3));

  if (p) {
    std::cout << "p has resource" << std::endl;
  }
  else {
    std::cout << "p doesn't have resource" << std::endl;
  }
}
```

### 出力
```
p has resource
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.4.7 [mark verified]
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2008 (TR1) [mark verified], 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]
	- 2012までは、コンパイラが`explicit operator bool`に対応していないため、不透明な型へのポインタ型への変換演算子関数として実装されている。


## 参照
- [N2435 Explicit bool for Smart Pointers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2435.htm)
- [P3037R6 `constexpr std::shared_ptr` and friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3037r6.pdf)