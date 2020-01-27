# operator!=
* stop_token[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  [[nodiscard]] friend bool operator!=(const stop_source& x, const stop_source& y) noexcept;
}
```

## 概要
`stop_source`オブジェクトの非�値比較を行う。

## 戻り値
`x`と`y`が同じ停�状態を共有している場合、あるいはどちらも停�状態を所有していない場合は`false`が返る。それ以外の場合は`true`が返る。

## 例外
投げない。

## 例
```cpp example
#include <cassert>
#include <stop_token>

int main()
{
  std::stop_source ss1;
  std::stop_source ss2 = ss1;
  std::stop_source ss3;
  std::stop_source ss4(std::nostopstate);
  std::stop_source ss5(std::nostopstate);;

  assert(ss1 == ss2);
  assert(ss1 != ss3);
  assert(ss1 != ss4);
  assert(ss4 == ss5);
}
```
* stop_source[link ../stop_source.md]
* nostopstate[link ../nostopstate.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [GCC](/implementation.md#gcc): ??
- [Clang](/implementation.md#clang): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

