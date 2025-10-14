# get
* memory[meta header]
* std[meta namespace]
* shared_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
T*
  get() const noexcept; // (1) C++11
element_type*
  get() const noexcept; // (1) C++17
constexpr element_type*
  get() const noexcept; // (1) C++26
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
  std::shared_ptr<int> p(new int(3));

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
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2008 (TR1) [mark verified], 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]


## 参照
- [P0414R1 Merging `shared_ptr` changes from Library Fundamentals to C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0414r1.html)
- [P3037R6 `constexpr std::shared_ptr` and friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3037r6.pdf)