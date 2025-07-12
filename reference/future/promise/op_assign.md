# operator=
* future[meta header]
* std[meta namespace]
* promise[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
promise& operator=(promise&& rhs) noexcept;      // (1)
promise& operator=(const promise& rhs) = delete; // (2)
```

## 概要
- (1) : ムーブ代入演算子。
- (2) : コピー代入演算子。コピー禁止。


## 効果
- (1) :
    1. まず現在の共有状態が準備完了状態([`future_status::ready`](../future_status.md))でなければ、error conditionとして[`broken_promise`](../future_errc.md)を持つ[`future_error`](../future_error.md)例外オブジェクトを格納したのち、準備完了状態にする。
    2. 現在の共有状態を解放する。
    3. `promise(std::`[`move`](/reference/utility/move.md)`(rhs)).swap(*this)`する。

## 戻り値
- (1) : `*this`


## 例
```cpp example
#include <utility>
#include <future>

int main()
{
  std::promise<int> p1;
  std::promise<int> p2;
  p2 = std::move(p1);
}
```
* std::move[link /reference/utility/move.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]


## 参照
