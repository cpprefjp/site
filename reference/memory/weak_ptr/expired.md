# expired
* memory[meta header]
* std[meta namespace]
* weak_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
bool
  expired() const noexcept; // (1) C++11
constexpr bool
  expired() const noexcept; // (1) C++26
```

## 概要
監視している`shared_ptr`オブジェクトの寿命・リンクが切れたかを判定する。


## 戻り値
```cpp
use_count() == 0
```
* use_count()[link use_count.md]


## 備考
この関数は、実際には[`use_count()`](use_count.md) `== 0`で判定するよりも、高速に実装される可能性がある。


## 例
```cpp example
#include <cassert>
#include <memory>

int main()
{
  std::weak_ptr<int> wp;

  // 監視対象とリンクしていない
  assert(wp.expired());

  {
    std::shared_ptr<int> sp(new int(3));

    // shared_ptrオブジェクトspを監視する
    wp = sp;

    // shared_ptrオブジェクトの寿命は切れていない
    assert(!wp.expired());
  }

  // shared_ptrオブジェクトの寿命が切れた
  assert(wp.expired());
}
```
* expired()[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?


## 参照
- [P3037R6 `constexpr std::shared_ptr` and friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3037r6.pdf)