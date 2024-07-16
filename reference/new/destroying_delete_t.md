# destroying_delete_t
* new[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  struct destroying_delete_t {
    explicit destroying_delete_t() = default;
  };

  inline constexpr destroying_delete_t destroying_delete{};
}
```

## 概要

C++20にて追加された[*destroying operator delete*](/lang/cpp20/efficient_sized_delete_for_variable_sized_classes.md)を定義するためのタグ型。クラススコープ`operator delete`オーバーロード定義時にこの型を第二引数に取るように定義する。

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 16 [mark verified]
- [GCC](/implementation.md#gcc): 9 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 7 [mark verified]

## 関連項目
- [C++20 可変長データを扱うクラスの効率的な`delete`](/lang/cpp20/efficient_sized_delete_for_variable_sized_classes.md)

## 参照
- [P0722R3 Efficient sized delete for variable sized classes](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0722r3.html)
