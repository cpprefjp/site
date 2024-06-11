# operator->
* memory[meta header]
* std[meta namespace]
* unique_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
pointer operator->() const noexcept;           // (1) C++11
constexpr pointer operator->() const noexcept; // (1) C++23
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


## 例
```cpp example
#include <iostream>
#include <memory>
#include <string>

int main()
{
  std::unique_ptr<std::string> p(new std::string("hello"));

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
- [GCC](/implementation.md#gcc): 4.4.7 [mark verified]
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]


## 参照
- [P2273R3 Making `std::unique_ptr` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2273r3.pdf)
