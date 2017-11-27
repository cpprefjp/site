# reset
* memory[meta header]
* std[meta namespace]
* weak_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void reset() noexcept;
```

## 概要
監視対象とのリンクをクリアする。


## 効果
[`weak_ptr()`](op_constructor.md)`.`[`swap`](swap.md)`(*this)`と同等の効果を持つ。


## 戻り値
なし


## 例
```cpp example
#include <cassert>
#include <memory>

int main()
{
  // wpはspを監視する
  std::shared_ptr<int> sp(new int(3));
  std::weak_ptr<int> wp = sp;

  // spの監視をやめる
  wp.reset();

  assert(wp.use_count() == 0);
}
```
* reset()[color ff0000]
* wp.use_count()[link use_count.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?
