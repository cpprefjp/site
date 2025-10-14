# operator->
* memory[meta header]
* std[meta namespace]
* shared_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
// 非配列版のみ
T*
  operator->() const noexcept; // (1) C++11
constexpr T*
  operator->() const noexcept; // (1) C++26
```

## 概要
ポインタを通してオブジェクトにアクセスする。


## 要件

```cpp
get() != nullptr
```
* get()[link get.md]


## 戻り値
[`get()`](get.md)


## 備考
型`T`が配列である場合、この関数が宣言されるかは未規定。定義される場合、その戻り値は未規定


## 例
```cpp example
#include <iostream>
#include <memory>
#include <string>

int main()
{
  std::shared_ptr<std::string> p(new std::string("hello"));

  std::cout << p->c_str() << std::endl;
}
```

### 出力
```
hello
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