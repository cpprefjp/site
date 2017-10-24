# operator bool
* optional[meta header]
* std[meta namespace]
* optional[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr explicit operator bool() const noexcept;
```

## 概要
有効な値を保持しているかを判定する。


## 効果
有効値を保持している場合に`true`を返し、そうでなければ`false`を返す。


## 例
```cpp
#include <iostream>
#include <optional>

int main()
{
  std::optional<int> p1 = 3;
  if (p1) {
    std::cout << "p1 has value" << std::endl;
  }

  std::optional<int> p2;
  if (!p2) {
    std::cout << "p2 doesn't have value" << std::endl;
  }
}
```
* if (p1)[color ff0000]
* if (!p2)[color ff0000]

### 出力
```
p1 has value
p2 doesn't have value
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang): 4.0.1
- [GCC, C++17 mode](/implementation.md#gcc): 7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`optional::has_value()`](has_value.md)
