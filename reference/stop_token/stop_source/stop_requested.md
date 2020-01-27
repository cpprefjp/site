# stop_requested
* stop_token[meta header]
* std[meta namespace]
* stop_source[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
[[nodiscard]] bool stop_requested() const noexcept;
```

## 概要
停�要求が作成されたかどうかを返す。

## 戻り値
自身が停�状態を所有していて、その停�状態が停�要求を受け取っている場合は`true`を返す。それ以外の場合は`false`を返す。

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

  assert(ss1.stop_requested() == false);
  assert(ss2.stop_requested() == false);

  ss1.request_stop();
  ss2.request_stop();

  assert(ss1.stop_requested() == true);
  assert(ss2.stop_requested() == false);
}
```
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



