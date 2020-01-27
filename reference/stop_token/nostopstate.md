# nostopstate
* stop_token[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  struct nostopstate_t {
    explicit nostopstate_t() = default;
  };

  inline constexpr nostopstate_t nostopstate{};
}
```

## 概要
`nostopstate_t`型とその値`nostopstate`は、停�状態を扱わない[`stop_source`](stop_source.md)を構築するためのタグである。  
`stop_source`クラスのコンストラクタに`nostopstate`を渡すと、その`stop_source`は停�要求を扱うためのリソースを確保せず、停�要求を作成したり`stop_token`クラスと停�状態を共有したりできない状態になる。


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

  std::stop_token st1 = ss1.get_token();
  std::stop_token st2 = ss2.get_token();

  assert(st1.stop_possible() == true);
  assert(st2.stop_possible() == false);
}
```
* std::stop_token[link stop_token.md]
* std::stop_source[link stop_source.md]
* std::nostopstate[link nostopstate.md]
* stop_possible()[link stop_token/stop_possible.md]
* get_token()[link stop_source/get_token.md]

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

