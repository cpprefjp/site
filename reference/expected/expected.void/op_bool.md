# operator bool
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* expected.void[meta class]
* cpp23[meta cpp]

```cpp
// expected<cv void, E>部分特殊化
constexpr explicit operator bool() const noexcept;
```

## 概要
正常値を保持しているかを判定する。


## 戻り値
正常値を保持しているなら`true`を返し、エラー値を保持しているなら`false`を返す。


## 例外
投げない


## 例
```cpp example
#include <expected>
#include <iostream>

int main()
{
  std::expected<void, int> x;
  if (x) {
    std::cout << "has_value" << std::endl;
  } else {
    std::cout << "unex=" << x.error() << std::endl;
  }

  std::expected<void, int> y = std::unexpected{42};
  if (y) {
    std::cout << "has_value" << std::endl;
  } else {
    std::cout << "unex=" << y.error() << std::endl;
  }
}
```
* (x)[color ff0000]
* (y)[color ff0000]
* error()[link error.md]
* std::unexpected[link ../unexpected.md]

### 出力
```
has_value
unex=42
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
- [`has_value()`](has_value.md)


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
