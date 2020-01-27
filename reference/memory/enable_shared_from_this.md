# enable_shared_from_this
* memory[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  class enable_shared_from_this;
}
```

## 概要
`enable_shared_from_this`は、[`shared_ptr`](/reference/memory/shared_ptr.md)で関しているオブジェクトの`this`ポインタを、[`shared_ptr`](/reference/memory/shared_ptr.md)として扱うことを可能にするためのクラスである。

`this`ポインタを単純に`shared_ptr<T>(this)`としてしまうと、参照カウントが増えず、`delete`が2重に呼ばれてしまいバグを引き起こすことになるため、そうならないようにこのクラスを使用して`this`を扱う。

このクラスは、[`shared_ptr`](/reference/memory/shared_ptr.md)として管理するクラスの基底クラスとして使用する。このクラスをpublic継承したクラスでpublicメンバ関数[`shared_from_this()`](enable_shared_from_this/shared_from_this.md)を使用することで、`this`を指す[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトを取得できる。

このクラスを継承する際には、このクラスのテンプレート引数として、派生クラス(このクラスを継承するクラス自身)を指定すること。(このようにテンプレート引数を指定する方法を、[CRTP:Curiously Recurring Template Pattern](https://ja.wikibooks.org/wiki/More_C%2B%2B_Idioms/奇妙に再帰したテンプレートパターン(Curiously_Recurring_Template_Pattern))と言う)


### �しい使い方と、誤った使い方
`enable_shared_from_this`クラスの�しい使い方は、

1. [`shared_ptr`](/reference/memory/shared_ptr.md)で管理するクラスが
2. このクラスをpublic継承して、
3. [`shared_from_this()`](enable_shared_from_this/shared_from_this.md)メンバ関数を使用して、`this`を指す[`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクトを取得する。

というものだが、これに反して誤った使い方をしてしまう場合がある。以下は、誤った使い方なので、�しい使い方を確認すること。

- [`shared_ptr`](/reference/memory/shared_ptr.md)で管理していないクラスオブジェクトに、このクラスを使用するのは間違い。

```cpp
struct X : public std::enable_shared_from_this<X> {
  void func() {
    auto self = shared_from_this();  // (2) NG : thisがshared_ptrで管理されていない
  }
};

auto ptr = new X(/*...*/);  // (1) shared_ptr管理でない場合...
ptr->func();
```


## protectedメンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------------------|----------------|-------|
| [`(constructor)`](enable_shared_from_this/op_constructor.md) | コンストラクタ | C++11 |
| [`(destructor)`](enable_shared_from_this/op_destructor.md)   | デストラクタ   | C++11 |
| [`operator=`](enable_shared_from_this/op_assign.md)          | 代入演算�     | C++11 |


## publicメンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------------------------------|----------------------------------------|-------|
| [`shared_from_this`](enable_shared_from_this/shared_from_this.md) | `this`ポインタを`shared_ptr`に変換する | C++11 |
| [`weak_from_this`](enable_shared_from_this/weak_from_this.md) | `this`ポインタを`weak_ptr`に変換する | C++17 |


## 例
```cpp example
#include <cassert>
#include <memory>

struct X : public std::enable_shared_from_this<X> {
  std::shared_ptr<X> f()
  {
    // thisを指すshared_ptrオブジェクトを作る
    return shared_from_this();
  }
};

int main()
{
  std::shared_ptr<X> p(new X());
  std::shared_ptr<X> q = p->f();

  assert(p == q);
}
```
* std::enable_shared_from_this[color ff0000]

### 出力
```
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
- [`enable_shared_from_this`クラステンプレート - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120314/p1)

