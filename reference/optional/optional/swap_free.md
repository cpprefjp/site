# swap (非メンバ関数)
* optional[meta header]
* std[meta namespace]
* optional[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T>
  void swap(optional<T>& x, optional<T>& y) noexcept(noexcept(x.swap(y)));
}
```
* x.swap(y)[link swap.md]

## 概要
2つの`optional`オブジェクトを入れ替える。


## 効果
```cpp
x.swap(y);
```
* swap[link swap.md]


## 備考
型`T`がムーブ構築できない、もしくは型`T`がswap可能でない場合、この関数はオーバーロード解決の候補から除外される。


## 例
```cpp
#include <cassert>
#include <optional>

int main()
{
  // 状況1
  // 左辺と右辺の両方が有効値を持つ場合
  {
    std::optional<int> a = 3;
    std::optional<int> b = 1;

    // aとbを入れ替える
    std::swap(a, b);

    assert(a.value() == 1);
    assert(b.value() == 3);
  }

  // 状況2
  // 左辺が有効値を持ち、右辺が有効値を持たない場合
  {
    std::optional<int> a = 3;
    std::optional<int> b;

    // aとbを入れ替える
    std::swap(a, b);

    assert(!a.has_value());
    assert(b.has_value());
    assert(b.value() == 3);
  }

  // 状況3
  // 左辺が有効値を持たず、右辺が有効値を持つ場合
  {
    std::optional<int> a;
    std::optional<int> b = 3;

    // aとbを入れ替える
    std::swap(a, b);

    assert(a.has_value());
    assert(a.value() == 3);
    assert(!b.has_value());
  }

  // 状況4
  // 左辺と右辺の両方が有効値を持たない場合
  {
    std::optional<int> a;
    std::optional<int> b;

    // aとbを入れ替える
    std::swap(a, b);

    assert(!a.has_value());
    assert(!b.has_value());
  }
}
```
* std::swap[color ff0000]
* has_value()[link has_value.md]
* value()[link value.md]

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
