# emplace
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* expected.void[meta class]
* cpp23[meta cpp]

```cpp
// expected<cv void, E>部分特殊化
constexpr void emplace() noexcept;
```

## 概要
正常値を保持する。


## 効果
正常値を保持していたら、何もしない。
エラー値を保持していたら、エラー値を破棄して正常値を保持する。


## 例
```cpp example
#include <cassert>
#include <expected>

int main()
{
  std::expected<void, int> x = std::unexpected{42};
  x.emplace();
  assert(x.has_value());
}
```
* emplace[color ff0000]
* has_value()[link has_value.md]
* std::unexpected[link ../unexpected.md]

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


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
