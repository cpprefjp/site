# stop_source
* stop_token[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  class stop_source;
}
```

## 概要
クラス`stop_source`は、停止要求を作成するためのインターフェースを提供する。  
また、自身と停止状態を共有する[`stop_token`](stop_token.md)クラスのオブジェクトを構築できる。

## 備考
ある`stop_source`に対して作成した停止要求は、同じ停止状態を共有するほかの`stop_source`や`stop_token`から可視になる。

一度停止要求を作成すると、それをあとで取り下げることはできない。また、それ以降に作成した停止要求は効果を持たない。

## メンバ関数

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------|--------------------------------------------------------------------|-------|
| [`(constructor)`](stop_source/op_constructor.md) | コンストラクタ | C++20 |
| [`(destructor)`](stop_source/op_destructor.md)   | デストラクタ | C++20 |
| [`operator=`](stop_source/op_assign.md)          | 代入演算子 | C++20 |
| [`swap`](stop_source/swap.md)                    | 別の`stop_source`と交換する | C++20 |
| [`get_token`](stop_source/get_token.md)          | 自身と停止状態を共有する[`stop_token`](stop_token.md)を構築して返す | C++20 |
| [`stop_possible`](stop_source/stop_possible.md)  | 停止要求を作成可能どうかを取得する | C++20 |
| [`stop_requested`](stop_source/stop_requested.md)| 停止要求を作成したかどうかを取得する | C++20 |
| [`request_stop`](stop_source/request_stop.md)    | 停止要求を作成する | C++20 |

## 非メンバ関数
| 名前 | 説明 | 対応バージョン |
|---------------------------------|---------------------------------------|-------|
| [`operator==`](stop_source/op_equal.md)         | 等値演算子 | C++20 |
| [`operator!=`](stop_source/op_not_equal.md)     | 非等値演算子 | C++20 |
| [`swap`](stop_source/swap_free.md) | 2つの`stop_source`オブジェクトを入れ替える | C++11 |


## 例
```cpp example
#include <cassert>
#include <stop_token>

int main()
{
  std::stop_source ss;
  std::stop_token st = ss.get_token();

  bool invoked = false;
  std::stop_callback cb {st, [&] { invoked = true; }};

  assert(st.stop_requested() == false);
  assert(invoked == false);

  ss.request_stop();

  assert(st.stop_requested() == true);
  assert(invoked == true);
}
```
* std::stop_source[color ff0000]
* std::stop_token[link stop_token.md]
* stop_callback[link stop_callback.md]
* stop_requested()[link stop_token/stop_requested.md]
* request_stop()[link stop_source/request_stop.md]
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

