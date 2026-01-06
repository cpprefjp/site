# value
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* expected[meta class]
* cpp23[meta cpp]

```cpp
constexpr const T& value() const &;   // (1)
constexpr T& value() &;               // (2)
constexpr const T&& value() const &&; // (3)
constexpr T&& value() &&;             // (4)
```

## 概要
正常値を取得する。


## 戻り値
動作説明用のメンバ変数として、正常値を保持する`val`を導入する。

- (1), (2) : 正常値を保持していたら、`val`
- (3), (4) : 正常値を保持していたら、[`std::move`](/reference/utility/move.md)`(val)`


## 例外
- (1), (2) : エラー値を保持していたら、例外[`bad_expected_access`](../bad_expected_access.md)`(`[`error()`](error.md)`)`を送出する
- (3), (4) : エラー値を保持していたら、例外[`bad_expected_access`](../bad_expected_access.md)`(`[`std::move`](/reference/utility/move.md)`(`[`error()`](error.md)`))`を送出する


## 例
```cpp example
#include <expected>
#include <iostream>
#include <string>

int main()
{
  std::expected<int, std::string> x = 1;
  std::cout << x.value() << std::endl;

  std::expected<int, std::string> y = std::unexpected{"ERR"};
  try {
    std::cout << y.value() << std::endl;
  } catch (const std::bad_expected_access<std::string>& ex) {
    std::cout << "throw:" << ex.error() << std::endl;
  }
}
```
* value()[color ff0000]
* error()[link ../bad_expected_access/error.md]
* std::unexpected[link ../unexpected.md]
* std::bad_expected_access[link ../bad_expected_access.md]

### 出力
```
1
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


## 関連項目
- [`operator->`](op_arrow.md)
- [`operator*`](op_deref.md)
- [`value_or()`](value_or.md)


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
