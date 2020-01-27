# swap (非メンバ関数)
* stop_token[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  friend
  void swap(stop_token& x, stop_token& y) noexcept;
}
```

## 概要
2つの`stop_token`オブジェクトを入れ替える。


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
  std::stop_source ss;
  std::stop_token st1 = ss.get_token();
  std::stop_token st2;

  assert(st1.stop_possible() == true);
  assert(st2.stop_possible() == false);

  std::swap(st1, st2);

  assert(st1.stop_possible() == false);
  assert(st2.stop_possible() == true);
}
```
* std::swap[color ff0000]
* std::swap[link swap.md]
* stop_token[link ../stop_token.md]
* stop_source[link ../stop_source.md]
* request_stop()[link ../stop_source/request_stop.md]
* stop_possible()[link stop_possible.md]
* stop_requested()[link stop_requested.md]

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

