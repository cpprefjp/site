# operator=
* future[meta header]
* std[meta namespace]
* packaged_task[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
packaged_task& operator=(packaged_task&) = delete;       // (1) C++11
packaged_task& operator=(const packaged_task&) = delete; // (1) C++14

packaged_task& operator=(packaged_task&& rhs) noexcept;  // (2)
```

## 概要
- (1) : コピー代入演算子。コピー不可。
- (2) : ムーブ代入演算子。


## 効果
- (2) : `packaged_task(`[`std::move`](/reference/utility/move.md)`(rhs)).swap(*this)`と等価。

この結果として、以下が行われる：

1. `rhs`から一時オブジェクトをムーブ構築する。`rhs`は共有状態とタスクを持たなくなる。
2. 一時オブジェクトと`*this`を[`swap`](swap.md)する。`*this`は`rhs`が持っていた共有状態とタスクを持ち、一時オブジェクトは`*this`が元々持っていた共有状態を持つ。
3. 一時オブジェクトの[デストラクタ](op_destructor.md)によって、`*this`が元々持っていた共有状態が放棄される。すなわち、その共有状態が準備完了状態([`future_status::ready`](../future_status.md))でなければ、error conditionとして[`broken_promise`](../future_errc.md)を持つ[`future_error`](../future_error.md)例外オブジェクトを格納したのち準備完了状態にし、そのうえで共有状態を解放する。ただし、実装によっては、この動作が行われない場合がある(備考を参照)。


## 戻り値
- (2) : `*this`


## 例外
- (2) : 投げない


## 備考
C++11の仕様では、ムーブ代入演算子の効果として古い共有状態は「放棄する(abandon)」ではなく「解放する(release)」となっていたが、仕様の他の項目(Shared States, Class template promise, および Class template packaged_task内のvoid reset();)の記載との整合性を欠いていた。LWG Issue 4158によってこの不整合が解消され、「放棄する(abandon)」が正しいことが確定したため、効果の項にはそのように記載している。

「(共有状態を)放棄する(abandon)」とは効果の項(2)の1と2が行われることをいい、「(共有状態を)解放する(release)」とは効果の項(2)の2のみが行われることである。通常、[`promise`](../promise.md)および`packaged_task`は処理結果を提供する側であるため共有状態を所有しなくなるときには前者を行い、[`future`](../future.md)および[`shared_future`](../shared_future.md)は処理結果を受け取る側であるため共有状態を所有しなくなるときには後者を行う。

なお、`operator=`の実際の実装では、ClangおよびGCCでは「放棄する(abandon)」の動作になっているが、Visual C++では「解放する(release)」の動作になっている。また、[`reset`](reset.md)では、Clang,GCC,Visual C++のいずれも「放棄する(abandon)」の動作になっている。

## 例
```cpp example
#include <future>
#include <utility>

int foo() { return 3; }

int main()
{
  // ムーブ代入
  // 共有状態の所有権とタスクを移動する
  std::packaged_task<int()> task1(foo);
  std::packaged_task<int()> task2;

  task2 = std::move(task1);

  // task1は共有状態を持たない
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
- [LWG Issue 2067. `packaged_task` should have deleted copy c'tor with const parameter](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2067)
- [LWG Issue 4158. `packaged_task::operator=` should abandon its shared state](https://cplusplus.github.io/LWG/issue4158)
    - 効果の記述が`packaged_task(std::move(rhs)).swap(*this)`と等価であるという形へ整理され、共有状態を「解放する(release)」のか「放棄する(abandon)」のかという規格内の不整合が解消された。規格としてはC++29のワーキングドラフトへ適用されたが、矛盾した文言の修正であるためC++11へ遡及して適用される
