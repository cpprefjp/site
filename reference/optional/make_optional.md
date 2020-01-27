# make_optional
* optional[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr optional<see below> make_optional(T&& v);    // (1)

  template <class T, class... Args>
  constexpr optional<T> make_optional(Args&&... args);   // (2)

  template <class T, class U, class... Args>
  constexpr optional<T> make_optional(
                            std::initializer_list<U> il,
                            Args&&... args);             // (3)
}
```

## 概要
有効な値を保持する`optional`オブジェクトを構築する。

- (1) : 型`T`の値を受け取り、それを有効値として保持する`optional`オブジェクトを構築する
- (2) : 型`T`のコンストラクタ引数を受け取り、関数内で`T`オブジェクトを構築し、それを有効値として保持する`optional`オブジェクトを構築する
- (3) : 型`T`のコンストラクタ引数として初期化�リストと任意個の引数を受け取り、関数内で`T`オブジェクトを構築し、それを有効値として保持する`optional`オブジェクトを構築する


## 効果
- (1) : `return optional<`[`decay_t`](/reference/type_traits/decay.md)`<T>>(`[`std::forward`](/reference/utility/forward.md)`<T>(v))`
- (2) : `return optional<T>(`[`in_place`](/reference/utility/in_place_t.md)`,` [`std::forward`](/reference/utility/forward.md)`<Args>(args)...);` と�価の処理を行う
- (3) `return optional<T>(`[`in_place`](/reference/utility/in_place_t.md)`, il,` [`std::forward`](/reference/utility/forward.md)`<Args>(args)...);` と�価の処理を行う


## 例
```cpp example
#include <cassert>
#include <optional>
#include <type_traits>
#include <string>
#include <vector>

int main()
{
  // (1)
  {
    auto p = std::make_optional("Hello");
    static_assert(std::is_same_v<decltype(p), std::optional<const char*>>);
  }

  // (2)
  {
    auto p = std::make_optional<std::string>(3, 'A');

    assert(p.value() == "AAA");
    static_assert(std::is_same_v<decltype(p), std::optional<std::string>>);
  }

  // (3)
  {
    std::allocator<int> alloc;
    auto p = std::make_optional<std::vector<int>>({3, 1, 4}, alloc);

    assert(p.value()[0] == 3);
    assert(p.value()[1] == 1);
    assert(p.value()[2] == 4);
    static_assert(std::is_same_v<decltype(p), std::optional<std::vector<int>>>);
  }
}
```
* std::make_optional[color ff0000]
* p.value()[link optional/value.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1
- [GCC](/implementation.md#gcc): 7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
