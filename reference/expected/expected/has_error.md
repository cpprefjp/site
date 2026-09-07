# has_error
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* expected[meta class]
* cpp29[meta cpp]

```cpp
constexpr bool has_error() const noexcept;
```

## 概要
エラー値を保持しているかを判定する。


## 効果
以下と等価である。

```cpp
return !has_value();
```
* has_value()[link has_value.md]


## 例外
投げない


## 備考
- [`has_value()`](has_value.md)の否定と同じであるが、エラー処理に注目したコードを書く際に、`!x.has_value()`よりも意図が読み取りやすくなる


## 例
```cpp example
#include <expected>
#include <iostream>
#include <string>

int main()
{
  std::expected<std::string, int> x = "Hello";
  std::cout << x.has_error() << std::endl;

  std::expected<std::string, int> y = std::unexpected{42};
  std::cout << y.has_error() << std::endl;
}
```
* has_error[color ff0000]
* std::unexpected[link ../unexpected.md]

### 出力
```
0
1
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): 24 [mark verified]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 6 [mark noimpl]


## 関連項目
- [`has_value`](has_value.md)
- [`operator bool`](op_bool.md)


## 参照
- [P3798R1 The `unexpected` in `std::expected`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3798r1.html)
