# has_value
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* expected[meta class]
* cpp23[meta cpp]

```cpp
constexpr bool has_value() const noexcept;
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
#include <string>

int main()
{
  std::expected<std::string, int> x = "Hello";
  std::cout << x.has_value() << std::endl;

  std::expected<std::string, int> y = std::unexpected{42};
  std::cout << y.has_value() << std::endl;
}
```
* has_value[color ff0000]
* std::unexpected[link ../unexpected.md]

### 出力
```
1
0
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
- [`operator bool`](op_bool.md)


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
