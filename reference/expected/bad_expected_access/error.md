# error
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* bad_expected_access[meta class]
* cpp23[meta cpp]

```cpp
constexpr const E& error() const & noexcept;   // (1)
constexpr E& error() & noexcept;               // (2)
constexpr const E&& error() const && noexcept; // (3)
constexpr E&& error() && noexcept;             // (4)
```

## 概要
エラー値を取得する。


## 戻り値
動作説明用のメンバ変数として、エラー値を保持する`unex`を導入する。

- (1), (2) : `unex`
- (3), (4) : [`std::move`](/reference/utility/move.md)`(unex)`


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
  std::expected<int, std::string> v = std::unexpected{"ERR"};
  try {
    std::cout << v.value() << std::endl;
  } catch (const std::bad_expected_access<std::string>& ex) {
    std::cout << "throw:" << ex.error() << std::endl;
  }
}
```
* error()[color ff0000]
* value()[link ../expected/value.md]
* std::unexpected[link ../unexpected.md]
* std::bad_expected_access[link ../bad_expected_access.md]

### 出力
```
throw:ERR
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
- [P2549R1 `std::unexpected<E>` should have `error()` as member accessor](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2549r1.html)
