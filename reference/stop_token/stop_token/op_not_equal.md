# operator!=
* stop_token[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  [[nodiscard]] friend bool operator!=(const stop_token& lhs, const stop_token& rhs) noexcept;
}
```

## 概要
`stop_token`オブジェクトの非�値比較を行う。

## 戻り値
`lhs`と`rhs`が同じ停�状態を共有している場合、あるいはどちらも停�状態を所有していない場合は`false`が返る。それ以外の場合は`true`が返る。

## 例外
投げない。

## 例
```cpp example
#include <cassert>
#include <stop_token>

int main()
{
  std::stop_source ss1;
  std::stop_source ss2;

  std::stop_token st1 = ss1.get_token();
  std::stop_token st2 = st1;
  std::stop_token st3 = ss2.get_token();
  std::stop_token st4;
  std::stop_token st5;

  assert(st1 == st2);
  assert(st1 != st3);
  assert(st1 != st4);
  assert(st4 == st5);
}
```
* stop_token[link ../stop_token.md]
* stop_source[link ../stop_source.md]
* get_token()[link ../stop_source/get_token.md]

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

