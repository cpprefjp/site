# has_value
* any[meta header]
* std[meta namespace]
* any[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
bool has_value() const noexcept;
```

## 概要
有効な値を保持しているかを判定する。


## 効果
有効値を保持している場合に`true`を返し、そうでなければ`false`を返す。


## 例
```cpp example
#include <cassert>
#include <any>

int main()
{
  std::any x = 3;
  assert(x.has_value() == true);

  std::any y;
  assert(y.has_value() == false);
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
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
