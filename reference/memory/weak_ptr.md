# weak_ptr
* memory[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  class weak_ptr;
}
```

## 概要
`weak_ptr`は、[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトが持つリソースへの弱参照を保持するクラスである。

このクラスは、[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトのリソースに対する所有権は保持せず、そのリソースを監視し、覗き見する。


### 循環参照の解決に使用する
[`shared_ptr`](/reference/memory/shared_ptr.md)は、所有権を参照カウントで管理し、所有者がいなくなったらリソースを解放するクラスである。

しかし、参照カウントという機構には、循環参照を解決できないという問題がある。`A`が`B`への[`shared_ptr`](/reference/memory/shared_ptr.md)を保持し、`B`もまた`A`への[`shared_ptr`](/reference/memory/shared_ptr.md)を保持する、ということをした場合、参照カウントが永遠に`0`にならず、リソースリークが発生する。

このような構造がどうしても必要な場合、一方は[`shared_ptr`](/reference/memory/shared_ptr.md)を保持し、一方はその[`shared_ptr`](/reference/memory/shared_ptr.md)への`weak_ptr`を保持する、というようにすることで、循環参照を解決できる。

`weak_ptr`は、監視対象の[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトの参照カウントを、加算も減算もしない。

[`shared_ptr`](/reference/memory/shared_ptr.md)は、リソースを使用している間は解放されないという保証があるということも特徴の一つではあるので、`weak_ptr`にする対象が、リソースが参照できなくなっても問題ないか、ということを確認した上で使用すること。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------|----------------------------------------------------------------|-------|
| [`(constructor)`](weak_ptr/op_constructor.md) | コンストラクタ                                           | C++11 |
| [`(destructor)`](weak_ptr/op_destructor.md) | デストラクタ                                               | C++11 |
| [`operator=`](weak_ptr/op_assign.md)    | 代入演算�                                                     | C++11 |
| [`swap`](weak_ptr/swap.md)              | 他の`weak_ptr`オブジェクトとデータを入れ替える                 | C++11 |
| [`reset`](weak_ptr/reset.md)            | `weak_ptr`オブジェクトと監視対象とのリンクをクリアする         | C++11 |
| [`use_count`](weak_ptr/use_count.md)    | 監視している`shared_ptr`オブジェクトの所有者数を取得する       | C++11 |
| [`expired`](weak_ptr/expired.md)        | 監視対象の寿命切れやリンク切れを判定する                       | C++11 |
| [`lock`](weak_ptr/lock.md)              | 監視している`shared_ptr`オブジェクトを取得する                 | C++11 |
| [`owner_before`](weak_ptr/owner_before.md) | 所有権ベースでの小なり比較を行う                            | C++11 |


## メンバ型

| 名前           | 説明      | 対応バージョン |
|----------------|-----------|-------|
| `element_type` | 要素型`T` | C++11 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|-----------------------------------|-----------------------------------------|-------|
| [`swap`](weak_ptr/swap_free.md) | 2つの`weak_ptr`オブジェクトを入れ替える | C++11 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](shared_ptr/op_deduction_guide.md) | クラステンプレートの推論補助 | C++17 |


## 例
```cpp example
#include <memory>
#include <iostream>

int main()
{
  // weak_ptrオブジェクトwpは、
  // shared_ptrオブジェクトspを監視する
  std::shared_ptr<int> sp(new int(42));
  std::weak_ptr<int> wp = sp;

  // wpの監視対象であるspが、有効なリソースを保持している状態なら処理する。
  if (std::shared_ptr<int> r = wp.lock()) {
    std::cout << "get weak_ptr value : " << *r << std::endl;
  }

  sp.reset();

  // shared_ptrオブジェクトが無効になったことを検知する
  if (wp.expired()) {
    std::cout << "shared_ptr managed object deleted." << std::endl;
  }
}
```
* std::weak_ptr[color ff0000]
* wp.lock[link weak_ptr/lock.md]
* sp.reset[link shared_ptr/reset.md]
* wp.expired()[link weak_ptr/expired.md]

### 出力
```
get weak_ptr value : 42
shared_ptr managed object deleted.
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3.6
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2008 (TR1), 2010, 2012, 2013

## 参照

