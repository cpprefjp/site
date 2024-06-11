# reset
* any[meta header]
* std[meta namespace]
* any[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
void reset() noexcept;
```

## 概要
有効値を保持していない状態にする。


## 効果
有効値を保持している場合、その値を破棄する。有効値を保持していない場合は、なにもしない。


## 事後条件
`*this`が有効値を保持していないこと


## 例
```cpp example
#include <cassert>
#include <any>

int main()
{
  std::any x = 3;
  x.reset();

  assert(x.has_value() == false);
}
```
* reset()[color ff0000]
* x.has_value()[link has_value.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
