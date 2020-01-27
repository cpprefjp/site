# stop_possible
* stop_token[meta header]
* std[meta namespace]
* stop_token[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
[[nodiscard]] bool stop_possible() const noexcept;
```

## 概要
停�要求が作成されうるかどうかを返す。

## 戻り値
以下の場合は`false`を返す。

- 自身が停�状態を所有していない場合。
- 所有している停�状態が停�要求が受け取っておらず、かつその停�状態に紐づく`stop_source`オブジェクトが�在しない場合。

それ以外の場合は`true`を返す。


## 例外
投げない。

## 備考
一度[`stop_requested()`](stop_requested.md) `==` `true`となった[`stop_token`](../stop_token.md)は、自身と停�状態を共有する[`stop_source`](../stop_source.md)が破棄されても[`stop_requested()`](stop_requested.md) `==` `true`かつ[`stop_possible()`](stop_possible.md) `==` `true`の状態のままになる。


## 例
```cpp example
#include <cassert>
#include <stop_token>

int main()
{
  std::stop_source ss1;
  std::stop_source ss2;

  std::stop_token st1 = ss1.get_token();
  std::stop_token st2 = ss2.get_token();
  std::stop_token st3;

  assert(st1.stop_possible() == true);
  assert(st2.stop_possible() == true);
  assert(st3.stop_possible() == false);

  // 停�要求を作成する
  ss1.request_stop();

  assert(st1.stop_possible() == true);
  assert(st2.stop_possible() == true);
  assert(st3.stop_possible() == false);

  // stop_token に紐づく stop_source を破棄する
  ss1 = std::stop_source{};
  ss2 = std::stop_source{};

  // 停�状態が停�要求を受け取った場合は、
  // その後で stop_source が破棄されても stop_possible() == true のままになる
  assert(st1.stop_possible() == true);
  assert(st2.stop_possible() == false);
  assert(st3.stop_possible() == false);
}
```
* std::stop_token[link ../stop_token.md]
* std::stop_source[link ../stop_source.md]
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

