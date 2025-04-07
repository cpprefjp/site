# swap (非メンバ関数)
* stop_token[meta header]
* std[meta namespace]
* stop_token[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
friend void swap(stop_token& x, stop_token& y) noexcept;
```

## 概要
2つの`stop_token`オブジェクトを入れ替える。


## 効果
以下と等価：

```cpp
x.swap(y);
```
* swap[link swap.md]


## 戻り値
なし


## 例外
なし


## 備考
C++26で`swap`非メンバ関数は`stop_token`クラス定義から削除されるが、[`std::swap`](/reference/utility/swap.md)の値版により従来動作は維持される。


## 例
```cpp example
#include <cassert>
#include <stop_token>

int main()
{
  std::stop_source ss;
  std::stop_token st1 = ss.get_token();
  std::stop_token st2;

  assert(st1.stop_possible() == true);
  assert(st2.stop_possible() == false);

  swap(st1, st2);

  assert(st1.stop_possible() == false);
  assert(st2.stop_possible() == true);
}
```
* swap[color ff0000]
* std::stop_token[link ../stop_token.md]
* std::stop_source[link ../stop_source.md]
* stop_possible()[link stop_possible.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0660R10 Stop token and joining thread](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0660r10.pdf)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
    - C++26で非メンバ関数`swap`定義を削除
