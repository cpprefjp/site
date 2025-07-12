# swap
* stop_token[meta header]
* std[meta namespace]
* stop_source[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
void swap(stop_source&) noexcept;
```

## 概要
他の `stop_source` オブジェクトと値を入れ替える。

## 戻り値
なし

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

  ss1.swap(ss2);

  assert(ss1.stop_possible() == false);
  assert(ss2.stop_possible() == true);
}
```
* swap[color ff0000]
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


## 参照
