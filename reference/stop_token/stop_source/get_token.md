# get_token
* stop_token[meta header]
* std[meta namespace]
* stop_source[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
[[nodiscard]]
stop_token get_token() const noexcept; // (1) C++20
stop_token get_token() const noexcept; // (1) C++26
```

## 概要
自身と停止状態を共有する[`stop_token`](../stop_token.md)を構築して返す。

## 戻り値
[`stop_possible()`](stop_possible.md) `==` `false` のときは、デフォルト構築した`stop_token`を返す。それ以外の場合は、自身と停止状態を共有する`stop_token`を構築して返す。

## 例外
投げない。

## 例
```cpp example
#include <cassert>
#include <stop_token>

int main()
{
  std::stop_source ss1;
  std::stop_source ss2(std::nostopstate);

  std::stop_token st1 = ss1.get_token();
  std::stop_token st2 = ss2.get_token();

  assert(st1.stop_possible() == true);
  assert(st2.stop_possible() == false);
}
```
* get_token()[color ff0000]
* std::stop_token[link ../stop_token.md]
* std::stop_source[link ../stop_source.md]
* std::nostopstate[link ../nostopstate.md]
* stop_possible()[link ../stop_token/stop_requested.md]

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
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
