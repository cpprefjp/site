# swap (非メンバ関数)
* stop_token[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  void swap(stop_source& x, stop_source& y) noexcept;
}
```

## 概要
2つの`stop_source`オブジェクトを入れ替える。


## 効果
以下と�価：

```cpp
x.swap(y);
```
* swap[link swap.md]


## 戻り値
なし


## 例外
なし


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

  std::swap(ss1, ss2);

  assert(ss1.stop_possible() == false);
  assert(ss2.stop_possible() == true);
}
```
* swap[color ff0000]
* swap[link swap.md]
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

