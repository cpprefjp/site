# operator==
* functional[meta header]
* std[meta namespace]
* move_only_function[meta class]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
friend bool operator==(const move_only_function& f, nullptr_t) noexcept; // (1)

// (1)により、以下のオーバーロードが使用可能になる
friend bool operator==(nullptr_t, const move_only_function& f) noexcept; // (2)
```
* nullptr_t[link /reference/cstddef/nullptr_t.md]

## 概要
等値比較する。


## 戻り値
`!f`


## 例
```cpp example
#include <iostream>
#include <functional>

int ident(int x) { return x; }

int main()
{
  std::move_only_function<int(int)> f;

  if (f == nullptr) {
    std::cout << "empty" << std::endl;
  }

  f = ident;
  if (f == nullptr) {}
  else {
    std::cout << "not empty" << std::endl;
  }
}
```

### 出力
```
empty
not empty
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0288R9 move_only_function](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0288r9.html)
