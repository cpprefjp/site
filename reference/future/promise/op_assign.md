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
- (1) : `promise(std::`[`move`](/reference/utility/move.md)`(rhs)).swap(*this)`と等価。

この結果として、以下が行われる：

1. `rhs`から一時オブジェクトをムーブ構築する。`rhs`は共有状態を持たなくなる。
2. 一時オブジェクトと`*this`を[`swap`](swap.md)する。`*this`は`rhs`が持っていた共有状態を持ち、一時オブジェクトは`*this`が元々持っていた共有状態を持つ。
3. 一時オブジェクトの[デストラクタ](op_destructor.md)によって、`*this`が元々持っていた共有状態が放棄される。すなわち、その共有状態が準備完了状態([`future_status::ready`](../future_status.md))でなければ、error conditionとして[`broken_promise`](../future_errc.md)を持つ[`future_error`](../future_error.md)例外オブジェクトを格納したのち準備完了状態にし、そのうえで共有状態を解放する。

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
- [LWG Issue 4158. `packaged_task::operator=` should abandon its shared state](https://cplusplus.github.io/LWG/issue4158)
    - 効果の記述が`promise(std::move(rhs)).swap(*this)`と等価であるという形へ整理された。一時オブジェクトのデストラクタによって古い共有状態が放棄されるため、動作は変わらない。規格としてはC++29のワーキングドラフトへ適用されたが、記述の整理であるためC++11へ遡及して適用される
