# swap
* stop_token[meta header]
* std[meta namespace]
* stop_token[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
void swap(stop_token&) noexcept;
```

## 概要
他の`stop_token`オブジェクトと値を入れ替える。


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
  std::stop_source ss;
  std::stop_token st1 = ss.get_token();
  std::stop_token st2;

  assert(st1.stop_possible() == true);
  assert(st2.stop_possible() == false);

  st1.swap(st2);

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
