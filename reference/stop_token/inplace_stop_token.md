# inplace_stop_token
* stop_token[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  class inplace_stop_token;
}
```

## 概要
`inplace_stop_token`クラスは、停止要求が作成されたかどうか、あるいは停止要求が作成されうるかどうかなど、停止状態を問い合わせるためのインターフェースを提供する。

`inplace_stop_token`は[`stoppable_token`](stoppable_token.md)のモデルである。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`(constructor)`](inplace_stop_token/op_constructor.md) | コンストラクタ | C++26 |
| `(destructor)` | デストラクタ | C++26 |
| `operator==` | 等値演算子 | C++26 |
| [`stop_requested`](inplace_stop_token/stop_requested.md)| 停止要求が作成されたかどうかを取得する | C++20 |
| [`stop_possible`](inplace_stop_token/stop_possible.md)  | 停止要求が作成されうるかどうかを取得する | C++20 |
| [`swap`](inplace_stop_token/swap.md) | 別の`inplace_stop_token`と交換する | C++20 |

## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`callback_type`](inplace_stop_token/callback_type.md) | 対応するコールバック型 | C++26 |


## 例
```cpp example
#include <cassert>
#include <stop_token>

int main()
{
  std::inplace_stop_source ss;
  std::inplace_stop_token st = ss.get_token();
  assert(st.stop_requested() == false);

  ss.request_stop();

  assert(st.stop_requested() == true);
}
```
* std::inplace_stop_token[color ff0000]
* std::inplace_stop_source[link inplace_stop_source.md]
* stop_requested()[link inplace_stop_token/stop_requested.md]
* request_stop()[link inplace_stop_source/request_stop.md]
* get_token()[link inplace_stop_source/get_token.md]

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
- [`inplace_stop_source`](inplace_stop_source.md)
- [`inplace_stop_callback`](inplace_stop_callback.md.nolink)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
