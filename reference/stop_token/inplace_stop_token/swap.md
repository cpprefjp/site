# swap
* stop_token[meta header]
* std[meta namespace]
* inplace_stop_token[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
void swap(inplace_stop_token&) noexcept;
```

## 概要
他の`inplace_stop_token`オブジェクトと値を入れ替える。

## 戻り値
なし

## 例外
投げない

## 例
```cpp example
#include <cassert>
#include <stop_token>

int main()
{
  std::inplace_stop_source ss;
  std::inplace_stop_token st1 = ss.get_token();
  std::inplace_stop_token st2;

  assert(st1.stop_possible() == true);
  assert(st2.stop_possible() == false);

  st1.swap(st2);

  assert(st1.stop_possible() == false);
  assert(st2.stop_possible() == true);
}
```
* swap[color ff0000]
* std::inplace_stop_token[link ../inplace_stop_token.md]
* std::inplace_stop_source[link ../inplace_stop_source.md]
* stop_possible()[link stop_possible.md]

### 出力
```
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
