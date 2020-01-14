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

## メンバ関数

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------|--------------------------------------------------------------------|-------|
| [`(constructor)`](stop_source/op_constructor.md.nolink) | コンストラクタ | C++20 |
| [`(destructor)`](stop_source/op_destructor.md.nolink)   | デストラクタ | C++20 |
| [`operator=`](stop_source/op_assign.md.nolink)          | 代入演算子 | C++20 |
| [`swap`](stop_source/swap.md.nolink)                    | 別の`stop_source`と交換する | C++20 |
| [`get_token`](stop_source/get_token.md.nolink)          | 自身と停止状態を共有する`stop_token`を構築して返す | C++20 |
| [`stop_possible`](stop_source/stop_possible.md.nolink)  | 停止要求を作成可能どうかを取得する | C++20 |
| [`stop_requested`](stop_source/stop_requested.md.nolink)| 停止要求を作成したかどうかを取得する | C++20 |
| [`request_stop`](stop_source/request_stop.md.nolink)    | 停止要求を作成する | C++20 |

## 非メンバ関数
| 名前 | 説明 | 対応バージョン |
|---------------------------------|---------------------------------------|-------|
| [`operator==`](stop_source/op_equal.md.nolink)         | 等値演算子 | C++20 |
| [`operator!=`](stop_source/op_not_equal.md.nolink)     | 非等値演算子 | C++20 |
| [`swap`](stop_source/swap_free.md.nolink) | 2つの`stop_source`オブジェクトを入れ替える | C++11 |


## 例
```cpp example
#include <cassert>
#include <stop_token>

int main()
{
  std::stop_source ss;

  assert(ss.stop_possible() == true);
  assert(ss.stop_requested() == false);

  std::stop_token st = ss.get_token();
  assert(st.stop_requested() == false);

  ss.request_stop();

  assert(ss.stop_requested() == true);
  assert(st.stop_requested() == true);
}
```
* stop_token[link stop_token.md]
* stop_source[link stop_source.md]
* stop_requested()[link stop_source/stop_requested.md.nolink]
* request_stop()[link stop_source/request_stop.md.nolink]
* get_token()[link stop_source/get_token.md.nolink]

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

