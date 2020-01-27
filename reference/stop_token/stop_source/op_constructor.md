# コンストラクタ
* stop_token[meta header]
* std[meta namespace]
* stop_source[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
stop_source();                                // (1)
explicit stop_source(nostopstate_t) explicit; // (2)
stop_source(const stop_source& rhs) explicit; // (3)
stop_source(stop_source&& rhs) explicit;      // (4)
```

## 概要
- (1) : デフォルトコンストラクタ。停�状態を表すリソースを新たに確保して所有する。
- (2) : 停�状態を表すリソースを確保しないコンストラクタ。
- (3) : コピーコンストラクタ。
- (4) : ムーブコンストラクタ。

## 事後条件
- (1) : [`stop_possible()`](stop_possible.md) `==` `true` かつ[`stop_requested()`](stop_requested.md) `==` `false`。
- (2) : [`stop_possible()`](stop_possible.md) `==` `false` かつ[`stop_requested()`](stop_requested.md) `==` `false`。
- (2) : `*this` `==` `rhs`。（`rhs`が停�状態を所有していれば、`*this`と`rhs`は同じ停�状態を共有するようになる）
- (4) : もし`rhs`が停�状態を所有していればその所有権が`*this`へ移動し、`rhs.`[`stop_possible()`](stop_possible.md) `==` `false`となる。

## 例外
- (1) : 停�状態を表すリソースを確保できなかった場合は、[`bad_alloc`](/reference/new/bad_alloc.md)を投げる。
- (2) : 投げない。
- (3) : 投げない。
- (4) : 投げない。

## 例
```cpp example
#include <cassert>
#include <stop_token>

int main()
{
  std::stop_source ss1;
  std::stop_source ss2(std::nostopstate);
  std::stop_source ss3 = ss1;
  std::stop_source ss4 = std::move(ss1);

  assert(ss1.stop_possible() == false);
  assert(ss2.stop_possible() == false);
  assert(ss3.stop_possible() == true);
  assert(ss4.stop_possible() == true);

  ss3.request_stop();

  assert(ss3.stop_requested() == true);
  assert(ss4.stop_requested() == true);
}
```
* std::move[link /reference/utility/move.md]
* stop_token[link ../stop_token.md]
* stop_source[link ../stop_source.md]
* nostopstate[link ../nostopstate.md]
* stop_requested()[link stop_requested.md]
* request_stop()[link request_stop.md]

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

