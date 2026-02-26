# error
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* expected.void[meta class]
* cpp23[meta cpp]

```cpp
// expected<cv void, E>部分特殊化
constexpr const E& error() const & noexcept;   // (1)
constexpr E& error() & noexcept;               // (2)
constexpr const E&& error() const && noexcept; // (3)
constexpr E&& error() && noexcept;             // (4)
```

## 概要
エラー値を取得する。


## 堅牢化された事前条件
[`has_value()`](has_value.md) `== false`


## 戻り値
動作説明用のメンバ変数として、エラー値を保持する`unex`を導入する。

- (1), (2) : エラー値を保持していたら、`unex`
- (3), (4) : エラー値を保持していたら、[`std::move`](/reference/utility/move.md)`(unex)`


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <expected>
#include <iostream>
#include <string>

int main()
{
  std::expected<void, std::string> x = std::unexpected{"ERR"};
  assert(not x.has_value());
  std::cout << x.error() << std::endl;
}
```
* error()[color ff0000]
* has_value()[link has_value.md]
* std::unexpected[link ../unexpected.md]

### 出力
```
ERR
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
- [`error_or`](error_or.md)


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
- [P3471R4 Standard library hardening](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3471r4.html)
- [P3878R1 Standard library hardening should not use the 'observe' semantic](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3878r1.html)
