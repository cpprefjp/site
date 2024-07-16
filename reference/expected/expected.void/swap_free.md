# swap (非メンバ関数)
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* expected.void[meta class]
* cpp23[meta cpp]

```cpp
// expected<cv void, E>部分特殊化
friend constexpr void swap(expected& x, expected& y)
  noexcept(noexcept(x.swap(y)));
```
* x.swap(y)[link swap.md]

## 概要
2つの`expected`オブジェクトを入れ替える。


## 効果
```cpp
x.swap(y);
```
* swap[link swap.md]


## 戻り値
なし


## 例
```cpp example
#include <cassert>
#include <expected>

int main()
{
  std::expected<void, int> x;
  std::expected<void, int> y = std::unexpected{42};
  assert(x.has_value() && y.error() == 42);

  std::swap(x, y);
  assert(x.error() == 42 && y.has_value());
}
```
* std::swap[color ff0000]
* has_value()[link has_value.md]
* error()[link error.md]
* std::unexpected[link ../unexpected.md]

### 出力
```
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 12.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
