# コンストラクタ
* stop_token[meta header]
* std[meta namespace]
* stop_token[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
stop_token() noexcept;                      // (1)
stop_token(const stop_token& rhs) noexcept; // (2)
stop_token(stop_token&& rhs) noexcept;      // (3)
```


## 概要
- (1) : デフォルトコンストラクタ。  
  [`stop_source`](../stop_source.md)と停止状態を共有していない[`stop_token`](../stop_token.md)を構築する。このとき、停止状態を扱うためのリソースは確保せず、停止要求を決して受け取らない状態になる。（停止要求を受け取れる`stop_token`を構築するには、`stop_source`の[`get_token()`](../stop_source/get_token.md)メンバ関数を呼び出して、`stop_source`と停止状態を共有する`stop_token`を構築する必要がある）
- (2) : コピーコンストラクタ。
- (3) : ムーブコンストラクタ。

## 事後条件
- (1) : [`stop_possible()`](stop_possible.md) `==` `false` かつ [`stop_requested()`](stop_requested.md) `==` `false`。
- (2) : `*this` `==` `rhs`。（`rhs`が停止状態を所有していれば、`*this`と`rhs`は同じ停止状態を共有するようになる）
- (3) : もし`rhs`が停止状態を所有していればその所有権が`*this`へ移動し、`rhs.`[`stop_possible()`](stop_possible.md) `==` `false`となる。

## 例外
投げない。

## 例
```cpp example
#include <cassert>
#include <stop_token>

int main()
{
  // (1) デフォルトコンストラクタ
  std::stop_token st1;
  assert(st1.stop_possible() == false);
  assert(st1.stop_requested() == false);

  std::stop_source ss;
  std::stop_token st2 = ss.get_token();
  assert(st2.stop_possible() == true);
  assert(st2.stop_requested() == false);

  // (2) コピーコンストラクタ
  std::stop_token st3 = st2;
  assert(st3 == st2);

  // (3) ムーブコンストラクタ
  std::stop_token st4 = std::move(st2);
  assert(st2.stop_possible() == false);
  assert(st3 == st4);

  ss.request_stop();
  assert(st3.stop_requested() == true);
  assert(st4.stop_requested() == true);
}
```
* std::move[link /reference/utility/move.md]
* std::stop_token[link ../stop_token.md]
* std::stop_source[link ../stop_source.md]
* stop_requested()[link stop_requested.md]
* stop_possible()[link stop_possible.md]
* request_stop()[link ../stop_source/request_stop.md]
* get_token()[link ../stop_source/get_token.md]

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
