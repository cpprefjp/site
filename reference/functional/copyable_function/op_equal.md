# operator==
* functional[meta header]
* std[meta namespace]
* copyable_function[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
friend bool operator==(const copyable_function& f, nullptr_t) noexcept; // (1)

// (1)により、以下のオーバーロードが使用可能になる
friend bool operator==(nullptr_t, const copyable_function& f) noexcept; // (2)
```

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
  std::copyable_function<int(int)> f;

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
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2548R6 copyable_function](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2548r6.pdf)
