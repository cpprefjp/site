# has_value
* optional[meta header]
* std[meta namespace]
* optional[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr bool has_value() const noexcept;
```

## 概要
有効な値を保持しているかを判定する。


## 効果
有効値を保持している場合に`true`を返し、そうでなければ`false`を返す。


## 例
```cpp
#include <cassert>
#include <optional>

int main()
{
  std::optional<int> p1 = 3;
  assert(p1.has_value() == true);

  std::optional<int> p2;
  assert(p2.has_value() == false);
}
```
* has_value()[color ff0000]

### 出力
```
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
- [`optional::operator bool()`](op_bool.md)
