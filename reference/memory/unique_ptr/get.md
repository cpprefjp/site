# get
* memory[meta header]
* std[meta namespace]
* unique_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
pointer get() const noexcept;           // (1) C++11
constexpr pointer get() const noexcept; // (1) C++23
```

## 概要
リソースを取得する。


## 戻り値
保持しているポインタを返す。


## 備考
リソースの所有権は`*this`が持っているので、この関数によって返されたポインタに対して、リソース解放をしてはならない。


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::unique_ptr<int> p(new int(3));

  // リソースを取得
  int* raw_pointer = p.get();
  std::cout << *raw_pointer << std::endl;
}
```
* get()[color ff0000]

### 出力
```
3
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
