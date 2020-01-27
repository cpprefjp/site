# stop_possible
* stop_token[meta header]
* std[meta namespace]
* stop_source[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
[[nodiscard]] bool stop_possible() const noexcept;
```

## 概要
停�要求を作成できるかどうかを返す。

## 戻り値
自身が停�状態を所有しているときは`true`を返す。それ以外の場合は`false`を返す。

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

  assert(ss1.stop_possible() == true);
  assert(ss2.stop_possible() == false);
}
```
* stop_source[link ../stop_source.md]
* nostopstate[link ../nostopstate.md]
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

