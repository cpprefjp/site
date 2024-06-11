# get_deleter
* memory[meta header]
* std[meta namespace]
* unique_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
deleter_type& get_deleter() noexcept;           // (1) C++11
constexpr deleter_type& get_deleter() noexcept; // (1) C++23

const deleter_type& get_deleter() const noexcept;           // (2) C++11
constexpr const deleter_type& get_deleter() const noexcept; // (2) C++23
```

## 概要
デリータを取得する。


## 戻り値
保持しているデリータオブジェクトへの参照を返す。


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::unique_ptr<int> p(new int(3));

  // デリータを取得
  std::default_delete<int>& f = p.get_deleter();
}
```
* get_deleter()[color ff0000]
* std::default_delete[link /reference/memory/default_delete.md]

### 出力
```
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
