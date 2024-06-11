# operator*
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* expected[meta class]
* cpp23[meta cpp]

```cpp
constexpr const T& operator*() const & noexcept;   // (1)
constexpr T& operator*() & noexcept;               // (2)
constexpr T&& operator*() && noexcept;             // (3)
constexpr const T&& operator*() const && noexcept; // (4)
```

## 概要
正常値を取得する。


## 事前条件
[`has_value()`](has_value.md) `== true`


## 戻り値
動作説明用のメンバ変数として、正常値を保持する`val`を導入する。

- (1), (2) : `val`
- (3), (4) : [`std::move`](/reference/utility/move.md)`(val)`


## 例外
投げない


## 例
```cpp example
#include <expected>
#include <iostream>
#include <string>

int main()
{
  std::expected<int, std::string> x = 1;
  std::cout << *x << std::endl;

  std::expected<int, std::string> y = std::unexpected{"ERR"};
//std::cout << *y << std::endl;
  // エラー値を保持する y に対する operator* 呼び出しは未定義動作
}
```
* *x[color ff0000]
* std::unexpected[link ../unexpected.md]

### 出力
```
1
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
- [`value()`](value.md)
- [`value_or()`](value_or.md)


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
