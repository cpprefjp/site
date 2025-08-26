# unexpect_t
* expected[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  struct unexpect_t {
    explicit unexpect_t() = default;
  };

  inline constexpr unexpect_t unexpect{};
}
```

## 概要
`unexpected_t`は、[`expected`コンストラクタ](expected/op_constructor.md)において、エラー値型のコンストラクタ引数を受け取って構築するためのタグ型である。

`unexpected_t`型の定数`unexpect`が提供される。


## 例
```cpp example
#include <cassert>
#include <expected>
#include <system_error>

int main()
{
  std::expected<int, std::error_code> x{std::unexpect, ETIMEDOUT, std::system_category()};
  assert(not x.has_value());
  assert(x.error().value() == ETIMEDOUT);
  assert(x.error().category() == std::system_category());
}
```
* std::unexpect[color ff0000]
* ETIMEDOUT[link /reference/cerrno.md]

### 出力
```
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 12.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`expected`](expected.md)


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
