# 推論補助
* tuple[meta header]
* std[meta namespace]
* tuple[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class... UTypes>
  tuple(UTypes...) -> tuple<UTypes...>;           // (1)

  template <class T1, class T2>
  tuple(pair<T1, T2>) -> tuple<T1, T2>;           // (2)

  template <class Alloc, class... UTypes>
  tuple(allocator_arg_t, Alloc, UTypes...)
    -> tuple<UTypes...>;                          // (3)

  template <class Alloc, class T1, class T2>
  tuple(allocator_arg_t, Alloc, pair<T1, T2>)
    -> tuple<T1, T2>;                             // (4)

  template <class Alloc, class... UTypes>
  tuple(allocator_arg_t, Alloc, tuple<UTypes...>)
    -> tuple<UTypes...>;                          // (5)
}
```
* pair[link /reference/utility/pair.md]
* allocator_arg_t[link /reference/memory/allocator_arg_t.md]

## 概要
`std::tuple`クラステンプレートの型推論補助。

- (1) : 任意の型のオブジェクトを任意個受け取る場合の推論補助
- (2) : [`std::pair`](/reference/utility/pair.md)を受け取る場合の推論補助
- (3) : ア�ケータ付きで、任意の型のオブジェクトを任意個受け取る場合の推論補助
- (4) : ア�ケータ付きで、[`std::pair`](/reference/utility/pair.md)を受け取る場合の推論補助
- (5) : ア�ケータ付きで、`std::tuple`を受け取る場合の推論補助


## 備考
- (1) : パラメータの型が`const UTypes&...`や`UTypes&&...`ではなくコピーで受け取るようにしているため、[配列からポインタへの変換、関数から関数ポインタへの変換](/reference/type_traits/decay.md)が起こる
- (1) : [`std::make_tuple()`](/reference/tuple/make_tuple.md)関数と違って、[`std::reference_wrapper`](/reference/functional/reference_wrapper.md)`<T>`を`T&`に展開はしない


## 例
```cpp example
#include <tuple>
#include <type_traits>

int main()
{
  // (1)
  // 任意個のオブジェクトからのタプルの構築
  std::tuple t1 {3, "Hello", 1.23};
  static_assert(std::is_same_v<
    decltype(t1),
    std::tuple<int, const char*, double>
  >);

  // (2)
  // 組からのタプルの構築
  std::tuple t2 = std::pair{3, "Hello"};
  static_assert(std::is_same_v<
    decltype(t2),
    std::tuple<int, const char*>
  >);
}
```

### 出力
```
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 7.1.0
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)


## 参照
- [P0433R2 Toward a resolution of US7 and US14: Integrating template deduction for class templates into the standard library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0433r2.html)

