# inplace_stop_source
* stop_token[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  class inplace_stop_source;
}
```

## 概要
クラス`inplace_stop_source`は、停止状態をメンバとして直接所有し、停止要求を作成するためのインターフェースを提供する。

`inplace_stop_source`は[`stoppable-source`](stoppable-source.md)のモデルである。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`(constructor)`](inplace_stop_source/op_constructor.md.nolink) | コンストラクタ | C++26 |
| `(destructor)` | デストラクタ | C++26 |
| `operator=` | 代入演算子 | C++26 |
| [`get_token`](inplace_stop_source/get_token.md.nolink) | 自身の停止状態を参照する[`inplace_stop_token`](inplace_stop_token.md.nolink)を返す | C++26 |
| [`stop_requested`](inplace_stop_source/stop_requested.md.nolink) | 停止要求を作成したかどうかを取得する | C++26 |
| [`request_stop`](inplace_stop_source/request_stop.md.nolink) | 停止要求を作成する | C++26 |

## 静的メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`stop_possible`](inplace_stop_source/stop_possible.md.nolink) | 停止要求を作成可能どうかを取得する | C++26 |


## 例
```cpp example
#include <cassert>
#include <stop_token>

int main()
{
  std::inplace_stop_source ss;
  std::inplace_stop_token st = ss.get_token();

  bool invoked = false;
  std::inplace_stop_callback cb {st, [&] { invoked = true; }};

  assert(st.stop_requested() == false);
  assert(invoked == false);

  ss.request_stop();

  assert(st.stop_requested() == true);
  assert(invoked == true);
}
```
* std::inplace_stop_source[color ff0000]
* std::inplace_stop_token[link inplace_stop_token.md.nolink]
* std::inplace_stop_callback[link inplace_stop_callback.md.nolink]
* stop_requested()[link inplace_stop_token/stop_requested.md.nolink]
* request_stop()[link inplace_stop_source/request_stop.md.nolink]
* get_token()[link inplace_stop_source/get_token.md.nolink]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`inplace_stop_token`](inplace_stop_token.md.nolink)
- [`inplace_stop_callback`](inplace_stop_callback.md.nolink)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
