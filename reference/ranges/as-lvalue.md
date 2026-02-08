# as-lvalue
* [meta exposition-only]
* ranges[meta header]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<class T>
  constexpr T& as-lvalue(T&& t) {
    return static_cast<T&>(t);
  }
}
```

## 概要

`as-lvalue` は、rvalueをlvalueへキャストする説明専用の関数である。

## バージョン
### 言語
- C++23

## 参照
- [N4950 26 Ranges library](https://timsong-cpp.github.io/cppwp/n4950/ranges)
